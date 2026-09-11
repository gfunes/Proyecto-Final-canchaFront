import SistemaReservas from "./SistemaReservas";
import Carousel from "../services/Carousel"
import {NavLink} from "react-router";

const Inicio = () => {
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  useEffect(() => {
    cargarCanchas();
  }, []);

  const cargarCanchas = async () => {
    const respuestaCancha = await listarCanchasApi();

    if (respuestaCancha && respuestaCancha.status === 200) {
      const data = await respuestaCancha.json();

      setCanchas(data.canchas);
    } else {
      Swal.fire({
        title: "Ocurrio un error",
        text: `No se puede mostrar las canchas en este momento`,
        icon: "success",
      });
    }
  };
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
          <NavLink to="/productos" className={"bg-green-500 hover:bg-green-600 transition text-l py-2 px-3 rounded-2xl font-bold cursor-pointer"}>
            Compra tus productos 🥤🌭
          </NavLink>
        </div>
        <SistemaReservas />
      </section>
    </>
  );
};

export default Inicio;
