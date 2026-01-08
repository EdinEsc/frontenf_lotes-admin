import { useEffect, useState } from "react";
import api from "../api/axios";

export default function GalleryManager({ section = "home" }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    api
      .get(`/gallery?section=${section}`)
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, [section]);

  const replaceImage = async (id, file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post(
        `/admin/gallery/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setImages(prev =>
        prev.map(img =>
          img.id === id ? { ...img, url: res.data.url } : img
        )
      );
    } catch (err) {
      console.error("Error al reemplazar imagen", err);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {images.map(img => (
        <label
          key={img.id}
          className="
            relative cursor-pointer
            border border-[#cb4a2a]
            rounded-xl overflow-hidden
            group
          "
        >
          <img
            src={img.url}
            alt="Galería"
            className="
              w-full h-24 sm:h-32 object-cover
              transition-transform duration-300
              group-hover:scale-105
            "
          />

          <div
            className="
              absolute inset-0
              bg-black/40 opacity-0
              group-hover:opacity-100
              flex items-center justify-center
              text-white text-sm font-semibold
              transition
            "
          >
            Cambiar imagen
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) replaceImage(img.id, file);
            }}
          />
        </label>
      ))}
    </div>
  );
}
