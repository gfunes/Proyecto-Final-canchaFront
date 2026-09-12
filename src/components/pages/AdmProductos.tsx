import ItemTablaProducto from "../services/ItemTablaProducto";
import { LuCirclePlus } from "react-icons/lu";
import Swal from "sweetalert2";

const AdmProductos = () => {
  return (
    <section className="animate-fadeIn space-y-6">
      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-400/40 p-6 rounded-2xl border border-slate-300">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Administración Productos
          </h1>
          <p className="text-zinc-500 text-sm">By RollingClub</p>
        </div>
         <a href="#" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95">
  Alta Producto
  <LuCirclePlus className="text-xl" />
  
</a>
      </div>

      {/* Contenedor de la Tabla con Scroll Horizontal para móviles */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-slate-400">
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                fila
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                 nombreProducto
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                 DescripcionProducto
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold text-center">
               precio
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold text-center">
                Acciones 
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-400">
            <ItemTablaProducto />
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdmProductos;
