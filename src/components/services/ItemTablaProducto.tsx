import { Link } from "react-router";
import Swal from "sweetalert2";
import { LuTrash2, LuPencil } from "react-icons/lu";

const ItemTablaProducto = () => {
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
        1
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
        nombreProducto
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
        DescripcionProducto
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        $50
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-3">
          <Link
           // to={`/administrador/productos/editar/${producto._id}`}
            className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            Editar <LuPencil /> 
          </Link>
          <button
            className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
          //  onClick={eliminarProducto}
          >
            Borrar <LuTrash2 /> 
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemTablaProducto;
