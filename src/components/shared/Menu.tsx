import { useState } from "react";
import { LuMenu, LuX, LuLogOut } from "react-icons/lu";
import { NavLink, useNavigate } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { logoutBackendApi } from "../../helpers/queries";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { usuarioLogueado, setUsuarioLogueado } = useAppContext();
  const navegacion = useNavigate();

  // Verifica si el usuario actual tiene el rol de administrador
  const isAdmin = usuarioLogueado?.rol?.toLowerCase() === "admin";

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-3 transition-colors duration-200 md:p-0 ${
      isActive
        ? "text-green-500 font-semibold"
        : "text-zinc-300 hover:text-green-500"
    }`;

  const logout = async () => {
    try {
      // 1. Avisar al backend para destruir la cookie
      await logoutBackendApi();
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
      // 2. Limpiar el estado global y almacenamiento local
      setUsuarioLogueado(null);
      sessionStorage.removeItem("usuarioLogueado");

      // 3. Redirigir al inicio o login
      navegacion("/");
    }
  };
  return (
    <nav className="bg-slate-500 border-b border-zinc-800 text-zinc-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <img
            src="https://res.cloudinary.com/ddhyg9uee/image/upload/v1788274566/rollingclub_nohrp6.png"
            alt="logo institucional"
            className="h-20 object-contain"
          />

          {/* Botón hamburguesa menú móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              aria-label="Abrir menú"
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <LuX className="text-3xl" /> : <LuMenu className="text-3xl" />}
            </button>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8 capitalize font-bold">
              <NavLink to="/" className={navLinkStyles}>
                Inicio
              </NavLink>

              {usuarioLogueado ? (
                <>
                  {isAdmin && (
                    <NavLink to="/administrador" className={navLinkStyles}>
                      Administrador
                    </NavLink>
                  )}

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-zinc-800 hover:bg-red-900/40 text-red-400 px-4 py-2 rounded-md text-sm font-medium transition-all border border-zinc-700 hover:border-red-500/50 cursor-pointer"
                  >
                    <LuLogOut />
                    Logout
                  </button>
                </>
              ) : (
                <NavLink to="/login" className={navLinkStyles}>
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú Mobile desplegable */}
      <div
        className={`${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        } md:hidden transition-all duration-300 ease-in-out bg-zinc-900 border-t border-zinc-800`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          <NavLink
            to="/"
            className={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </NavLink>

          {usuarioLogueado ? (
            <>
              {isAdmin && (
                <NavLink
                  to="/administrador"
                  className={navLinkStyles}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Administrador
                </NavLink>
              )}

              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left py-2 px-3 text-red-400 hover:text-red-300 cursor-pointer"
              >
                <LuLogOut />
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={navLinkStyles}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;