"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";


// ─── TYPES ───────────────────────────────────────────────────────────────────

interface Trade {
  instrument: string;
  subtitle: string;
  amount: string;
  date: string;
  status: "win" | "loss" | "processing";
  rr: string;
}

interface Session {
  flag: string;
  name: string;
  pct: number;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

const TRADES: Trade[] = [
  { instrument: "BTCUSD", subtitle: "Bitcoin / Dollar",  amount: "$30,021.23", date: "13 Dic, 2023", status: "processing", rr: "1:2.8" },
  { instrument: "EURUSD", subtitle: "Euro / Dollar",     amount: "$10,045.00", date: "13 Dic, 2023", status: "win",        rr: "1:3.2" },
  { instrument: "XAUUSD", subtitle: "Gold / Dollar",     amount: "$40,132.16", date: "13 Dic, 2023", status: "win",        rr: "1:4.1" },
  { instrument: "SPXUSD", subtitle: "S&P 500 Index",     amount: "$22,665.12", date: "28 Dic, 2023", status: "loss",       rr: "1:1.1" },
];

const SESSIONS: Session[] = [
  { flag: "🇺🇸", name: "Nueva York", pct: 85 },
  { flag: "🇬🇧", name: "Londres",    pct: 70 },
  { flag: "🇯🇵", name: "Tokio",      pct: 45 },
  { flag: "🇦🇺", name: "Sídney",     pct: 38 },
];

const CANDLES: [number, number][] = [
  [30, 1], [55, 1], [40, 0], [75, 1], [50, 0],
  [85, 1], [45, 0], [70, 1], [60, 1], [95, 1],
  [65, 0], [80, 1], [55, 1], [100,1], [72, 0],
];

// ─── STATUS HELPERS ───────────────────────────────────────────────────────────

const STATUS_LABEL  = { win: "Win", loss: "Loss", processing: "Procesando" };
const STATUS_COLOR  = {
  win:        "bg-emerald-400",
  loss:       "bg-red-400",
  processing: "bg-yellow-400",
};
const STATUS_GLOW   = {
  win:        "shadow-[0_0_6px_#34d399]",
  loss:       "shadow-[0_0_6px_#f87171]",
  processing: "shadow-[0_0_6px_rgba(251,191,36,0.5)]",
};

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [user,   setUser]   = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [tab,    setTab]    = useState<"overview" | "notif" | "history">("overview");
  const [savedTrades, setSavedTrades] = useState<any[]>([]);
  const [selectedAsset, setSelectedAsset] = useState("GENERAL");
useEffect(() => {
  async function checkAuth() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      window.location.href = "/";
      return;
    }

   const { data: profile } = await supabase
  .from("profiles")
  .select("avatar_url")
  .eq("id", session.user.id)
  .single();

if (profile?.avatar_url) {
  setAvatar(profile.avatar_url);
}

    const { data, error } = await supabase
      .from("trades")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setSavedTrades(data);
    }
  }

  checkAuth();
}, []);
 async function logout() {
  await supabase.auth.signOut();

  localStorage.removeItem("user");

  window.location.href = "/";
}
<button
  onClick={logout}
  className="md:hidden w-full mt-6 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/20 transition"
>
  Cerrar sesión
</button>
async function handleAvatar(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const fileExt = file.name.split(".").pop();

  const filePath = `${user.id}/avatar.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  const {
    data: { publicUrl },
  } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  const { error: profileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email,
      avatar_url: publicUrl,
    });

  if (profileError) {
    alert(profileError.message);
    return;
  }

  setAvatar(publicUrl);
}
const recentTrades = [...savedTrades]
  .reverse()
  .slice(0, 4);
  const assetTrades =
  selectedAsset === "GENERAL"
    ? savedTrades
    : savedTrades.filter(
        (trade) => trade.asset === selectedAsset
      );

const assetWins = assetTrades.filter(
  (t) => t.result === "tp"
).length;

const assetLosses = assetTrades.filter(
  (t) => t.result === "sl"
).length;

const assetBreakeven = assetTrades.filter(
  (t) => t.result === "be"
).length;
const assetTotal = assetTrades.length;

const assetWinPct = assetTotal
  ? Math.round((assetWins / assetTotal) * 100)
  : 0;

const assetLossPct = assetTotal
  ? Math.round((assetLosses / assetTotal) * 100)
  : 0;

const assetBePct = assetTotal
  ? Math.round((assetBreakeven / assetTotal) * 100)
  : 0;
  const totalTrades = savedTrades.length;

const wins = savedTrades.filter(
  (t) => t.result === "tp"
).length;

const losses = savedTrades.filter(
  (t) => t.result === "sl"
).length;

const breakeven = savedTrades.filter(
  (t) => t.result === "be"
).length;

const winRate = totalTrades
  ? Math.round((wins / totalTrades) * 100)
  : 0;
const averageRR = totalTrades
  ? (
      savedTrades.reduce((acc, trade) => {
        const entry = Number(trade.entry || 0);
        const exit = Number(trade.exit || 0);

        if (!entry || !exit) return acc;

        const rr = Math.abs(exit - entry) / entry;

        return acc + rr;
      }, 0) / totalTrades
    ).toFixed(2)
  : "0";
  return (
    <main className="min-h-screen bg-[#0e1015] text-[#f0f2f8] flex flex-col xl:flex-row font-sans overflow-hidden">

      {/* ── SIDEBAR ── */}
       <aside className="hidden xl:flex w-[220px] min-w-[220px] bg-[#13161e] border-r border-white/[0.06] flex-col py-5 px-3.5 gap-1">

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2 pb-5">
          
          <div className="w-[34px] h-[34px] rounded-[10px] bg-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_18px_rgba(124,92,252,0.35)]">
            RT
          </div>
          <span className="text-[15px] font-bold tracking-tight">RTrading</span>
          
        </div>

        <NavSection label="Main" />
<NavItem active label="◈  Dashboard" />

<NavItem label="≡  Historial" onClick={() => (window.location.href = "/trades/history")} />
<NavSection label="Análisis" />
<NavItem label="◎  Activos" onClick={() => (window.location.href = "/assets")} />
<NavItem label="＋  Nueva op." onClick={() => (window.location.href = "/trades/new")} />
<NavItem label="❋  Conceptos" onClick={() => (window.location.href = "/conceptos")} />
<button
  onClick={logout}
  className="w-full mt-6 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/20 transition"
>
  Cerrar sesión
</button>
<NavSection label="Config" />
<NavItem label="⊙  Integración" onClick={() => (window.location.href = "/integration")} />
  <button
  onClick={logout}
  className="w-full mt-6 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/20 transition"
>
  Cerrar sesión
</button>
        {/* Upgrade banner */}
        <div className="mt-3 rounded-[14px] p-3.5 bg-gradient-to-br from-violet-900/30 to-violet-800/10 border border-violet-500/20">
          <p className="text-[13px] font-semibold text-white mb-1">Modo básico</p>
          <p className="text-[11px] text-gray-400 leading-snug">Accedé a analytics avanzados con Pro.</p>
          <button className="mt-2.5 w-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg py-1.5 transition">
            Upgrade Pro
          </button>
        </div>

        <button onClick={logout} className=" mt-auto text-[11px] text-red-400 hover:text-red-300 px-3 py-2 text-left transition">
          → Salir
        </button>

      </aside>

      {/* ── MAIN ── */}
      <div className="relative overflow-hidden xl:hidden flex items-center justify-between items-center px-4 py-10 bg-[#13161e] border-b border-white/[0.06]">
      <div className="pointer-events-none absolute inset-0 opacity-50">
  <div className="absolute left-8 top-2 h-10 w-1 animate-pulse rounded-full bg-emerald-400" />
  <div className="absolute left-52 top-3 h-8 w-1 animate-pulse rounded-full bg-red-400" />
<div className="absolute left-64 top-1 h-14 w-2 animate-pulse rounded-full bg-emerald-400" />
<div className="absolute right-56 top-6 h-7 w-1 animate-pulse rounded-full bg-red-400" />
<div className="absolute right-72 top-2 h-12 w-1 animate-pulse rounded-full bg-emerald-400" />
<div className="absolute right-96 top-4 h-9 w-1 animate-pulse rounded-full bg-red-400" />
  <div className="absolute left-20 top-5 h-7 w-1 animate-pulse rounded-full bg-red-400" />
  <div className="absolute left-36 top-1 h-12 w-1 animate-pulse rounded-full bg-emerald-400" />
  <div className="absolute right-40 top-4 h-9 w-1 animate-pulse rounded-full bg-red-400" />
  <div className="absolute right-20 top-2 h-11 w-1 animate-pulse rounded-full bg-emerald-400" />
</div>
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-xs font-bold text-white">
      RT
    </div>

    <div className="flex flex-col leading-tight">
  <span className="text-sm font-bold tracking-tight">
    RTrading
  </span>

  <span className="text-[10px] text-gray-500">
    Journal Trading
  </span>
</div>
  </div>

  <label className="cursor-pointer ml-auto">
    {avatar ? (
      <img
        src={avatar}
        alt="Avatar"
        className="w-10 h-10 rounded-full object-cover border border-white/[0.08]"
      />
    ) : (
      <div className="w-10 h-10 rounded-full bg-[#1a1d27] border border-white/[0.08] flex items-center justify-center text-xs text-gray-400">
        👤
      </div>
    )}

    <input
      type="file"
      accept="image/*"
      onChange={handleAvatar}
      className="hidden"
    />
  </label>
</div>
      <div className="flex-1 flex flex-col overflow-hidden pb-24 xl:pb-0">

        {/* Topbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#13161e] border-b border-white/[0.06]">
          
          <div className="flex flex-wrap items-center gap-2 w-full justify-end">
            <div className="flex items-center gap-1.5 bg-[#1a1d27] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-gray-400">
  📅 {new Date().toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</div>
            <button className="flex items-center gap-1.5 bg-[#1a1d27] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:text-white transition">
              ⚙ Filtros
            </button>
           <button
  onClick={() => (window.location.href = "/trades/new")}
  className="hidden xl:flex items-center gap-1.5 w-full md:w-auto justify-center bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg px-4 py-1.5 shadow-[0_0_16px_rgba(124,92,252,0.35)] transition"
>
              ＋ Nueva operación
            </button>
            <label className="hidden xl:block cursor-pointer">
  {avatar ? (
    <img
      src={avatar}
      alt="Avatar"
      className="w-14 h-14 rounded-full object-cover border border-white/[0.08]"
    />
  ) : (
    <div className="w-14 h-14 rounded-full bg-[#1a1d27] border border-white/[0.08] flex items-center justify-center text-xs text-gray-400">
      👤
    </div>
  )}

  <input
    type="file"
    accept="image/*"
    onChange={handleAvatar}
    className="hidden"
  />
</label>
           
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-6 xl:pb-6 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-[#1a1d27] scrollbar-track-transparent">

          {/* ── METRIC CARDS ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5">
            <MetricCard
              title="Win ratio"
              value={`${winRate}%`}
              sub={`${wins} wins · ${totalTrades} trades`}
              badge="+4.2%"
              up
              accent
              icon="📈"
            />
            <MetricCard
              title="Profit factor"
              value="2.24"
              sub="+$1,203 este mes"
              badge="+8.1%"
              up
              icon="💰"
            />
            <MetricCard
              title="RR ratio"
              value={`1 : ${averageRR}`}
              sub="Promedio según entrada/salida"
              badge="−5.2%"
              up={false}
              icon="⚖"
            />
            <MetricCard
              title="Hit rate"
              value={`${winRate}%`}
              sub={`${totalTrades} trades totales`}
              badge="+25.4%"
              up
              icon="🎯"
            />
          </div>

          {/* ── MID ROW ── */}
          <div className="order-1 xl:order-none grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-3.5">

            {/* Area Chart */}

              <TradingViewChart />

            {/* Donut Chart */}
            <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold">% General</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Tipos de operación</p>
                </div>
                <select
  value={selectedAsset}
  onChange={(e) => setSelectedAsset(e.target.value)}
  className="text-[11px] bg-[#1a1d27] border border-white/[0.06] px-3 py-1.5 rounded-lg text-gray-300 outline-none"
>
  <option value="GENERAL">GENERAL</option>

  {[...new Set(savedTrades.map((t) => t.asset))].map((asset) => (
    <option key={asset} value={asset}>
      {asset}
    </option>
  ))}
</select>
              </div>

              <DonutChart
  wins={assetWins}
  losses={assetLosses}
  breakeven={assetBreakeven}
  total={assetTrades.length}
/>

              <div className="flex flex-col gap-2 mt-4">
            <DonutLegendItem color="#34d399"  label="Wins"       value={`${assetWins} · ${assetWinPct}%`} textColor="text-emerald-400" />
<DonutLegendItem color="#f87171"  label="Losses"     value={`${assetLosses} · ${assetLossPct}%`} textColor="text-red-400" />
<DonutLegendItem color="#fbbf24"  label="Break even" value={`${assetBreakeven} · ${assetBePct}%`} textColor="text-yellow-400" />
              </div>
            </div>

          </div>

          {/* ── BOTTOM ROW ── */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-3.5">

            {/* Transaction Table */}
            <div className="hidden xl:block bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold">Historial de operaciones</p>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 bg-[#1a1d27] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-gray-400 hover:text-white transition">
                    ⬇ Exportar
                  </button>
                  <button className="flex items-center gap-1 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg px-3 py-1.5 transition">
                    ⟳ Re-abrir
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">

              <table className="w-full min-w-[460px] text-[11px] md:text-[12.5px] border-collapse">
                <thead>
                  <tr>
                    {["Instrumento", "Monto", "Fecha ↓", "Estado", "RR", ""].map((h) => (
                      <th key={h} className="text-left text-[11px] text-gray-500 font-medium uppercase tracking-wide pb-2.5 px-2.5 border-b border-white/[0.05]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((t, i) => (
                    <tr key={i} className="group hover:bg-white/[0.02] transition">
                      <td className="py-2.5 px-2.5 border-b border-white/[0.03]">
                        <p className="font-semibold text-[13px]">{t.asset}</p>
                        <p className="text-[11px] text-gray-500">{t.type}</p>
                      </td>
                      <td className="py-2.5 px-2.5 border-b border-white/[0.03] font-mono font-medium">{t.entry}</td>
                      <td className="py-2.5 px-2.5 border-b border-white/[0.03] text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
                      <td className="py-2.5 px-2.5 border-b border-white/[0.03]">
                        <span className="inline-flex items-center gap-1.5">
                          <span
  className={`w-1.5 h-1.5 rounded-full ${
    t.result === "tp"
      ? "bg-emerald-400"
      : t.result === "sl"
      ? "bg-red-400"
      : "bg-yellow-400"
  }`}
/>

{t.result.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2.5 px-2.5 border-b border-white/[0.03] font-mono">{t.rr}</td>
                      <td className="py-2.5 px-2.5 border-b border-white/[0.03]">
                        <button className="bg-[#1a1d27] border border-white/[0.06] rounded-md px-2.5 py-1 text-[11px] text-gray-400 hover:text-white transition">
                          Más ▾
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>

            {/* Sessions + Mini candles */}
            <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5 flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold">Sesión por mercado</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Rendimiento por sesión</p>
              </div>

              <div className="flex flex-col gap-3">
                {SESSIONS.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-[12.5px] mb-1.5">
                      <span><span className="mr-1.5">{s.flag}</span>{s.name}</span>
                      <strong>{s.pct}%</strong>
                    </div>
                    <div className="h-[5px] bg-[#1a1d27] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <p className="text-[11px] text-gray-500 mb-2">BTCUSD · Últimas velas</p>
                <MiniCandles />
              </div>
            </div>

          </div>

        </div>
      </div>
    <div className="xl:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-[#13161e]/95 backdrop-blur-xl border-t border-white/[0.06] flex items-center justify-around z-[9999] pointer-events-auto">

  

  <a
    href="/trades/history"
    className="flex flex-col items-center gap-1 text-[10px] text-gray-400"
  >
    <span className="text-lg">☰</span>
    Historial
  </a>

  <a
    href="/trades/new"
    className="w-14 h-14 rounded-full bg-violet-600 flex items-center justify-center text-2xl text-white shadow-[0_0_20px_rgba(124,92,252,0.5)] -mt-8"
  >
    +
  </a>

  <a
    href="/assets"
    className="flex flex-col items-center gap-1 text-[10px] text-gray-400"
  >
    <span className="text-lg">◎</span>
    Activos
  </a>

  <a
    href="/conceptos"
    className="flex flex-col items-center gap-1 text-[10px] text-gray-400"
  >
    <span className="text-lg">✦</span>
    Conceptos
  </a>
 <button
  onClick={logout}
  className="flex flex-col items-center gap-1 text-[10px] text-red-400"
>
  <span className="text-lg">⎋</span>
  Salir
</button>
</div>
    </main>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function NavSection({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-2.5 pt-3 pb-1">
      {label}
    </p>
  );
}

function NavItem({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-[10px] text-[13.5px] font-medium transition border ${
        active
          ? "bg-violet-500/10 border-violet-500/30 text-violet-300"
          : "border-transparent text-gray-400 hover:bg-[#1a1d27] hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function MetricCard({
  title, value, sub, badge, up, accent, icon,
}: {
  title: string; value: string; sub: string; badge: string; up: boolean; accent?: boolean; icon: string;
}) {
  return (
    <div className={`relative rounded-2xl p-5 border overflow-hidden transition hover:-translate-y-px ${
      accent
        ? "bg-gradient-to-br from-[#1e1640] to-[#1a1730] border-violet-500/30"
        : "bg-[#13161e] border-white/[0.06]"
    }`}>
      <div className={`absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
        accent ? "bg-violet-500/20" : "bg-white/[0.05]"
      }`}>
        {icon}
      </div>
      <p className="text-[12px] text-gray-500 font-medium mb-2">{title}</p>
      <p className="text-[26px] font-bold tracking-tight font-mono">
        {value}
        <span className={`inline-flex items-center text-[11px] font-semibold px-1.5 py-0.5 rounded-full ml-2 align-middle ${
          up ? "bg-emerald-400/15 text-emerald-400" : "bg-red-400/15 text-red-400"
        }`}>
          {up ? "↑" : "↓"} {badge}
        </span>
      </p>
      <p className="text-[11px] text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

function LegendItem({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-[11.5px] text-gray-400">
         <span style={{ background: color }} className="w-2 h-2 rounded-full flex-shrink-0" />   {label}
    </div>
  );
}
function DonutChart
({ wins, losses, breakeven, total }: { wins: number; losses: number; breakeven: number; total: number }) {
  const r = 50;
  const circ = 2 * Math.PI * r; // ≈ 314.16
  const safeTotal = total > 0 ? total : 1;
  const wPct = (wins / safeTotal) * circ;
  const lPct = (losses / safeTotal) * circ;
  const bPct = (breakeven / safeTotal) * circ;

  return (
    <div className="relative w-[140px] h-[140px] mx-auto">
      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Track */}
        <circle cx="70" cy="70" r={r} fill="none" stroke="#1a1d27" strokeWidth="22" />
        {/* Wins */}
        <circle cx="70" cy="70" r={r} fill="none" stroke="#34d399" strokeWidth="22"
          strokeDasharray={`${wPct} ${circ - wPct}`}
          strokeDashoffset={circ * 0.25}
          transform="rotate(-90 70 70)" strokeLinecap="round" />
        {/* Losses */}
        <circle cx="70" cy="70" r={r} fill="none" stroke="#f87171" strokeWidth="22"
          strokeDasharray={`${lPct} ${circ - lPct}`}
          strokeDashoffset={circ * 0.25 - wPct - 4}
          transform="rotate(-90 70 70)" strokeLinecap="round" />
        {/* Break even */}
        <circle cx="70" cy="70" r={r} fill="none" stroke="#fbbf24" strokeWidth="22"
          strokeDasharray={`${bPct} ${circ - bPct}`}
          strokeDashoffset={circ * 0.25 - wPct - lPct - 8}
          transform="rotate(-90 70 70)" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[22px] font-bold font-mono">{total}</span>
        <span className="text-[10px] text-gray-500">trades</span>
      </div>
    </div>
  );
}

function DonutLegendItem({ color, label, value, textColor }: { color: string; label: string; value: string; textColor: string }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <div className="flex items-center gap-2 text-gray-400">
        <span style={{ background: color }} className="w-2 h-2 rounded-full flex-shrink-0 inline-block" />
        {label}
      </div>
      <span className={`font-mono font-semibold ${textColor}`}>{value}</span>
    </div>
  );
}

function MiniCandles() {
  return (
    <div className="flex items-end gap-[4px] h-[80px]">
      {CANDLES.map(([h, pos], i) => (
        <div key={i} className="flex flex-col items-center justify-end flex-1 h-full gap-px">
          <div className="w-px bg-white/10" style={{ height: `${Math.round(h * 0.18)}px` }} />
          <div
            className="w-2 rounded-[2px]"
            style={{
              height: `${Math.round(h * 0.65)}px`,
              background: pos ? "#7c5cfc" : "#f87171",
            }}
          />
          <div className="w-px bg-white/10" style={{ height: `${Math.round(h * 0.1)}px` }} />
        </div>
      ))}
    </div>
  );
}
function TradingViewChart() {
  const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");
  const [assetSearch, setAssetSearch] = useState("BTCUSDT");
const [assetOpen, setAssetOpen] = useState(false);

const ASSETS = [
  { label: "BTCUSDT", value: "BINANCE:BTCUSDT" },
  { label: "ETHUSDT", value: "BINANCE:ETHUSDT" },
  { label: "BNBUSDT", value: "BINANCE:BNBUSDT" },
  { label: "SOLUSDT", value: "BINANCE:SOLUSDT" },
  { label: "XRPUSDT", value: "BINANCE:XRPUSDT" },
  { label: "ADAUSDT", value: "BINANCE:ADAUSDT" },
  { label: "DOGEUSDT", value: "BINANCE:DOGEUSDT" },
  { label: "AVAXUSDT", value: "BINANCE:AVAXUSDT" },
  { label: "EURUSD", value: "FX:EURUSD" },
  { label: "GBPUSD", value: "FX:GBPUSD" },
  { label: "USDJPY", value: "FX:USDJPY" },
  { label: "AUDUSD", value: "FX:AUDUSD" },
  { label: "XAUUSD", value: "OANDA:XAUUSD" },
  { label: "XAGUSD", value: "OANDA:XAGUSD" },
  { label: "US30", value: "FOREXCOM:US30" },
  { label: "NAS100", value: "FOREXCOM:NAS100" },
  { label: "SPX500", value: "FOREXCOM:SPX500" },
  { label: "APPLE", value: "NASDAQ:AAPL" },
  { label: "TESLA", value: "NASDAQ:TSLA" },
  { label: "NVIDIA", value: "NASDAQ:NVDA" },
  { label: "MICROSOFT", value: "NASDAQ:MSFT" },
  { label: "AMAZON", value: "NASDAQ:AMZN" },
  { label: "SPY", value: "AMEX:SPY" },
  { label: "QQQ", value: "AMEX:QQQ" },
];

const filteredAssets = ASSETS.filter((asset) =>
  asset.label.toLowerCase().includes(assetSearch.toLowerCase())
);

  return (
    <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">
            Gráfico en tiempo real
          </p>

          <p className="text-[11px] text-gray-500 mt-0.5">
            TradingView · {symbol}
          </p>
        </div>

        <div className="relative w-[210px]">
  <input
  value={assetSearch}
  onChange={(e) => {
    setAssetSearch(e.target.value);
    setAssetOpen(true);
  }}
  onFocus={() => setAssetOpen(true)}
  onClick={() => setAssetOpen(true)}
  placeholder="Buscar activo..."
  className="w-full bg-[#1a1d27] border border-white/[0.08] rounded-lg px-3 py-2 text-[11px] text-gray-200 outline-none placeholder:text-gray-500"
/>

  {assetOpen && (
    <div className="absolute right-0 top-[36px] z-50 max-h-[220px] w-full overflow-y-auto rounded-lg border border-white/[0.08] bg-[#1a1d27] shadow-xl">
      {filteredAssets.map((asset) => (
        <button
          key={asset.value}
          onClick={() => {
            setSymbol(asset.value);
            setAssetSearch(asset.label);
            setAssetOpen(false);
          }}
          className="block w-full px-3 py-2 text-left text-[11px] text-gray-300 hover:bg-violet-600/20 hover:text-white"
        >
          {asset.label}
        </button>
      ))}
    </div>
  )}
</div>
      </div>

      <iframe
        key={symbol}
        title="TradingView Chart"
        src={`https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(
          symbol
        )}&interval=15&hidesidetoolbar=1&symboledit=1&saveimage=0&toolbarbg=13161e&studies=[]&theme=dark&style=1&timezone=Etc/UTC&withdateranges=1&hideideas=1`}
        className="h-[360px] w-full rounded-xl border border-white/[0.06]"
      />
    </div>
  );
}