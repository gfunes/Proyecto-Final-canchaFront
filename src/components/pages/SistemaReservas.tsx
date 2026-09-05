import { useState } from "react";
import SelectorCancha from "./SelectorCancha"
import CalendarioReservas from "./CalendarioReservas"





export default function SistemaReservas() {
  // Estado para guardar la cancha que el usuario seleccionó
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);

  return (
  
   <main className="min-h-screen bg-slate-400 rounded-4xl p-6 md:p-10 font-sans text-slate-800">
      <header className="max-w-6xl mx-auto mb-10 text-center md:text-left">
        <h1 className="text-emerald-600  text-3xl font-bold tracking-wider  uppercase flex items-center justify-center md:justify-start gap-2">
          ⚽ Reserva tu partido
         </h1>
        {/* <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 tracking-tight">
          Sistema de Turnos F5
        </h1> */}
      </header>

      {/* Renderizado Condicional: Si no hay cancha, muestra el selector. Si hay, muestra el calendario */}
      {!canchaSeleccionada ? (
        <SelectorCancha onSeleccionarCancha={setCanchaSeleccionada} />
      ) : (
        <CalendarioReservas 
          cancha={canchaSeleccionada} 
          onVolver={() => setCanchaSeleccionada(null)} 
        />
      )}
    </main>
  
  
);
}