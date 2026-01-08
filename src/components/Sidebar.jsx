// import { NavLink, useNavigate } from 'react-router-dom';
// import { FaHome, FaUsers, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

// export default function Sidebar() {
//   const navigate = useNavigate();

//  const handleLogout = () => {
//     // Si tienes token en localStorage o sesión, puedes limpiarlo aquí
//     localStorage.removeItem('token'); // ejemplo
//     // Redirige al login principal
//     navigate('/', { replace: true }); // replace evita volver atrás
//   };

//   return (
//     <aside
//       className="
//         group
//         fixed top-0 left-0 h-screen
//         w-16 hover:w-56
//         bg-[#2c976a]
//         text-white
//         transition-all duration-300
//         flex flex-col
//       "
//     >
//       {/* LOGO */}
//       {/* LOGO / TEXTO ADMINISTRATIVO */}
//       <div className="h-20 flex items-center justify-center">
//         <span className="text-2xl md:text-3xl font-extrabold text-white tracking-wide
//           drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]
//           drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]">
//           Administrativa
//         </span>
//       </div>


//       {/* MENU */}
//       <nav className="flex-1 space-y-1 px-2 mt-4">
//         <NavLink
//           to="/dashboard"
//           className="flex items-center gap-4 p-3 rounded text-white transition-colors duration-200 hover:bg-[#23805c] hover:text-[#cb4a2a]"
//         >
//           <FaHome className="text-white text-xl min-w-[24px] group-hover:text-[#cb4a2a]" />
//           <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
//             Dashboard
//           </span>
//         </NavLink>

//         <NavLink
//           to="/users"
//           className="flex items-center gap-4 p-3 rounded text-white transition-colors duration-200 hover:bg-[#23805c] hover:text-[#cb4a2a]"
//         >
//           <FaUsers className="text-white text-xl min-w-[24px] group-hover:text-[#cb4a2a]" />
//           <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
//             Manejo Usuarios
//           </span>
//         </NavLink>

//         <NavLink
//           to="/users/create"
//           className="flex items-center gap-4 p-3 rounded text-white transition-colors duration-200 hover:bg-[#23805c] hover:text-[#cb4a2a]"
//         >
//           <FaUserPlus className="text-white text-xl min-w-[24px] group-hover:text-[#cb4a2a]" />
//           <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
//             Crear Usuario
//           </span>
//         </NavLink>
//       </nav>

//       {/* LOGOUT */}
//  <button
//       onClick={handleLogout}
//       className="flex items-center gap-4 p-3 m-2 rounded bg-white text-[#2c976a] hover:bg-[#cb4a2a] hover:text-white transition-colors duration-200"
//     >
//       <FaSignOutAlt className="text-[#2c976a] text-xl min-w-[24px] hover:text-white" />
//       <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
//         Salir
//       </span>
//     </button>
//     </aside>
//   );
// }



import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    // <aside
    //   className="
    //     group
    //     fixed top-0 left-0 h-screen
    //     w-16 hover:w-56
    //     bg-[#2c976a]
    //     text-white
    //     transition-all duration-300
    //     flex flex-col
    //   "
    // >
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
