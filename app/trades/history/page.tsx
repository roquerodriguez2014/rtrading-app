"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Trade = {
  asset: string;
  type: string;
  entry: string;
  exit: string;
  result: string;
  notes: string;
  emotion: string;
  file: string | null;
  date: string;
};

export default function TradeHistoryPage() {
  const router = useRouter();
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [trades, setTrades] = useState<Trade[]>([]);

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

    if (!error && data) {
      setTrades(data);
    }
  }

  loadTrades();
}, []);
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
          onClick={() => router.push("/dashboard")}
          className="bg-violet-600 hover:bg-violet-500 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Volver
        </button>
      </div>

      <div className="grid gap-4">
        {trades.map((trade, index) => (
          <div
            key={index}
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
                  <Info label="Entrada" value={trade.entry} />
                  <Info label="Salida" value={trade.exit} />
                  <Info
                    label="Fecha"
                    value={new Date(trade.date).toLocaleString()}
                  />
                  <Info label="Resultado" value={trade.result.toUpperCase()} />
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <TextBlock title="Notas" text={trade.notes} />
                  <TextBlock title="Psicología" text={trade.emotion} />
                </div>
              </div>

              {trade.file && (
                <div className="w-[220px] shrink-0">
                  <img
                    src={trade.file}
                    alt="Captura del trade"
                    className="w-full rounded-xl border border-white/[0.06] object-cover"
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
        onClick={() => setSelectedTrade(null)}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#1a1d27] hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition"
      >
        ✕
      </button>

      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-bold">
          {selectedTrade.asset}
        </h2>

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
        <div className="flex gap-2 mb-6">
  <button
  onClick={() => {
    localStorage.setItem(
      "editingTrade",
      JSON.stringify(selectedTrade)
    );

    window.location.href = "/trades/new";
  }}
  className="px-4 py-2 rounded-xl bg-[#1a1d27] border border-white/[0.06] text-sm text-gray-300 hover:text-white transition"
>
  Editar
</button>

  <button
    onClick={() => {
      const updatedTrades = trades.filter(
        (t) => t.date !== selectedTrade.date
      );

      localStorage.setItem(
        "trades",
        JSON.stringify(updatedTrades)
      );

      setTrades(updatedTrades);
      setSelectedTrade(null);
    }}
    className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 hover:bg-red-500/20 transition"
  >
    Eliminar
  </button>
</div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-4">

          <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.06]">
            <p className="text-[11px] text-gray-500 uppercase mb-2">
              Información
            </p>

            <div className="space-y-2 text-sm">
              <p><strong>Entrada:</strong> {selectedTrade.entry}</p>
              <p><strong>Salida:</strong> {selectedTrade.exit}</p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(selectedTrade.date).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-[#1a1d27] rounded-2xl p-4 border border-white/[0.06]">
            <p className="text-[11px] text-gray-500 uppercase mb-2">
              Notas
            </p>

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
          {selectedTrade.file ? (
            <img
              src={selectedTrade.file}
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