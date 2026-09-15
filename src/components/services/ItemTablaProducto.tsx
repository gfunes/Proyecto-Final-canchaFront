import { Link } from "react-router";
import { LuTrash2, LuPencil } from "react-icons/lu";
import type { Producto } from "../../interfaces/productos";
import Swal from "sweetalert2";
import { borrarProductoApi } from "../../helpers/queries";

interface ItemProductoProps {
  producto: Producto;
  fila: number;
  // TIPADO CORRECTO: El despachador de un estado tipo Servicio[]
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>;
}
const ItemTablaProducto = ({producto, fila, setProductos }: ItemProductoProps) => {
 
 const eliminarProducto = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No se puede revertir este proceso",
      icon: "warning",
      background: "#18181b", // zinc-900
      color: "#f4f4f5", // zinc-100
      showCancelButton: true,
      confirmButtonColor: "#3b82f6", // blue-500
      cancelButtonColor: "#ef4444", // red-500
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuestaBorrarProducto = await borrarProductoApi(producto._id);
        if (respuestaBorrarProducto && respuestaBorrarProducto.status === 200) {
          Swal.fire({
            title: "Eliminado",
            text: `El producto fue eliminado correctamente`,
            icon: "success",
            background: "#18181b",
            color: "#f4f4f5",
            confirmButtonColor: "#3b82f6",
          });
          // 2. Usamos el callback del SetState para leer el estado previo de forma segura
          setProductos((prevProductos) =>
            prevProductos.filter((item) => item._id !== producto._id),
          );
        }
      }
    });
  };
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
        {fila}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
        {producto.nombreProducto}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
        {producto.descripcion}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        $ {producto.precio}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-3">
          <Link
            to={`/administrador/productos/editar/${producto._id}`}
            className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            Editar <LuPencil /> 
          </Link>
          <button
            className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
           onClick={eliminarProducto}
          >
            Borrar <LuTrash2 /> 
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemTablaProducto;
