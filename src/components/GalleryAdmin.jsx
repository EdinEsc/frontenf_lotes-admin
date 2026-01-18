import { useEffect, useState } from "react";
import api from "../api/axios";

function GalleryAdmin() {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    api.get("/admin/imagenes-gallery")
      .then(res => setImages(res.data))
      .catch(err => console.error(err));
  }, []);

 
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Selecciona una imagen");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      await api.post("/admin/imagenes-gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Imagen subida correctamente");
      setError("");
      setImage(null);

     
      const res = await api.get("/admin/imagenes-gallery");
      setImages(res.data);
    } catch {
      setError("Error al subir la imagen");
      setMessage("");
    }
  };

  return (
    <div>
      <h3>Galería Admin</h3>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />
        <button>Subir Imagen</button>
      </form>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "20px" }}>
       {images.map((img) => (
          <div key={img.id} style={{ width: "150px" }}>
            <img
              src={`${import.meta.env.VITE_API_URL}/storage/${img.path}`}
              alt="Gallery"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryAdmin;
