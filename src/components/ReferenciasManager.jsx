import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

export default function ReferenciasManager() {
  const [referencias, setReferencias] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    ciudad: "",
    texto: "",
    imagen: null,
  });

  const cargarReferencias = async () => {
    try {
      const res = await api.get("/referencias");
      setReferencias(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error al cargar referencias");
    }
  };

  useEffect(() => {
    cargarReferencias();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", form.nombre);
    formData.append("ciudad", form.ciudad);
    formData.append("texto", form.texto);
    if (form.imagen) formData.append("imagen", form.imagen);

    try {
      if (editandoId) {
        await api.post(`/admin/referencias/${editandoId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Referencia actualizada correctamente");
      } else {
        await api.post("/admin/referencias", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Referencia creada correctamente");
      }

      resetForm();
      cargarReferencias();
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar la referencia");
    }
  };

  const editar = (ref) => {
    setEditandoId(ref.id);
    setForm({
      nombre: ref.nombre,
      ciudad: ref.ciudad,
      texto: ref.texto,
      imagen: null,
    });
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar referencia?")) return;

    try {
      await api.delete(`/admin/referencias/${id}`);
      setReferencias((prev) => prev.filter((r) => r.id !== id));
      toast.success("Referencia eliminada");
    } catch (err) {
      console.error(err);
      toast.error("Error al eliminar referencia");
    }
  };

  const resetForm = () => {
    setEditandoId(null);
    setForm({
      nombre: "",
      ciudad: "",
      texto: "",
      imagen: null,
    });
  };

  return (
    <div>
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="ciudad"
          value={form.ciudad}
          onChange={handleChange}
          placeholder="Ciudad / Proyecto"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="texto"
          value={form.texto}
          onChange={handleChange}
          placeholder="Comentario"
          className="border p-2 rounded md:col-span-2"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setForm({ ...form, imagen: e.target.files[0] })
          }
          className="md:col-span-2"
        />

        <button
          className={`text-white rounded px-4 py-2 md:col-span-2 transition ${
            editandoId
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-[#2c976a] hover:bg-[#24845c]"
          }`}
        >
          {editandoId ? "Actualizar referencia" : "Guardar referencia"}
        </button>

        {editandoId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white rounded px-4 py-2 md:col-span-2 hover:bg-gray-500 transition"
          >
            Cancelar edición
          </button>
        )}
      </form>

      {/* LISTADO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {referencias.map((ref) => (
          <div
            key={ref.id}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={`${import.meta.env.VITE_API_URL}/storage/${ref.imagen}`}
              alt={ref.nombre}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <p className="text-[#2c976a] italic text-sm mb-2">
                “{ref.texto}”
              </p>
              <p className="font-bold">{ref.nombre}</p>
              <p className="text-xs text-gray-500 mb-3">
                {ref.ciudad}
              </p>

              <div className="flex justify-between text-sm">
                <button
                  onClick={() => editar(ref)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminar(ref.id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
