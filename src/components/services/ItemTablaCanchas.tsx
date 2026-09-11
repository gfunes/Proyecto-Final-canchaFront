import type { Cancha } from "../../interfaces/canchas";
import Swal from "sweetalert2";
//import { LuTrash2, LuPencil } from "react-icons/lu";
//import { Link } from "react-router";

interface ItemTablaCanchasProps {
  cancha: Cancha;
  fila: number;
  setCanchas: React.Dispatch<React.SetStateAction<Cancha[]>>
}


const ItemTablaCanchas = ({cancha, fila, setCanchas}:ItemTablaCanchasProps) => {
  return (
    <tr className="border-b border-slate-400 hover:bg-slate-400/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
        {fila}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-500">
        {cancha.nombreCancha}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        {cancha.categoria.nombre}
      </td>
      
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        {cancha.precio}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-3">
          
          <a className="text-green-500 hover:text-green-600 transition-colors flex items-center gap-1 cursor-pointer">
            <i className="bi bi-pencil-square"></i> Editar
          </a>
          <a className="text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer">
            <i className="bi bi-trash"></i> Borrar
          </a>
          
        </div>
      </td>
    </tr>
  );
};

export default ItemTablaCanchas;
