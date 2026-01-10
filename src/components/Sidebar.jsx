


import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (

    <aside
        className="
          group
          fixed top-0 left-0 h-screen
          w-16 hover:w-56
          bg-[#2c976a]
          text-white
          transition-all duration-300
          flex flex-col
          z-50
        "
      >
        
      {/* LOGO / TEXTO ADMINISTRATIVO */}
      <div className="h-16 flex items-center justify-center overflow-hidden">
        {/* Sidebar cerrado */}
        <span
          className="
            text-xl font-extrabold text-white
            drop-shadow-[0_2px_5px_rgba(0,0,0,0.6)]
            group-hover:hidden
          "
        >
          Adm
        </span>

        {/* Sidebar abierto */}
        <span
          className="
            hidden group-hover:block
            text-xl md:text-2xl font-extrabold tracking-wide text-white
            drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]
          "
        >
          Administrativa
        </span>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-1 px-2 mt-4">

        <NavLink
          to="/dashboard"
          className="
            flex items-center gap-4 p-3 rounded
            transition-colors duration-200
            hover:bg-[#23805c]
          "
        >
          <FaHome className="text-[26px] min-w-[30px] text-white" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-medium">
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/users"
          className="
            flex items-center gap-4 p-3 rounded
            transition-colors duration-200
            hover:bg-[#23805c]
          "
        >
          <FaUsers className="text-[26px] min-w-[30px] text-white" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-medium">
            Manejo Usuarios
          </span>
        </NavLink>

        <NavLink
          to="/users/create"
          className="
            flex items-center gap-4 p-3 rounded
            transition-colors duration-200
            hover:bg-[#23805c]
          "
        >
          <FaUserPlus className="text-[26px] min-w-[30px] text-white" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-medium">
            Crear Usuario
          </span>
        </NavLink>

      </nav>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-4 p-3 m-2 rounded
          bg-white text-[#2c976a]
          hover:bg-[#23805c] hover:text-white
          transition-colors duration-200
        "
      >
        <FaSignOutAlt className="text-[26px] min-w-[30px]" />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap font-medium">
          Salir
        </span>
      </button>

    </aside>
  );
}
