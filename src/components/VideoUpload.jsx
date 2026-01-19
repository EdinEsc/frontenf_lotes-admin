import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

export default function VideoUpload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const res = await api.get("/admin/videos");
      setVideos(res.data);
    } catch {
      toast.error("Error al cargar videos");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleUpload = async () => {
    if (!file) {
      toast.warning("Selecciona un video primero");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);

    const toastId = toast.loading("Subiendo video...");

    try {
      setUploading(true);

      await api.post("/admin/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.update(toastId, {
        render: "Video subido correctamente",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setFile(null);
      setTitle("");
      loadVideos();
    } catch (err) {
      toast.update(toastId, {
        render: "Error al subir el video",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setUploading(false);
    }
  };


  const handleDelete = async (id) => {
    const toastId = toast.loading("Eliminando video...");

    try {
      await api.delete(`/admin/videos/${id}`);

      toast.update(toastId, {
        render: "Video eliminado correctamente",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      setVideos((prev) => prev.filter((v) => v.id !== id));
    } catch {
      toast.update(toastId, {
        render: "Error al eliminar el video",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="space-y-6">

 
      <div className="border rounded-xl p-4">
        <input
          type="text"
          placeholder="Título del video (opcional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 mb-2 w-full"
        />

       <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleFileChange}
          className="mb-3 w-full"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="
            bg-[#2c976a] hover:bg-[#24845c]
            text-white px-4 py-2 rounded
            transition disabled:opacity-50
          "
        >
          {uploading ? "Subiendo..." : "Subir Video"}
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border rounded-xl p-3 relative"
          >
            <video
              src={video.url}
              controls
              className="w-full rounded mb-2"
            />

            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold">
                {video.title || "Sin título"}
              </p>

              <button
                onClick={() => handleDelete(video.id)}
                className="text-red-600 hover:text-red-800"
                title="Eliminar"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

        {videos.length === 0 && (
          <p className="text-gray-500 text-sm">
            No hay videos subidos aún.
          </p>
        )}
      </div>
    </div>
  );
}
