"use client";

import { useEffect, useState } from "react";

type Trade = {
  asset: string;
  type: string;
  entry: string;
  exit: string;
  result: "tp" | "sl" | "be";
  notes: string;
  emotion: string;
  file: string | null;
  date: string;
};

export default function AssetsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const storedTrades = JSON.parse(localStorage.getItem("trades") || "[]");
    setTrades(storedTrades);
  }, []);

  const assets = [...new Set(trades.map((t) => t.asset).filter(Boolean))];

  const getStats = (asset: string) => {
    const assetTrades = trades.filter((t) => t.asset === asset);
    const total = assetTrades.length;
    const wins = assetTrades.filter((t) => t.result === "tp").length;
    const losses = assetTrades.filter((t) => t.result === "sl").length;
    const be = assetTrades.filter((t) => t.result === "be").length;
    const winrate = total ? Math.round((wins / total) * 100) : 0;

    return { total, wins, losses, be, winrate };
  };

  return (
    <main className="min-h-screen bg-[#0e1015] text-white p-4 md:p-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Activos</h1>
          <p className="text-sm text-gray-400 mt-1">
            Rendimiento por activo operado
          </p>
        </div>

        <a
          href="/dashboard"
          className="bg-[#1a1d27] border border-white/[0.06] px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white transition"
        >
          Volver
        </a>
      </div>

      {assets.length === 0 ? (
        <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-8 text-center text-gray-400">
          Todavía no hay activos operados.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {assets.map((asset) => {
            const stats = getStats(asset);

            return (
              <div
                key={asset}
                className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold">{asset}</h2>
                    <p className="text-xs text-gray-500">
                      {stats.total} operaciones
                    </p>
                  </div>

                  <span className="text-xl font-bold text-violet-400">
                    {stats.winrate}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <Stat label="TP" value={stats.wins} color="text-emerald-400" />
                  <Stat label="SL" value={stats.losses} color="text-red-400" />
                  <Stat label="BE" value={stats.be} color="text-yellow-400" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

function Stat({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-[#1a1d27] border border-white/[0.06] rounded-xl p-3">
      <p className="text-[10px] text-gray-500 mb-1">{label}</p>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
    </div>
  );
}