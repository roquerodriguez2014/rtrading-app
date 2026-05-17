"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Trade = {
  id?: string;
  user_id?: string;
  asset: string;
  type: string;
  entry: number | string;
  stop_loss?: number | string | null;
  take_profit?: number | string | null;
  exit: number | string | null;
  result: string;
  rr?: number | null;
  pnl?: number | null;
  notes: string;
  emotion: string;
  file_url?: string | null;
  trade_date?: string;
  trade_time?: string;
  session_name?: string;
  created_at?: string;
};

export default function TradeHistoryPage() {
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openImage, setOpenImage] = useState<string | null>(null);
  useEffect(() => {
    async function loadTrades() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/";
        return;
      }

      const { data, error } = await supabase
        .from("trades")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        alert("Error cargando operaciones: " + error.message);
        return;
      }

      if (data) {
        setTrades(data);
      }
    }

    loadTrades();
  }, []);

  async function handleDeleteTrade(trade: Trade) {
    if (!trade.id) {
      alert("No se puede eliminar esta operación porque no tiene ID.");
      return;
    }

    const confirmDelete = window.confirm(
      "¿Seguro que querés eliminar esta operación? Esta acción no se puede deshacer."
    );

    if (!confirmDelete) return;

    setIsDeleting(true);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setIsDeleting(false);
      window.location.href = "/";
      return;
    }

    const { error } = await supabase
      .from("trades")
      .delete()
      .eq("id", trade.id)
      .eq("user_id", session.user.id);

    setIsDeleting(false);

    if (error) {
      alert("Error eliminando operación: " + error.message);
      return;
    }

    setTrades((currentTrades) => currentTrades.filter((item) => item.id !== trade.id));
    setSelectedTrade(null);
  }

  return (
    <main className="min-h-screen bg-[#0e1015] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Historial de operaciones</h1>
          <p className="text-sm text-gray-400 mt-1">
            Todas las operaciones registradas
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Volver
        </button>
      </div>

      <div className="grid gap-4">
        {trades.map((trade) => (
          <div
            key={trade.id || trade.created_at}
            onClick={() => setSelectedTrade(trade)}
            className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5 cursor-pointer hover:border-violet-500/30 transition"
          >
            <div className="flex justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-lg font-bold">{trade.asset}</h2>

                  <span className="text-xs bg-[#1a1d27] border border-white/[0.06] px-2 py-1 rounded-md text-gray-300">
                    {trade.type}
                  </span>

                  <span
                    className={`text-xs px-2 py-1 rounded-md font-semibold ${
                      trade.result === "tp"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : trade.result === "sl"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {trade.result.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
                  <Info label="Entrada" value={String(trade.entry ?? "")} />
                  <Info label="Salida" value={String(trade.exit ?? "")} />
                  <Info
                    label="Fecha"
                    value={
                      trade.created_at
                        ? new Date(trade.created_at).toLocaleString()
                        : "—"
                    }
                  />
                  <Info label="Resultado" value={trade.result.toUpperCase()} />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <TextBlock title="Notas" text={trade.notes} />
                  <TextBlock title="Psicología" text={trade.emotion} />
                </div>
              </div>
{trade.file_url && (
  <div className="w-[220px] shrink-0">
    <img
      src={trade.file_url}
      alt="Captura del trade"
      onClick={(e) => {
        e.stopPropagation();
        if (trade.file_url) {
          setOpenImage(trade.file_url);
        }
      }}
      className="
  w-[85%]
  mx-auto
  rounded-xl
  border border-white/[0.06]
  object-cover
  cursor-pointer
  hover:scale-[1.02]
  transition
"
    />
  </div>
)}
            </div>
          </div>
        ))}

        {trades.length === 0 && (
          <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-8 text-center text-gray-400">
            Todavía no hay operaciones guardadas.
          </div>
        )}
      </div>

      {selectedTrade && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#13161e] border border-white/[0.06] rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              type="button"
              onClick={() => setSelectedTrade(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1a1d27] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
            >
              ✕
            </button>

            <div className="flex flex-wrap items-center gap-3 mb-5 pr-12">
              <h2 className="text-2xl font-bold">{selectedTrade.asset}</h2>

              <span className="text-xs bg-[#1a1d27] border border-white/[0.06] px-2 py-1 rounded-md text-gray-300">
                {selectedTrade.type}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-md font-semibold ${
                  selectedTrade.result === "tp"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : selectedTrade.result === "sl"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {selectedTrade.result.toUpperCase()}
              </span>
            </div>

            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("editingTrade", JSON.stringify(selectedTrade));
                  window.location.href = "/trades/new";
                }}
                className="px-4 py-2 rounded-xl bg-[#1a1d27] border border-white/[0.06] text-sm text-gray-300 hover:text-white transition"
              >
                Editar
              </button>

              <button
                type="button"
                disabled={isDeleting}
                onClick={() => handleDeleteTrade(selectedTrade)}
                className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.06]">
                  <p className="text-[11px] text-gray-500 uppercase mb-2">
                    Información
                  </p>

                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Entrada:</strong> {selectedTrade.entry || "—"}
                    </p>
                    <p>
                      <strong>Stop Loss:</strong> {selectedTrade.stop_loss || "—"}
                    </p>
                    <p>
                      <strong>Take Profit:</strong> {selectedTrade.take_profit || "—"}
                    </p>
                    <p>
                      <strong>Salida:</strong> {selectedTrade.exit || "—"}
                    </p>
                    <div>
  <p className="text-xs text-slate-400">PnL</p>

  <p
    className={`text-sm font-semibold ${
      Number(selectedTrade.pnl || 0) >= 0
        ? "text-emerald-400"
        : "text-red-400"
    }`}
  >
    {Number(selectedTrade.pnl || 0) >= 0 ? "+" : ""}
    ${Number(selectedTrade.pnl || 0).toFixed(2)}
  </p>
</div>
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {selectedTrade.created_at
                        ? new Date(selectedTrade.created_at).toLocaleString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.06]">
                  <p className="text-[11px] text-gray-500 uppercase mb-2">Notas</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedTrade.notes || "Sin notas"}
                  </p>
                </div>

                <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.06]">
                  <p className="text-[11px] text-gray-500 uppercase mb-2">
                    Psicología
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {selectedTrade.emotion || "Sin información"}
                  </p>
                </div>
              </div>

              <div>
                {selectedTrade.file_url ? (
                  <img
                    src={selectedTrade.file_url}
                    alt="Trade"
                    className="w-full rounded-2xl border border-white/[0.06]"
                  />
                ) : (
                  <div className="w-full h-[320px] rounded-2xl border border-dashed border-white/[0.06] flex items-center justify-center text-gray-500">
                    Sin captura
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
          {openImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4"
          onClick={() => setOpenImage(null)}
        >
          <div className="relative max-w-6xl w-full">
            <button
              type="button"
              onClick={() => setOpenImage(null)}
              className="absolute top-3 right-3 text-white text-3xl z-50"
            >
              ✕
            </button>

            <img
              src={openImage}
              alt="Zoom"
              className="w-full max-h-[90vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#1a1d27] border border-white/[0.06] rounded-xl p-3">
      <p className="text-[11px] text-gray-500 uppercase mb-1">{label}</p>
      <p className="text-sm font-semibold">{value || "—"}</p>
    </div>
  );
}

function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-[#1a1d27] border border-white/[0.06] rounded-xl p-3">
      <p className="text-[11px] text-gray-500 uppercase mb-1">{title}</p>
      <p className="text-sm text-gray-300 leading-relaxed">
        {text || "Sin información"}
      </p>
    </div>
  );
}
