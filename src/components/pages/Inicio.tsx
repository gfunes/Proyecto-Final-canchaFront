import CardCancha from "../services/CardCancha";
import SistemaReservas from "./SistemaReservas";
import { useEffect, useState } from "react";
import type {Cancha} from "../../interfaces/canchas"
import { listarCanchasApi } from "../../helpers/queries";
import Swal from "sweetalert2";



const Inicio = () => {
  
  const [canchas, setCanchas] = useState<Cancha[]>([]);
useEffect(() => {
    cargarCanchas();
  }, []);

const cargarCanchas = async () => {
    const respuestaCancha = await listarCanchasApi();
    console.log(respuestaCancha);
    if (respuestaCancha && respuestaCancha.status === 200) {
      const data = await respuestaCancha.json();
      console.log(data);
      setCanchas(data);
    } else {
      if (respuestaCancha && respuestaCancha.status === 200) {
        const data = await respuestaCancha.json();
        setCanchas(data);
      } else {
        Swal.fire({
          title: "Ocurrio un error",
          text: `No se puede mostrar las canchas en este momento`,
          icon: "success",
        });
      }
    }
  }

  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Encabezado con estilo moderno */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Catálogo de <span className="text-green-500">Productos</span>
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Reserva tu turno en nuestras canchas o adquiere nuestros productos
          </p>
        </div>

        <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 self-start md:self-center">
          {canchas.length} canchas disponibles 
        </div>
      </div>
      {canchas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {canchas.map((cancha) => (
              <SistemaReservas key={cancha._id} cancha={cancha} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
            <i className="bi bi-search text-4xl text-zinc-700 mb-4"></i>
            <p className="text-zinc-500">
              No se encontraron canchas disponibles.
            </p>
          </div>
        )}
        {/* <SistemaReservas />  */}
    </section>
  );
};

export default Inicio;
