import CardProducto from "../services/CardCancha";

const Inicio = () => {
  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Encabezado con estilo moderno */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Catálogo de <span className="text-blue-500">Productos</span>
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
            Reserva tu turno en nuestras canchas o adquiere nuestros productos
          </p>
        </div>

        <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 self-start md:self-center">
          productos disponibles
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CardProducto />
      </div>
    </section>
  );
};

export default Inicio;
