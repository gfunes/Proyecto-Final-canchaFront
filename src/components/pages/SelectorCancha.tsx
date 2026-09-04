import React from 'react';
import CardCancha from '../services/CardCancha';

const CANCHAS = [
  { id: 1, nombre: "Cancha 1", tipo: "Fútbol 5 - Sintético", precioBase: "$20.000" },
  { id: 2, nombre: "Cancha 2", tipo: "Fútbol 7 - Techada", precioBase: "$25.000" },
  { id: 3, nombre: "Cancha 3", tipo: "Fútbol 11 - Césped Natural", precioBase: "$40.000" },
  
];

export default function SelectorCancha({ onSeleccionarCancha }) {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-700 mb-6">Paso 1: Elegí la cancha</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CANCHAS.map((cancha) => (
        <CardCancha 
            key={cancha.id} 
            cancha={cancha} 
            // Conectamos el botón de la card con la función que cambia la pantalla al calendario
            onVerTurnos={onSeleccionarCancha} 
          />
          // <button
          //   key={cancha.id}
          //   onClick={() => onSeleccionarCancha(cancha)}
          //   className="group flex flex-col bg-white p-6 rounded-2xl shadow-sm border-2 border-transparent hover:border-emerald-500 hover:shadow-xl transition-all duration-300 text-left cursor-pointer transform hover:-translate-y-1"
          // >
          //   <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          //     <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          //     </svg>
          //   </div>
          //   <h3 className="text-xl font-extrabold text-slate-900">{cancha.nombre}</h3>
          //   <p className="text-slate-500 font-medium mt-1 mb-4">{cancha.tipo}</p>
          //   <div className="mt-auto pt-4 border-t border-slate-100 w-full flex justify-between items-center">
          //     <span className="text-sm text-slate-400">Desde</span>
          //     <span className="text-lg font-bold text-emerald-600">{cancha.precioBase}</span>
          //   </div>
          // </button>
        ))}
      </div>
    </div>
  );
}
