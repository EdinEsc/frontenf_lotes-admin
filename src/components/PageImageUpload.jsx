import { useEffect, useState } from "react";
import api from "../api/axios";

export default function PageImageUpload({ title, imageKey }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔄 Cargar imagen por key
  useEffect(() => {
    api
      .get(`/page-image/${imageKey}`)
      .then(res => setImageUrl(res.data.url))
      .catch(() => setImageUrl(null));
  }, [imageKey]);

  // 📤 Subir nueva imagen
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("key", imageKey);
    formData.append("image", file);

    setLoading(true);

    try {
      const res = await api.post("/admin/imagenes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // setImageUrl(`${import.meta.env.VITE_API_URL}/storage/${res.data.path}`);
    // setImageUrl(
    //   `${import.meta.env.VITE_API_URL}/storage/${res.data.path}?t=${Date.now()}`
    // );
    setImageUrl(
  `${import.meta.env.VITE_API_URL}/storage/${res.data.path}?t=${Date.now()}`
);

    } catch (error) {
      console.error("Error subiendo imagen", error);
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
        onChange={handleUpload}
        disabled={loading}
        className="block"
      />

      {loading && (
        <p className="text-sm text-gray-500 mt-2">Subiendo imagen...</p>
      )}
    </div>
  );
}
