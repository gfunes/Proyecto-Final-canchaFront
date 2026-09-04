import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { obtenerDisponibilidad } from "../services/disponibilidadService";

// Funciones auxiliares (mantén las que tenías)
function convertirFechaAISO(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${anio}-${mes}-${dia}`;
}

function formatearPrecio(precio) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(precio);
}

// Nota: Recibimos 'cancha' y 'onVolver' como props
export default function CalendarioReservas({ cancha, onVolver }) {

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [turnos, setTurnos] = useState([]);
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
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

        // Usamos el ID de la cancha que vino por props
        const datos = await obtenerDisponibilidad(cancha.id, fechaISO, controlador.signal);
        console.log(datos)
        setTurnos(datos.turnos || []);
      } catch (errorConsulta) {
        if (errorConsulta.name !== "AbortError") setError(errorConsulta.message);
        
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargarDisponibilidad();
    return () => controlador.abort();
  }, [cancha.id, fechaISO]);

  function seleccionarTurno(turno) {
    if (turno.estado !== "disponible") return;
    setTurnoSeleccionado(turno);
  }
  function continuarReserva() {
    if (!turnoSeleccionado) return;
    console.log("Reserva seleccionada:", {
      canchaID:cancha.id,
      fecha: fechaISO,
      turnoId: turnoSeleccionado.id,
      precio: turnoSeleccionado.precio,
    });
  }

  // Estilos de los botones (mantén la función que te pasé antes)
 // const getEstilosTurno = (turno, isSelected) => { /* ... código anterior ... */ };
 const getEstilosTurno = (turno, isSelected) => {
    const base = "flex flex-col gap-1 p-4 rounded-xl border-2 text-left transition-all duration-200";
    
    if (isSelected) {
      return `${base} bg-emerald-600 border-emerald-700 text-white shadow-lg transform -translate-y-1`;
    }
    if (turno.estado === "disponible") {
      return `${base} bg-emerald-50 border-transparent hover:border-emerald-400 text-emerald-900 cursor-pointer`;
    }
    if (turno.estado === "reservado") {
      return `${base} bg-red-50 border-transparent text-red-900 cursor-not-allowed opacity-70`;
    }
    return `${base} bg-amber-50 border-transparent text-amber-900 cursor-not-allowed opacity-70`;
  };
  return (
    <div className="max-w-6xl mx-auto">
      {/* Botón para volver al selector */}
      <button 
        onClick={onVolver}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors"
      >
        <span>←</span> Volver a selección de canchas
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Panel Izquierdo: Resumen de cancha y Calendario */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-emerald-100 h-fit">
          <div className="mb-6 pb-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">{cancha.nombre}</h2>
            <p className="text-slate-500 text-sm">{cancha.tipo}</p>
          </div>

          <label className="block mb-4 font-bold text-slate-700">Paso 2: Elegí la fecha</label>
          <div className="calendar-wrapper overflow-hidden rounded-xl border border-slate-200">
            <Calendar
              onChange={setFechaSeleccionada}
              value={fechaSeleccionada}
              minDate={new Date()}
              locale="es-AR"
              className="!w-full !border-none !font-sans"
            />
          </div>
        </div>

        {/* Panel Derecho: Grilla de turnos (El código aquí es el mismo del paso anterior) */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-emerald-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 capitalize border-b-2 border-emerald-100 pb-4">
            Turnos del <span className="text-emerald-600">{fechaSeleccionada.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" })}</span>
          </h2>
          
          {/* ... Resto del código de la grilla de turnos, estados de carga y ticket de resumen ... */}
          {/* Leyenda de colores */}
          <div className="flex flex-wrap gap-6 mb-8 text-sm font-medium text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span> Disponible
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span> Reservado
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span> Pendiente
            </span>
          </div>

          {/* Estados de Carga y Error */}
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

          {/* Grilla de horarios */}
          {!cargando && !error && turnos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {turnos.map((turno) => {
                const disponible = turno.estado === "disponible";
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
                    <span className="text-xs uppercase tracking-wider font-semibold opacity-90">
                      {turno.estado}
                    </span>
                    <strong className="text-base mt-1">
                      {formatearPrecio(turno.precio)}
                    </strong>
                  </button>
                );
              })}
            </div>
          )}

          {/* Resumen / "Marcador" de Checkout */}
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
      </div>
    );
}