import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const navigate = useNavigate();

 const handleLogout = () => {
    // Si tienes token en localStorage o sesión, puedes limpiarlo aquí
    localStorage.removeItem('token'); // ejemplo
    // Redirige al login principal
    navigate('/', { replace: true }); // replace evita volver atrás
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
      "
    >
      {/* LOGO */}
      <div className="h-16 flex items-center justify-center font-bold text-xl text-white">
        A
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-1 px-2 mt-4">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-4 p-3 rounded text-white transition-colors duration-200 hover:bg-[#23805c] hover:text-[#cb4a2a]"
        >
          <FaHome className="text-white text-xl min-w-[24px] group-hover:text-[#cb4a2a]" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Dashboard
          </span>
        </NavLink>

        <NavLink
          to="/users"
          className="flex items-center gap-4 p-3 rounded text-white transition-colors duration-200 hover:bg-[#23805c] hover:text-[#cb4a2a]"
        >
          <FaUsers className="text-white text-xl min-w-[24px] group-hover:text-[#cb4a2a]" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Manejo Usuarios
          </span>
        </NavLink>

        <NavLink
          to="/users/create"
          className="flex items-center gap-4 p-3 rounded text-white transition-colors duration-200 hover:bg-[#23805c] hover:text-[#cb4a2a]"
        >
          <FaUserPlus className="text-white text-xl min-w-[24px] group-hover:text-[#cb4a2a]" />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Crear Usuario
          </span>
        </NavLink>
      </nav>

      {/* LOGOUT */}
 <button
      onClick={handleLogout}
      className="flex items-center gap-4 p-3 m-2 rounded bg-white text-[#2c976a] hover:bg-[#cb4a2a] hover:text-white transition-colors duration-200"
    >
      <FaSignOutAlt className="text-[#2c976a] text-xl min-w-[24px] hover:text-white" />
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
        Salir
      </span>
    </button>
    </aside>
  );
}
