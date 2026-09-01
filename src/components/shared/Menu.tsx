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
    <nav className="bg-zinc-950 border-b border-zinc-800 text-zinc-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <img src="https://res.cloudinary.com/ddhyg9uee/image/upload/v1788274566/rollingclub_nohrp6.png" alt="logo institucional" className="h-23 " />

          <div className="shrink-0 flex items-center gap-2 text-xl tracking-wider">

          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 capitalize">
              <a>Inicio</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
