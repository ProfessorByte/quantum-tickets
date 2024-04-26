import { useState } from "react";
import { Link } from "react-router-dom";
import { CloseIcon, LogOutIcon, MenuIcon } from "../assets/Icons";
import PropTypes from "prop-types";

export const NavBar = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="/favicon.png"
                alt="Icono de la aplicación"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inicio
                </Link>

                {/* <Link
                  to="/control-tickets"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Control de Tickets
                </Link> */}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <span className="flex flex-row items-center gap-3 font-semibold">
                {user?.email}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-300 duration-200"
                  onClick={logout}
                >
                  <LogOutIcon />
                </button>
              </span>
            ) : (
              <Link
                to="/login"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={false}
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isOpen ? <MenuIcon /> : <CloseIcon />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Inicio
          </Link>

          {/* <Link
            to="/control-tickets"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Control de Tickets
          </Link> */}

          {user ? (
            <button
              type="button"
              onClick={logout}
              className="flex flex-row w-full place-content-between text-red-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
            >
              Cerrar sesión
              <LogOutIcon />
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
};
