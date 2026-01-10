// // src/pages/DashboardLayout.jsx
// import { Routes, Route } from 'react-router-dom'
// import Sidebar from '../components/Sidebar'
// import Dashboard from './Dashboard'
// import Users from './Users'
// import CreateUser from './CreateUser'


// export default function DashboardLayout() {
//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Contenido */}
//       <main className="flex-1 ml-16 p-6">
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/users/create" element={<CreateUser />} />
//         </Routes>
//       </main>
//     </div>
//   )
// }


import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Dashboard from './Dashboard'
import Users from './Users'
import CreateUser from './CreateUser'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout() {
  return (
    <>
      {/* 🔔 NOTIFICACIONES GLOBALES */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido */}
        <main className="flex-1 ml-16 p-6">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/create" element={<CreateUser />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
