import CardProducto from "../services/CardProducto";
import { NavLink } from "react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import { listarProductosApi } from "../../helpers/queries";
import type { Producto } from "../../interfaces/productos";

const Inicio = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cantidadProductos, setCantidadProductos] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [termino, setTermino] = useState(""); //Es lo que el usuario escribe en tiempo real
  const [filtro, setFiltro] = useState(""); //Es el valor confirmado para buscar en el submit
  const [isLoading, setIsLoading] = useState(false);
  const cantProductos = 8;

  useEffect(() => {
    cargarProductos(paginaActual, filtro);
  }, [paginaActual, filtro]);

  const cargarProductos = async (
    paginaNumero: number,
    terminoFiltro: string,
  ) => {
    //estamos cargando los datos
    setIsLoading(true);
    try {
      const respuestaProductos = await listarProductosApi({
        pagina: paginaNumero,
        limite: cantProductos,
        termino: terminoFiltro || undefined,
      });

      if (respuestaProductos.ok) {
        const datos = await respuestaProductos.json();
        // Con || (OR lógico) cualquier falsy 0, false, null, undefined
        // Con ?? (Fusión nula, Nullish Coalescing Operator)
        setProductos(datos.productos ?? []); // ?? retorna B unicamente si es A es null
        setCantidadProductos(datos.cantidadProductos ?? 0);
        setTotalPaginas(datos.totalPaginas ?? 1);

        if (
          typeof datos.paginaActual === "number" &&
          datos.paginaActual !== paginaNumero
        ) {
          setPaginaActual(datos.paginaActual);
        }
      } else {
        setProductos([]);
        setCantidadProductos(0);
        setTotalPaginas(1);
      }
    } catch (error) {
      console.error(error);
      setProductos([]);
      setCantidadProductos(0);
      setTotalPaginas(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuscar = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPaginaActual(1);
    setFiltro(termino.trim());
  };

  const handleLimpiarFiltro = () => {
    setTermino("");
    setFiltro("");
    setPaginaActual(1);
  };

  const cambiarPagina = (pagina: number) => {
    if (pagina < 1 || pagina > totalPaginas || pagina === paginaActual) return;
    setPaginaActual(pagina);
  };
  return (
    <section className="space-y-8 animate-fadeIn px-10 my-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight text-center md:text-start">
            Catálogo de <span className="text-green-500">Productos</span>
          </h1>
          <p className="text-zinc-400 mt-1 text-sm text-center md:text-start">
            Agrega los productos que quieras al carrito y luego termina tu
            compra
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            {cantidadProductos} productos disponibles
          </div>
          <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
            Página {paginaActual} de {totalPaginas}
          </div>
        </div>
        <NavLink
          to="/"
          className={
            "bg-green-500 hover:bg-green-600 transition text-l py-2 px-3 rounded-2xl font-bold cursor-pointer text-center md:text-start"
          }
        >
          Volver al juego ⚽
        </NavLink>
        <form
          onSubmit={handleBuscar}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <label className="sr-only" htmlFor="buscador-servicios">
            Buscar productos
          </label>
          <input
            id="buscador-productos"
            type="text"
            value={termino}
            onChange={(event) => setTermino(event.target.value)}
            placeholder="Buscar por nombre, categoría o descripción"
            className="w-full sm:w-96 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
          >
            Buscar
          </button>
          {filtro && (
            <button
              type="button"
              onClick={handleLimpiarFiltro}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Limpiar filtro
            </button>
          )}
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <CardProducto key={producto._id} producto={producto} />
        ))}
      </div>
      {/* <CardProducto/> */}

      {(totalPaginas > 1 || cantidadProductos > cantProductos) && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <div className="text-sm text-zinc-400">
            Mostrando {productos.length} de {cantidadProductos} resultados
          </div>
          {/* botones de paginacion */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              disabled={paginaActual === 1}
              onClick={() => cambiarPagina(paginaActual - 1)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"
            >
              Anterior
            </button>

            <span className="px-3 py-2 text-sm text-zinc-400">
              Página {paginaActual} de {totalPaginas}
            </span>

            <button
              type="button"
              disabled={paginaActual === totalPaginas}
              onClick={() => cambiarPagina(paginaActual + 1)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-zinc-900 border border-zinc-800 hover:bg-zinc-800"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Inicio;
