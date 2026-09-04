//import React from 'react';
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
            onVerTurnos={onSeleccionarCancha} 
          />
        ))}
      </div>
    </div>
  );
}