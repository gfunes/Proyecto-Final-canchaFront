// 1. Interfaz del objeto cancha
export interface CanchaData {
  id?: string | number;
  categoria?: string;
  imagen?: string;
  nombre?: string;
  descripcion?: string;
  precio?: string | number;
}

// 2. Interfaz de las props del componente
interface CardCanchaProps {
  cancha: CanchaData;
  onVerTurnos?: (cancha: CanchaData) => void;
}

const CardCancha = ({ cancha, onVerTurnos }: CardCanchaProps) => {
  const { 
    categoria = "Fútbol 5", 
    imagen = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=600&q=80", 
    nombre = "El Monumentalito", 
    descripcion = "Cancha de césped sintético de última generación. Ideal para partidos rápidos con amigos.", 
    precio = "15.000"
  } = cancha;

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden border-b-4 border-green-600 hover:shadow-2xl transition-shadow duration-300 relative flex flex-col mx-auto">
      
      {/* Contenedor Superior: Imagen y Categoría */}
      <div className="relative h-52 w-full bg-slate-200">
        <img
          src={imagen}
          alt={`Imagen de la cancha ${nombre}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-linear-to-r from-green-500 to-green-700 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest border border-white/20">
          {categoria}
        </div>
      </div>

      {/* Contenedor Inferior: Textos y Acciones */}
      <div className="p-5 flex flex-col grow">
        
        <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tight mb-2">
          {nombre}
        </h3>
        
        <p className="text-slate-600 text-sm mb-6 line-clamp-3">
          {descripcion}
        </p>

        {/* Borde inferior (Precio y Botón) */}
        <div className="flex justify-between items-center border-t-2 border-dashed border-green-200 pt-4 mt-auto">
          
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-slate-400 font-bold">Precio</span>
            <span className="text-lg font-black text-green-700">${precio}</span>
          </div>

          {/* Botón Ver Turnos */}
          <button 
            type="button"
            onClick={() => onVerTurnos && onVerTurnos(cancha)} 
            className="bg-slate-900 hover:bg-green-600 text-white font-bold py-2.5 px-3 rounded-xl shadow-md transition-colors duration-300 transform active:scale-95 uppercase text-[10px] tracking-wider text-center max-w-32.5 cursor-pointer"
          >
            Ver turnos disponibles
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default CardCancha;