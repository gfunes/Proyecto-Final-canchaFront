import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { obtenerDisponibilidad } from "../services/disponibilidadService";
import { listarCanchasApi} from "../../helpers/queries";


const respuesta = await listarCanchasApi();
const canchasData = await respuesta.json();
const lista = canchasData.canchas;

const CANCHAS = lista.map((cancha: any) => ({
  id: cancha._id,
  nombre: cancha.nombreCancha // o cancha.nombreCancha / cancha.nombre?.cancha según tu backend
}));

function convertirFechaAISO(fecha: any): string {
  if (!fecha || !(fecha instanceof Date) || isNaN(fecha.getTime())) {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
  }
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function formatearPrecio(precio: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(precio || 0);
}

export default function CalendarioReservas() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());
  const [canchaId, setCanchaId] = useState<string>(CANCHAS[0].id);
  const [turnos, setTurnos] = useState<any[]>([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState<any>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const fechaISO = convertirFechaAISO(fechaSeleccionada);

  useEffect(() => {
    const controlador = new AbortController();

    async function cargarDisponibilidad() {
      try {
        setCargando(true);
        setError("");
        setTurnos([]);
        setTurnoSeleccionado(null);

        const datos = await obtenerDisponibilidad(canchaId, fechaISO, controlador.signal);
        setTurnos(datos?.turnos || []);
      } catch (errorConsulta: any) {
        if (errorConsulta.name !== "AbortError") {
          setError(errorConsulta.message || "Error al cargar la disponibilidad");
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false);
        }
      }
    }

    if (canchaId && fechaISO) {
      cargarDisponibilidad();
    }

    return () => controlador.abort();
  }, [canchaId, fechaISO]);

  function seleccionarTurno(turno: any) {
    if (turno.estado?.toLowerCase() !== "disponible") return;
    setTurnoSeleccionado(turno);
  }

  function continuarReserva() {
    if (!turnoSeleccionado) return;
    console.log("Reserva seleccionada:", {
      canchaId,
      fecha: fechaISO,
      turnoId: turnoSeleccionado.id,
      precio: turnoSeleccionado.precio,
    });
  }

  // Clases dinámicas según el estado (Verde: Disponible, Rojo: Reservado, Amarillo: Pendiente)
  const getEstilosTurno = (turno: any, isSelected: boolean) => {
  const base = "flex flex-col items-center justify-center p-2.5 rounded-lg border text-center transition-all duration-150 select-none";
  const estado = (turno.estado || "").toLowerCase();
  if (isSelected) {
    return `${base} bg-emerald-600 border-emerald-700 text-white shadow-md scale-105`;
  }
  if (estado === "disponible") {
    return `${base} bg-emerald-50/80 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-100 text-emerald-950 cursor-pointer`;
  }
  if (estado === "reservado" || estado === "confirmada" || estado === "ocupado") {
    return `${base} bg-red-50/80 border-red-200 text-red-800 cursor-not-allowed opacity-60`;
  }
  // Pendiente
  return `${base} bg-amber-50/80 border-amber-200 text-amber-900 cursor-not-allowed opacity-60`;
};

  return (
    <section className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans text-slate-800">
      <header className="max-w-6xl mx-auto mb-10">
        <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase flex items-center gap-2">
          ⚽ Reserva tu cancha
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
          Sistema de Turnos F5
        </h1>
        <p className="text-slate-500 mt-2 text-lg">Seleccioná la fecha y asegurá tu partido.</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Selector y Calendario */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 h-fit">
          <label htmlFor="cancha" className="block mb-2 font-bold text-slate-700">
            Selecciona la cancha
          </label>
          <select
            id="cancha"
            value={canchaId}
            onChange={(e) => setCanchaId(e.target.value)}
            className="w-full mb-8 p-3 border-2 border-emerald-100 rounded-xl bg-slate-50 text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          >
            {CANCHAS.map((cancha) => (
              <option key={cancha.id} value={cancha.id}>
                {cancha.nombre}
              </option>
            ))}
          </select>

          <div className="calendar-wrapper overflow-hidden rounded-xl border border-slate-200">
            <Calendar
              onChange={(val) => {
                if (val instanceof Date) setFechaSeleccionada(val);
              }}
              value={fechaSeleccionada}
              minDate={new Date()}
              locale="es-AR"
              className="w-full border-none font-sans"
            />
          </div>
        </div>

        {/* Panel de Horarios */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 capitalize border-b-2 border-emerald-100 pb-4">
            Turnos del{" "}
            <span className="text-emerald-600">
              {fechaSeleccionada.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </h2>

          {/* Leyenda */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              Disponible
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              Reservado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              Pendiente
            </span>
          </div>

          {cargando && (
            <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-500 animate-pulse font-medium">
              Buscando horarios disponibles...
            </div>
          )}

          {error && (
            <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200 flex flex-col gap-1">
              <strong className="font-bold">Error en la cancha</strong>
              <span>{error}</span>
            </div>
          )}

          {!cargando && !error && turnos.length === 0 && (
            <div className="p-8 text-center bg-slate-50 rounded-xl text-slate-500 border border-slate-200">
              ⚽ No hay turnos programados para esta fecha.
            </div>
          )}

          {!cargando && !error && turnos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {turnos.map((turno) => {
                const disponible = (turno.estado || "").toLowerCase() === "disponible";
                const seleccionado = turnoSeleccionado?.id === turno.id;

                return (
                  <button
                    type="button"
                    key={turno.id}
                    disabled={!disponible}
                    onClick={() => seleccionarTurno(turno)}
                    className={getEstilosTurno(turno, seleccionado)}
                  >
                    <span className="text-lg font-extrabold tracking-tight">
                      {turno.horaInicio} - {turno.horaFin}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75">
                      {turno.estado}
                    </span>
                    <strong className="text-xs mt-0.5 font-medium">
                      {formatearPrecio(turno.precio)}
                    </strong>
                  </button>
                );
              })}
            </div>
          )}

          {/* Barra de Reserva seleccionada */}
          {turnoSeleccionado && (
            <div className="mt-10 bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl border-t-4 border-emerald-500">
              <div className="flex gap-8 w-full md:w-auto">
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Tu Horario</span>
                  <strong className="text-xl">
                    {turnoSeleccionado.horaInicio} a {turnoSeleccionado.horaFin}
                  </strong>
                </div>
                <div>
                  <span className="block text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Total a Pagar</span>
                  <strong className="text-xl text-emerald-400">
                    {formatearPrecio(turnoSeleccionado.precio)}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={continuarReserva}
                className="w-full md:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-extrabold rounded-xl transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
              >
                Confirmar Reserva
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}