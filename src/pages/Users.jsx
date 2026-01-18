import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import * as XLSX from "xlsx";

const ITEMS_PER_PAGE = 8;

export default function Users() {
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const totalMessages = messages.length;
  


  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [emailFilter, setEmailFilter] = useState("");


  const stats = useMemo(() => {
    const today = new Date().toDateString();

    let todayCount = 0;
    let last7Days = 0;

    messages.forEach((msg) => {
      const msgDate = new Date(msg.created_at);
      const diffDays =
        (new Date() - msgDate) / (1000 * 60 * 60 * 24);

      if (msgDate.toDateString() === today) {
        todayCount++;
      }

      if (diffDays <= 7) {
        last7Days++;
      }
    });

    return {
      today: todayCount,
      week: last7Days,
      total: messages.length,
    };
  }, [messages]);



  useEffect(() => {
    api
      .get("/admin/mensajes")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, []);


  const filteredMessages = useMemo(() => {
    return messages
      .filter((msg) => {
        const msgDate = new Date(msg.created_at);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate + "T23:59:59") : null;

        if (from && msgDate < from) return false;
        if (to && msgDate > to) return false;

        if (
          emailFilter &&
          !msg.email.toLowerCase().includes(emailFilter.toLowerCase())
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [messages, fromDate, toDate, emailFilter]);


  const totalPages = Math.ceil(filteredMessages.length / ITEMS_PER_PAGE);

  const paginatedMessages = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredMessages.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMessages, page]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };


  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setEmailFilter("");
    setPage(1);
  };


  const downloadExcel = () => {
    const data = filteredMessages.map((m) => ({
      Nombre: m.nombre,
      Email: m.email,
      Teléfono: m.telefono || "",
      Mensaje: m.mensaje || "",
      Fecha: new Date(m.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Mensajes");

    XLSX.writeFile(workbook, "mensajes_contacto.xlsx");
  };

  return (
    <div className="min-h-screen bg-white p-6">

      <div className="mb-8">
       <div className="bg-[#2c976a] rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Mensajes de Contacto
            </h1>

            <p className="text-white/90 mt-1">
              Gestión y revisión de formularios enviados
            </p>
          </div>

        
       
          <div className="grid grid-cols-3 gap-4 text-center">

         
            <div className="bg-white/20 backdrop-blur px-6 py-4 rounded-xl">
              <p className="text-white text-sm uppercase tracking-wide">
                Hoy
              </p>
              <p className="text-white text-3xl font-extrabold">
                {stats.today}
              </p>
            </div>

       
            <div className="bg-white/20 backdrop-blur px-6 py-4 rounded-xl">
              <p className="text-white text-sm uppercase tracking-wide">
                Últimos 7 días
              </p>
              <p className="text-white text-3xl font-extrabold">
                {stats.week}
              </p>
            </div>

      
            <div className="bg-white/20 backdrop-blur px-6 py-4 rounded-xl">
              <p className="text-white text-sm uppercase tracking-wide">
                Total
              </p>
              <p className="text-white text-3xl font-extrabold">
                {stats.total}
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white p-5 rounded-xl border mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Desde
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#cb4a2a] focus:border-[#cb4a2a]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Hasta
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#cb4a2a] focus:border-[#cb4a2a]"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Filtrar por correo
          </label>
          <input
            type="text"
            placeholder="correo@ejemplo.com"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-[#cb4a2a] focus:border-[#cb4a2a]"
          />
        </div>

        <div className="flex flex-col gap-2 justify-end">
          <button
            onClick={downloadExcel}
            className="bg-[#2c976a] text-white px-4 py-2 rounded text-sm hover:opacity-90"
          >
            Descargar Excel
          </button>

          <button
            onClick={clearFilters}
            className="border border-gray-300 px-4 py-2 rounded text-sm text-gray-600 hover:bg-gray-100"
          >
            Quitar filtros
          </button>
        </div>
      </div>

   
      <div className="space-y-4">
        {paginatedMessages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => toggleExpand(msg.id)}
            className="relative bg-white rounded-xl border shadow-sm hover:shadow-md transition cursor-pointer"
          >
       
            <span className="absolute top-3 right-4 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              {new Date(msg.created_at).toLocaleDateString()}
            </span>

            <div className="p-4">
              <p className="font-semibold text-gray-800">
                {msg.nombre}
              </p>
              <p className="text-sm text-gray-500">
                {msg.email}
              </p>
            </div>

            {expandedId === msg.id && (
              <div className="px-4 pb-4 border-t bg-gray-50 text-sm text-gray-700 space-y-2">
                {msg.telefono && (
                  <p><strong>Teléfono:</strong> {msg.telefono}</p>
                )}
                {msg.mensaje && (
                  <p><strong>Mensaje:</strong> {msg.mensaje}</p>
                )}
                <p className="text-xs text-gray-400">
                  Creado: {new Date(msg.created_at).toLocaleString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

  
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 rounded border text-sm disabled:opacity-40"
          >
            ← Anterior
          </button>

          <span className="text-sm text-gray-600">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 rounded border text-sm disabled:opacity-40"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
}
