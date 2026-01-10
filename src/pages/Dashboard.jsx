// import { useEffect, useState } from "react";
// import api from "../api/axios";

// import ImageUpload from "../components/ImageUpload";
// import PageImageUpload from "../components/PageImageUpload";
// import VideoUpload from "../components/VideoUpload";

// function Dashboard() {
//   const [messages, setMessages] = useState([]);
//   const [galleryImages, setGalleryImages] = useState([]);

//   useEffect(() => {
//     api.get("/admin/mensajes").then(res => setMessages(res.data));

//     api.get("/admin/imagenes-gallery")
//       .then(res => setGalleryImages(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     // <div className="min-h-screen bg-gray-50 p-6">
//     <div className="
//       min-h-screen bg-gray-50 p-6
//       ml-16
//       transition-all duration-300
//       group-hover:ml-56
//     ">
//       {/* ENCABEZADO */}
//       <header className="mb-6">
//         <h2 className="text-3xl font-bold text-[#cb4a2a]">
//           Dashboard Admin
//         </h2>
//         <p className="text-gray-600 mt-1">
//           Bienvenido al panel de administración
//         </p>
//       </header>

//       {/* HERO IMAGE */}
//       <section className="mb-8">
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <ImageUpload
//             title="Imagen Hero Principal"
//             imageKey="hero_image"
//           />
//         </div>
//       </section>

//       {/* CONTACT BACKGROUND */}
//       <section className="mb-8">
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <PageImageUpload
//             title="Fondo del Formulario de Contacto"
//             imageKey="contact_background"
//           />
//         </div>
//       </section>

//       {/* VIDEO */}
//       <section className="mb-8">
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="text-xl font-semibold text-[#2c976a] mb-3">
//             Subir Video
//           </h3>
//           <VideoUpload />
//         </div>
//       </section>

//       {/* GALERÍA */}
//       <section className="mb-8">
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <h3 className="text-xl font-semibold text-[#2c976a] mb-4">
//             Galería de Imágenes
//           </h3>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//             {galleryImages.map((img) => (
//               <div key={img.id} className="border rounded-lg overflow-hidden relative">
//                 <img
//                   src={img.url}
//                   alt="Galería"
//                   className="w-full h-24 sm:h-32 object-cover"
//                 />

//                 <input
//                   type="file"
//                   className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
//                   onChange={async (e) => {
//                     const file = e.target.files[0];
//                     if (!file) return;

//                     const formData = new FormData();
//                     formData.append("image", file);

//                     try {
//                       const res = await api.post(
//                         `/admin/imagenes-gallery/${img.id}`,
//                         formData,
//                         { headers: { "Content-Type": "multipart/form-data" } }
//                       );

//                       setGalleryImages(prev =>
//                         prev.map(i =>
//                           i.id === img.id ? { ...i, url: res.data.url } : i
//                         )
//                       );
//                     } catch (err) {
//                       console.error("Error al actualizar imagen", err);
//                     }
//                   }}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <hr className="my-8 border-gray-300" />
//     </div>
//   );
// }

// export default Dashboard;


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
      {/* ENCABEZADO */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-[#cb4a2a]">
          Dashboard Admin
        </h2>
        <p className="text-gray-600 mt-1">
          Bienvenido al panel de administración
        </p>
      </header>

      {/* HERO IMAGE */}
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
          <ImageUpload
            title="Plano de Lotes"
            imageKey="hero_image"
          />
        </div>
      </section>

      {/* CONTACT BACKGROUND */}
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
          <PageImageUpload
            title="Fondo del Formulario de Contacto"
            imageKey="contact_background"
          />
        </div>
      </section>

      {/* VIDEO */}
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
          <h3 className="text-xl font-semibold text-[#cb4a2a] mb-4">
            Subir Video
          </h3>
          <VideoUpload />
        </div>
      </section>

      {/* GALERÍA */}
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

                    // try {
                    //   const res = await api.post(
                    //     `/admin/imagenes-gallery/${img.id}`,
                    //     formData,
                    //     { headers: { "Content-Type": "multipart/form-data" } }
                    //   );

                    //   setGalleryImages(prev =>
                    //     prev.map(i =>
                    //       i.id === img.id ? { ...i, url: res.data.url } : i
                    //     )
                    //   );
                    // } catch (err) {
                    //   console.error("Error al actualizar imagen", err);
                    // }
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

      {/* GALERÍA */}
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
          <h3 className="text-xl font-semibold text-[#cb4a2a] mb-4">
            Galería de Imágenes
          </h3>

          <GalleryManager section="home" />
        </div>
      </section>

      {/* REFERENCIAS */}
      <section className="mb-8">
        <div className="bg-white rounded-xl border border-[#cb4a2a] shadow-sm p-5">
          <h3 className="text-xl font-semibold text-[#cb4a2a] mb-4">
            Referencias / Testimonios
          </h3>

          <ReferenciasManager />
        </div>
      </section>



      <hr className="my-8 border-gray-300" />
    </div>
  );
}

export default Dashboard;
