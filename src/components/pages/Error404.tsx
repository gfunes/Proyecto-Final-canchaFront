const Error404 = () => {
  return (
    <div className="min-h-screen bg-slate-500 flex items-center justify-center p-4">
      {/* Tarjeta Principal */}
      <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl max-w-4xl w-full p-8 md:p-12 text-[#1E293B] flex flex-col items-center">
        {/* Cabecera / Logo */}
        <div className="w-full flex justify-between items-center mb-6 border-b border-[#64748B]/20 pb-4">
          <span className="font-black text-2xl tracking-wider text-[#1E293B]">
            ROLLING<span className="text-[#22C55E]">CLUB</span>
          </span>
        </div>

        {/* Título de Error */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-2">
            Error 404 - Página en Reparación
          </h1>
        </div>

        {/* Botón de Acción Principal */}
        <div className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 inline-flex items-center gap-2">
          <span>Volver a la Cancha Principal</span>
        </div>

        {/* Imagen Ilustrativa (La cancha en reparación con su texto integrado) */}
        <div className="w-full flex justify-center my-4">
          <img
            src="https://res.cloudinary.com/ddhyg9uee/image/upload/v1788223015/error404.jpg_zkrrjt.jpg"
            alt="Cancha de fútbol en reparación - Error 404"
            className=""
          />
        </div>
        <p className="text-[#64748B] text-base">
          ¡El árbitro detuvo el juego! Esta sección del campo está temporalmente
          fuera de servicio.
        </p>

        {/* Pie de página institucional */}
        <div className="mt-8 text-center text-xs text-[#64748B] border-t border-[#64748B]/20 pt-4 w-full">
          © 2026 ROLLINGCLUB — Todos los derechos reservados
        </div>
      </div>
    </div>
  );
};

export default Error404;
