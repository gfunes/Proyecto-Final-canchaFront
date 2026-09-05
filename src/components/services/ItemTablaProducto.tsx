const ItemTablaProducto = () => {
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
        1
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
        nombreProducto
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        $50
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

export default ItemTablaProducto;
