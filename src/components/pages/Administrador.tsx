import { Link } from "react-router";
import ItemTablaCanchas from "../services/ItemTablaCanchas";
import ItemTabla from "../services/ItemTablaProducto";
import { LuCirclePlus } from "react-icons/lu";

const Administrador = () => {
  return (
    <section className="animate-fadeIn space-y-6">
      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-900/40 p-6 rounded-2xl border border-zinc-800">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Panel de Administración General
          </h1>
          <p className="text-zinc-500 text-sm">Gestion Catálogo RollingClub</p>
        </div>
        
        
      </div>

      {/* Contenedor de la Tabla con Scroll Horizontal para móviles */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-800">
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                #
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Nombre Cancha
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Tipo Cancha
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold text-center">
                Precio
              </th>
<th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold text-center">
                Acciones
              </th>
              <Link
          to={"/administrador/canchas/crear"}
          className="bg-green-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 text-center  flex
           items-center gap-1"
        >
          <LuCirclePlus />
          Agregar Cancha
        </Link>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            <ItemTablaCanchas />
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-800">
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                #
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
               Nombre Producto
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Tipo Producto
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Precio
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold text-center">
                Acciones
              </th>
              <Link
          to={"/administrador/crear"}
          className="bg-slate-400 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center gap-2"
        >
          <LuCirclePlus />
          Agregar Producto
        </Link>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            <ItemTabla />
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Administrador;
