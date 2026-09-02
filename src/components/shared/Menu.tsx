import { useState } from "react";
import { LuMenu, LuX, LuCodeXml, LuLogOut } from "react-icons/lu";
import { Link, NavLink } from "react-router";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkStyles = ({ isActive }: { isActive: boolean }) =>
    `block py-2 px-3 transition-colors duration-200 md:p-0 ${isActive
      ? "text-blue-500 font-semibold"
      : "text-zinc-300 hover:text-blue-400"
    }`;

  return (
    <nav className="bg-slate-500 border-b border-zinc-800 text-zinc-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <img src="https://res.cloudinary.com/ddhyg9uee/image/upload/v1788274566/rollingclub_nohrp6.png" alt="logo institucional" className="h-23 " />

<div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition-colors"
            >
              <span className="sr-only">Menu</span>
              {isMenuOpen ? (
                <LuX className="text-3xl" />
              ) : (
                <LuMenu className="text-3xl" />
              )}
            </button>
          </div>
          

          {/* Desktop Menu */}
            <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8 capitalize">
              <NavLink to="/" className={navLinkStyles}>
                Inicio
              </NavLink>

              <NavLink to="/administrador" className={navLinkStyles}>
                Administrador
              </NavLink>

              <NavLink to="/registrate" className={navLinkStyles}>
                Registrate
              </NavLink>
            </div>
          </div>
        </div>
      </div>
{/* Menú Mobile Desplegable */}
      <div
        className={`${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
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

          <NavLink
            to="/administrador"
            className={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
          >
            Administrador
          </NavLink>

          <NavLink
            to="/registrate"
            className={navLinkStyles}
            onClick={() => setIsMenuOpen(false)}
          >
            Registrate
          </NavLink>
        </div>
      </div>


    </nav>
  );
};

export default Menu;
