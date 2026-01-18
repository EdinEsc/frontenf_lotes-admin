import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import ImageUpload from "../components/ImageUpload";
import PageImageUpload from "../components/PageImageUpload";
import VideoUpload from "../components/VideoUpload";
import GalleryManager from "../components/GalleryManager";
import ReferenciasManager from "../components/ReferenciasManager";



function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [showReferencias, setShowReferencias] = useState(false);



  useEffect(() => {
    api.get("/admin/mensajes")
      .then(res => setMessages(res.data))
      .catch(() => toast.error("Error al cargar mensajes"));

    api.get("/admin/imagenes-gallery")
      .then(res => setGalleryImages(res.data))
      .catch(() => toast.error("Error al cargar galería"));
  }, []);

  return (
    <div
      className="
        min-h-screen bg-white p-6
        ml-16
        transition-all duration-300
        group-hover:ml-56
      "
    >
 
 
      <div className="mb-10">
        <div className="rounded-2xl bg-[#2c976a] p-8 shadow-lg flex flex-col md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-4xl font-bold text-white">
              Panel de Administración
            </h2>
            <p className="mt-2 text-white/90">
              Gestión de contenido del sitio web
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="px-6 py-3 bg-white/20 rounded-xl text-white font-semibold">
              Lotes Chancay · Admin
            </div>
          </div>

        </div>
      </div>


      <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
        
            <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
              <ImageUpload
                title="Plano de Lotes"
                imageKey="hero_image"
              />
            </div>

        
            <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
              <PageImageUpload
                title="Fondo del Formulario de Contacto"
                imageKey="contact_background"
              />
            </div>

          </div>
      </section>


      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">

      
          <button
            onClick={() => setShowVideo(prev => !prev)}
            className="
              w-full flex justify-between items-center
              text-xl font-semibold text-[#cb4a2a]
            "
          >
            Gestión de Videos
            <span className="text-2xl">
              {showVideo ? "−" : "+"}
            </span>
          </button>

        
          <div
            className={`
              overflow-hidden transition-all duration-500
              ${showVideo ? "max-h-[3000px] mt-6" : "max-h-0"}
            `}
          >
            <VideoUpload />
          </div>

        </div>
      </section>


   
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
          <h3 className="text-xl font-semibold text-[#cb4a2a] mb-4">
            Galería de Imágenes principal
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {galleryImages.map((img) => (
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

                {/* OVERLAY */}
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
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                  
                    try {
                      const res = await api.post(
                        `/admin/imagenes-gallery/${img.id}`,
                        formData,
                        { headers: { "Content-Type": "multipart/form-data" } }
                      );

                      setGalleryImages(prev =>
                        prev.map(i =>
                          i.id === img.id ? { ...i, url: res.data.url } : i
                        )
                      );

                      toast.success("Imagen actualizada correctamente");
                    } catch (err) {
                      console.error("Error al actualizar imagen", err);
                      toast.error("Error al actualizar la imagen");
                    }

                  }}
                />
              </label>
            ))}
          </div>
        </div>
      </section>

      
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
          <h3 className="text-xl font-semibold text-[#cb4a2a] mb-4">
            Galería de Imágenes
          </h3>

          <GalleryManager section="home" />
        </div>
      </section>

    
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">

          <button
            onClick={() => setShowReferencias(prev => !prev)}
            className="
              w-full flex justify-between items-center
              text-xl font-semibold text-[#cb4a2a]
            "
          >
            Referencias / Testimonios
            <span className="text-2xl">
              {showReferencias ? "−" : "+"}
            </span>
          </button>

        
          <div
            className={`
              overflow-hidden transition-all duration-500
              ${showReferencias ? "max-h-[3000px] mt-6" : "max-h-0"}
            `}
          >
            <ReferenciasManager />
          </div>

        </div>
      </section>

      <hr className="my-8 border-gray-300" />
    </div>
  );
}

export default Dashboard;
