import ItemTabla from "../services/itemTablaReservas";

const AdmReservas = () => {
  return (
    <section className="animate-fadeIn space-y-6">
      {/* Header de la sección */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-400/40 p-6 rounded-2xl border border-slate-300">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Administración Reservas 
          </h1>
          <p className="text-zinc-300 text-sm">RollingClub</p>
        </div>
        {/* <a className="bg-green-500 hover:bg-green-600 text-white px-3 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95 gap-2 text-center">
          <i className="bi bi-plus-lg"></i>
          Alta Producto
        </a> */}
      </div>

      {/* Contenedor de la Tabla con Scroll Horizontal para móviles */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/60 border-b border-zinc-800">
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Codigo Reseerva
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Fecha
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold">
                Hora Inicio
              </th>
              <th className="px-6 py-4 text-xs uppercase tracking-wider text-zinc-500 font-bold text-center">
                Cliente
              </th>
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

export default AdmReservas;
