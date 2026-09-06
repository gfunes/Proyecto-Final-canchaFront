const ItemTablaCanchas = () => {
  return (
    <tr className="border-b border-slate-400 hover:bg-slate-400/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
        1
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-500">
        NombreCancha
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        TipoCancha
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        descripcionCancha
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        descripcionCancha
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-3">
          <a className="text-green-500 hover:text-green-600 transition-colors flex items-center gap-1 cursor-pointer">
            <i className="bi bi-pencil-square"></i> Confirmar
          </a>
          <a className="text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer">
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
