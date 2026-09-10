//import CardProducto from "../services/CardCancha";
import SistemaReservas from "./SistemaReservas";

const Inicio = () => {
  return (
    <>
      <Carousel />
      <section className="space-y-8 animate-fadeIn px-10 mb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-5 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Catálogo de <span className="text-green-500">Productos</span>
            </h1>
            <p className="text-zinc-400 mt-1 text-sm">
              Agrega los productos que quieras al carrito y luego termina tu
              compra
            </p>
          </div>
          <span className="bg-green-500 hover:bg-green-600 transition text-l py-2 px-3 rounded-2xl font-bold cursor-pointer">Reserva tu cancha⚽</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <CardProducto />
          <CardProducto />
          <CardProducto />
        </div>
      </div>
       <SistemaReservas />
    </section>
  );
};

export default Inicio;
