

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 border-t-4 border-green-600 text-slate-400 py-10 relative overflow-hidden">

            {/* Patrón sutil de fondo (Opcional, simula textura) */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-green-500 via-transparent to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center justify-center gap-3">

                    {/* Logo o Marca */}
                    <div className="flex items-center gap-2 mb-2">
                        {/* Reemplacé el ícono de código por uno de pelota si usas Bootstrap Icons, o puedes dejar el tuyo */}
                        <i className="bi bi-dribbble text-2xl text-green-500"></i>
                        <span className="text-xl font-black italic uppercase tracking-tighter bg-linear-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                            TuCancha App
                        </span>
                    </div>

                    <p className="text-sm font-medium uppercase tracking-wide">
                        &copy; {currentYear} <span className="text-white font-bold">Todos los derechos reservados</span>
                    </p>

                    {/* Separador temático (Línea punteada de cancha) */}
                    <div className="w-32 border-t-2 border-dashed border-green-500/30 my-3"></div>

                    {/* Enlaces legales */}
                    <div className="flex gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <span className="hover:text-green-400 cursor-pointer transition-colors duration-300">Privacidad</span>
                        <span className="text-green-700/50">•</span>
                        <span className="hover:text-green-400 cursor-pointer transition-colors duration-300">Términos</span>
                        <span className="text-green-700/50">•</span>
                        <span className="hover:text-green-400 cursor-pointer transition-colors duration-300">Contacto</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;