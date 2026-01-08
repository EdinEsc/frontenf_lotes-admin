import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ImageUpload({ title, imageKey }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // 🔄 Cargar imagen actual por key
  useEffect(() => {
    api
      .get(`/page-image/${imageKey}`)
      .then(res => setImageUrl(res.data.url))
      .catch(() => setImageUrl(null));
  }, [imageKey]);

  // 📤 Subir imagen
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("key", imageKey);
    formData.append("image", file);

    setLoading(true);
    setMsg("");

    try {
      const res = await api.post("/admin/imagenes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // setImageUrl(`${import.meta.env.VITE_API_URL}/storage/${res.data.path}`);
      setImageUrl(
        `${import.meta.env.VITE_API_URL}/storage/${res.data.path}?t=${Date.now()}`
      );
      setMsg("✅ Imagen actualizada correctamente");
    } catch (error) {
      console.error(error);
      setMsg("❌ Error al subir la imagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#2c976a] mb-3">
        {title}
      </h3>

      {/* {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full max-w-md h-40 object-cover rounded mb-4 border"
        />
      )} */}

      {imageUrl && (
        <img
          key={imageUrl}
          src={imageUrl}
          alt={title}
          className="w-full max-w-md h-40 object-cover rounded mb-4 border"
        />
      )}


      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={loading}
        className="block"
      />

      {loading && (
        <p className="text-sm text-gray-500 mt-2">Subiendo imagen...</p>
      )}

      {msg && (
        <p className="text-sm mt-2 text-[#2c976a] font-semibold">
          {msg}
        </p>
      )}
    </div>
  );
}
