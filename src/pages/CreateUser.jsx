import { useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function CreateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/admin/register", form);

      toast.success(`Usuario ${res.data.user.name} creado correctamente`);

      setForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("No se pudo crear el usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-10 py-8 w-full">

    
      <div className="mb-10">
        <div className="bg-[#2c976a] rounded-2xl p-6 shadow-md">
          <h1 className="text-3xl font-bold text-white">
            Crear Usuario Administrador
          </h1>
          <p className="text-white/90 mt-1">
            Registro de nuevos accesos al panel de administración
          </p>
        </div>
      </div>

  
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">

     
        <div className="grid grid-cols-12 gap-6 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="col-span-9 h-11 border border-gray-300 rounded-md px-3
              focus:ring-2 focus:ring-[#cb4a2a] outline-none"
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>

     
        <div className="grid grid-cols-12 gap-6 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="col-span-9 h-11 border border-gray-300 rounded-md px-3
              focus:ring-2 focus:ring-[#cb4a2a] outline-none"
            placeholder="correo@empresa.com"
            required
          />
        </div>

     
        <div className="grid grid-cols-12 gap-6 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700">
            Contraseña
          </label>

          <div className="col-span-9 relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="w-full h-11 border border-gray-300 rounded-md px-3 pr-12
                focus:ring-2 focus:ring-[#cb4a2a] outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center
                text-gray-500 hover:text-[#2c976a]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-12 gap-6 items-center">
          <label className="col-span-3 text-sm font-medium text-gray-700">
            Confirmar contraseña
          </label>

          <div className="col-span-9 relative">
            <input
              name="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              value={form.password_confirmation}
              onChange={handleChange}
              className="w-full h-11 border border-gray-300 rounded-md px-3 pr-12
                focus:ring-2 focus:ring-[#cb4a2a] outline-none"
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute inset-y-0 right-3 flex items-center
                text-gray-500 hover:text-[#2c976a]"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-12 mt-10">
          <div className="col-span-3"></div>

          <div className="col-span-9 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`
                px-6 py-2.5 text-white font-medium rounded-md transition
                ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#2c976a] hover:bg-[#1f704f]"
                }
              `}
            >
              {loading ? "Guardando..." : "Guardar usuario"}
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  name: "",
                  email: "",
                  password: "",
                  password_confirmation: "",
                })
              }
              className="px-6 py-2.5 border border-gray-300 rounded-md
                text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
