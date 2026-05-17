"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface TradeRow {
  id?: string;
  user_id?: string;
  asset?: string;
  type?: string;
  entry?: number | string | null;
  stop_loss?: number | string | null;
  take_profit?: number | string | null;
  exit?: number | string | null;
  result?: "tp" | "sl" | "be" | string;
  notes?: string | null;
  emotion?: string | null;
  file_url?: string | null;
  trade_date?: string | null;
  trade_time?: string | null;
  session_name?: string | null;
  created_at?: string | null;
}

interface SessionData {
  flag: string;
  name: string;
  pct: number;
}

const SESSIONS: SessionData[] = [
  { flag: "🇺🇸", name: "Nueva York", pct: 85 },
  { flag: "🇬🇧", name: "Londres", pct: 70 },
  { flag: "🇯🇵", name: "Tokio", pct: 45 },
  { flag: "🇦🇺", name: "Sídney", pct: 38 },
];

const CANDLES: [number, number][] = [
  [30, 1],
  [55, 1],
  [40, 0],
  [75, 1],
  [50, 0],
  [85, 1],
  [45, 0],
  [70, 1],
  [60, 1],
  [95, 1],
  [65, 0],
  [80, 1],
  [55, 1],
  [100, 1],
  [72, 0],
];
const WEEK_DAYS = ["L", "M", "X", "J", "V", "S", "D"];

function getDayColor(value: number, tradesCount: number) {
  if (tradesCount === 0) {
    return "bg-[#1a1d27] border-white/[0.06] text-gray-500";
  }

  if (value > 0) {
    return "bg-emerald-500/20 border-emerald-400 text-emerald-300";
  }

  if (value < 0) {
    return "bg-red-500/20 border-red-400 text-red-300";
  }

  return "bg-violet-500/20 border-violet-400 text-violet-300";
}
export default function Dashboard() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [savedTrades, setSavedTrades] = useState<TradeRow[]>([]);
  const [selectedAsset, setSelectedAsset] = useState("GENERAL");
  const [initialCapital, setInitialCapital] = useState(10000);
  const [weekOffset, setWeekOffset] = useState(0);
const [selectedDay, setSelectedDay] = useState<string | null>(null);



  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = "/";
        return;
      }

      setUser(session.user.email || "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("avatar_url, initial_capital, username")
        .eq("id", session.user.id)
        .single();

      if (profile?.avatar_url) {
        setAvatar(profile.avatar_url);
        }
        if (profile?.username) {
        setUsername(profile.username);
        }

      if (
        profile?.initial_capital !== null &&
        profile?.initial_capital !== undefined
      ) {
        setInitialCapital(Number(profile.initial_capital));
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

  async function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
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
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert(uploadError.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const { error: profileError } = await supabase.from("profiles").upsert({
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

  async function saveInitialCapital(value: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("profiles")
      .update({ initial_capital: value })
      .eq("id", user.id);
  }
      async function saveUsername(value: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase
    .from("profiles")
    .update({
      username: value,
    })
    .eq("id", user.id);
}
  const recentTrades = [...savedTrades].slice(0, 4);

  const assetTrades =
    selectedAsset === "GENERAL"
      ? savedTrades
      : savedTrades.filter((trade) => trade.asset === selectedAsset);

  const assetWins = assetTrades.filter((t) => t.result === "tp").length;
  const assetLosses = assetTrades.filter((t) => t.result === "sl").length;
  const assetBreakeven = assetTrades.filter((t) => t.result === "be").length;
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
  const wins = savedTrades.filter((t) => t.result === "tp").length;
  const losses = savedTrades.filter((t) => t.result === "sl").length;
  const breakeven = savedTrades.filter((t) => t.result === "be").length;

  const winRate = totalTrades ? Math.round((wins / totalTrades) * 100) : 0;

  const getTradeRR = (trade: TradeRow) => {
    const entry = Number(trade.entry || 0);
    const stop = Number(trade.stop_loss || 0);
    const take = Number(trade.take_profit || 0);

    if (!entry || !stop || !take) return 0;

    let risk = 0;
    let reward = 0;

    if (trade.type === "compra") {
      risk = entry - stop;
      reward = take - entry;
    } else {
      risk = stop - entry;
      reward = entry - take;
    }

    if (risk <= 0 || reward <= 0) return 0;

    return reward / risk;
  };

  const rrValues = savedTrades.map(getTradeRR).filter((rr) => rr > 0);

  const averageRR = rrValues.length
    ? (rrValues.reduce((sum, rr) => sum + rr, 0) / rrValues.length).toFixed(2)
    : "0.00";

  const tradePnLs = savedTrades.map((trade: any) =>
  Number(trade.pnl || 0),
);

const totalProfit = tradePnLs.reduce(
  (sum, pnl) => sum + pnl,
  0,
);

const currentCapital =
  initialCapital + totalProfit;

const grossProfit = tradePnLs
  .filter((pnl) => pnl > 0)
  .reduce((sum, pnl) => sum + pnl, 0);

const grossLoss = Math.abs(
  tradePnLs
    .filter((pnl) => pnl < 0)
    .reduce((sum, pnl) => sum + pnl, 0),
);

const profitFactor =
  grossLoss > 0
    ? (grossProfit / grossLoss).toFixed(2)
    : grossProfit > 0
      ? "∞"
      : "0.00";

const profitPercent = initialCapital
  ? (
      (totalProfit / initialCapital) *
      100
    ).toFixed(2)
  : "0.00";

const capitalBadge =
  totalProfit >= 0
    ? `+${profitPercent}%`
    : `${profitPercent}%`;
    const today = new Date();

const currentWeekStart = new Date(today);

currentWeekStart.setDate(
  today.getDate() - today.getDay() + 1 - weekOffset * 7,
);

const weekDaysData = Array.from({ length: 7 }).map((_, index) => {
  const date = new Date(currentWeekStart);

  date.setDate(currentWeekStart.getDate() + index);

  const formatted = date.toISOString().slice(0, 10);

  const dayTrades = savedTrades.filter((trade: any) => {
    const tradeDate = trade.trade_date || trade.created_at?.slice(0, 10);

    return tradeDate === formatted;
  });
  const pnl = dayTrades.reduce((acc: number, trade: any) => {
    return acc + Number(trade.pnl || 0);
  }, 0);

  return {
    label: WEEK_DAYS[index],
    date: formatted,
    pnl,
    trades: dayTrades,
  };
});

const selectedDayData = weekDaysData.find(
  (day) => day.date === selectedDay,
);

const weekTradesCount = weekDaysData.reduce(
  (acc, day) => acc + day.trades.length,
  0,
);
    
  return (
    <main className="min-h-screen bg-[#0e1015] text-[#f0f2f8] flex flex-col xl:flex-row font-sans overflow-hidden">
      <aside className="hidden xl:flex w-[220px] min-w-[220px] bg-[#13161e] border-r border-white/[0.06] flex-col py-5 px-3.5 gap-1">
        <div className="flex items-center gap-2.5 px-2 pb-5">
          <div className="w-[34px] h-[34px] rounded-[10px] bg-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_18px_rgba(124,92,252,0.35)]">
            RT
          </div>
          <span className="text-[15px] font-bold tracking-tight">RTrading</span>
        </div>

        <NavSection label="Main" />
        <NavItem active label="◈  Dashboard" />
        <NavItem
          label="≡  Historial"
          onClick={() => (window.location.href = "/trades/history")}
        />
        <NavSection label="Análisis" />
        <NavItem
          label="◎  Activos"
          onClick={() => (window.location.href = "/assets")}
        />
        <NavItem
          label="＋  Nueva op."
          onClick={() => (window.location.href = "/trades/new")}
        />
        <NavItem
          label="❋  Conceptos"
          onClick={() => (window.location.href = "/conceptos")}
        />

        <button
          onClick={logout}
          className="w-full mt-6 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/20 transition"
        >
          Cerrar sesión
        </button>

        <NavSection label="Config" />
        <NavItem
          label="⊙  Integración"
          onClick={() => (window.location.href = "/integration")}
        />

        <div className="mt-3 rounded-[14px] p-3.5 bg-gradient-to-br from-violet-900/30 to-violet-800/10 border border-violet-500/20">
          <p className="text-[13px] font-semibold text-white mb-1">
            Modo básico
          </p>
          <p className="text-[11px] text-gray-400 leading-snug">
            Accedé a analytics avanzados con Pro.
          </p>
          <button className="mt-2.5 w-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold rounded-lg py-1.5 transition">
            Upgrade Pro
          </button>
        </div>
      </aside>

      <div className="relative overflow-hidden xl:hidden flex items-center justify-between px-4 py-10 bg-[#13161e] border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <div className="absolute left-8 top-2 h-10 w-1 animate-pulse rounded-full bg-emerald-400" />
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
            <span className="text-sm font-bold tracking-tight">RTrading</span>
            <span className="text-[10px] text-gray-500">Journal Trading</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
<input
  type="text"
  value={username}
  onChange={async (e) => {
    setUsername(e.target.value);
    await saveUsername(e.target.value);
  }}
  placeholder="Usuario"
  className="
    w-[170px]
    sm:w-[220px]
    px-4 py-3
    bg-[#0e1015]
    border border-violet-500/40
    rounded-2xl
    text-sm
    text-white
    outline-none
    focus:border-violet-400
  "
/>

<AvatarPicker
  avatar={avatar}
  handleAvatar={handleAvatar}
  size="sm"
/>
</div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden pb-24 xl:pb-0">
        <div className="flex items-center justify-between px-6 py-4 bg-[#13161e] border-b border-white/[0.06]">
          <div className="flex flex-wrap items-center gap-2 w-full justify-end">
            
            <div className="flex items-center gap-1.5 bg-[#1a1d27] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs text-gray-400">
              📅{" "}
              {new Date().toLocaleDateString("es-AR", {
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
            <input
  type="text"
  value={username}
  onChange={async (e) => {
    setUsername(e.target.value);
    await saveUsername(e.target.value);
  }}
  placeholder="Usuario"
  className=" hidden md:block w-40 px-3 py-2 bg-[#0e1015] border border-violet-500/40 rounded-xl text-sm text-white outline-none focus:border-violet-400"
/>

            <div className="hidden xl:block">
              <AvatarPicker
                avatar={avatar}
                handleAvatar={handleAvatar}
                size="lg"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-6 xl:pb-6 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-[#1a1d27] scrollbar-track-transparent">
          <div className="p-4 rounded-2xl bg-[#13161e] border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">
                Capital inicial
              </p>
              <p className="text-sm text-slate-300">
                Se guarda en tu perfil y calcula capital actual, profit y factor
                de beneficio.
              </p>
            </div>

            <input
              type="number"
              value={initialCapital}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const value = Number(e.target.value);
                setInitialCapital(value);
                saveInitialCapital(value);
              }}
              className="w-full sm:w-44 px-3 py-2.5 bg-[#0e1015] border border-white/10 rounded-xl text-sm text-white outline-none focus:border-violet-500/60"
            />
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3.5">
            <MetricCard
              title="Win ratio"
              value={`${winRate}%`}
              sub={`${wins} wins · ${totalTrades} trades`}
              badge="dinámico"
              up
              accent
              icon="📈"
            />

            <MetricCard
              title="Profit factor"
              value={profitFactor}
              sub={`Inicial: $${initialCapital.toFixed(2)} · Actual: $${currentCapital.toFixed(2)} · ${totalProfit >= 0 ? "+" : ""}$${totalProfit.toFixed(2)}`}
              badge={capitalBadge}
              up={totalProfit >= 0}
              icon="💰"
            />

            <MetricCard
              title="RR ratio"
              value={`1 : ${averageRR}`}
              sub="Promedio según entrada, SL y TP"
              badge="auto"
              up
              icon="⚖"
            />

            <MetricCard
              title="Hit rate"
              value={`${winRate}%`}
              sub={`${totalTrades} trades totales · ${breakeven} BE`}
              badge="auto"
              up
              icon="🎯"
            />
          </div>

          <div className="order-1 xl:order-none grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-3.5">
            <TradingViewChart />

            <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold">% General</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Tipos de operación
                  </p>
                </div>

                <select
                  value={selectedAsset}
                  onChange={(e) => setSelectedAsset(e.target.value)}
                  className="text-[11px] bg-[#1a1d27] border border-white/[0.06] px-3 py-1.5 rounded-lg text-gray-300 outline-none"
                >
                  <option value="GENERAL">GENERAL</option>
                  {[
                    ...new Set(savedTrades.map((t) => t.asset).filter(Boolean)),
                  ].map((asset) => (
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
                <DonutLegendItem
                  color="#34d399"
                  label="Wins"
                  value={`${assetWins} · ${assetWinPct}%`}
                  textColor="text-emerald-400"
                />
                <DonutLegendItem
                  color="#f87171"
                  label="Losses"
                  value={`${assetLosses} · ${assetLossPct}%`}
                  textColor="text-red-400"
                />
                <DonutLegendItem
                  color="#fbbf24"
                  label="Break even"
                  value={`${assetBreakeven} · ${assetBePct}%`}
                  textColor="text-yellow-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-3.5">
            <div className="hidden xl:block bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold">
                  Historial de operaciones
                </p>
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
                      {[
                        "Instrumento",
                        "Entrada",
                        "Fecha ↓",
                        "Estado",
                        "RR",
                        "",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-[11px] text-gray-500 font-medium uppercase tracking-wide pb-2.5 px-2.5 border-b border-white/[0.05]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {recentTrades.map((t, i) => (
                      <tr
                        key={t.id || i}
                        className="group hover:bg-white/[0.02] transition"
                      >
                        <td className="py-2.5 px-2.5 border-b border-white/[0.03]">
                          <p className="font-semibold text-[13px]">
                            {t.asset || "—"}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            {t.type || "—"}
                          </p>
                        </td>
                        <td className="py-2.5 px-2.5 border-b border-white/[0.03] font-mono font-medium">
                          {String(t.entry ?? "—")}
                        </td>
                        <td className="py-2.5 px-2.5 border-b border-white/[0.03] text-gray-500">
                          {formatTradeDate(t)}
                        </td>
                        <td className="py-2.5 px-2.5 border-b border-white/[0.03]">
                          <span className="inline-flex items-center gap-1.5">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${resultDotClass(t.result)}`}
                            />
                            {(t.result || "—").toUpperCase()}
                          </span>
                        </td>
                        <td className="py-2.5 px-2.5 border-b border-white/[0.03] font-mono">
                          1:{getTradeRR(t).toFixed(2)}
                        </td>
                        <td className="py-2.5 px-2.5 border-b border-white/[0.03]">
                          <button
                            onClick={() =>
                              (window.location.href = "/trades/history")
                            }
                            className="bg-[#1a1d27] border border-white/[0.06] rounded-md px-2.5 py-1 text-[11px] text-gray-400 hover:text-white transition"
                          >
                            Más ▾
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
<div className="bg-[#13161e] border border-white/[0.06] rounded-lg p-5 flex flex-col gap-5">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold tracking-wide">
        TRADING WEEK
      </p>

      <p className="text-[11px] text-gray-500 mt-0.5 uppercase tracking-wider">
        rendimiento semanal
      </p>
    </div>

    <div className="flex items-center gap-1">
      <button
        onClick={() => setWeekOffset((prev) => prev + 1)}
        className="w-8 h-8 rounded-md bg-[#1a1d27] border border-white/[0.06] text-gray-400 hover:bg-[#202431] transition"
      >
        ←
      </button>

      <button
        onClick={() => setWeekOffset((prev) => Math.max(prev - 1, 0))}
        className="w-8 h-8 rounded-md bg-[#1a1d27] border border-white/[0.06] text-gray-400 hover:bg-[#202431] transition"
      >
        →
      </button>
    </div>
  </div>

  <div className="grid grid-cols-7 gap-[5px] w-full">
    {weekDaysData.map((day) => (
      <div
        key={day.date}
        onClick={() => setSelectedDay(day.date)}
        className={`
          h-[120px]
          rounded-md
          border
          flex
          flex-col
          items-center
          justify-center
          transition-all
          cursor-pointer
          hover:opacity-90
          ${getDayColor(day.pnl, day.trades.length)}
        `}
      >
        <span className="text-[10px] uppercase tracking-[2px] opacity-60">
          {day.label}
        </span>

        <strong className="text-[16px] mt-3 font-bold">
          {day.pnl > 0 && "+"}
          {day.pnl.toFixed(0)}
        </strong>

        <span className="text-[10px] mt-3 opacity-40">
          {day.trades.length} trades
        </span>
      </div>
    ))}
  </div>

  <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-gray-500">
    <span>
      {weekOffset === 0
        ? "Semana actual"
        : `${weekOffset} semana/s atrás`}
    </span>

    <span>{weekTradesCount} trades</span>
  </div>

  {selectedDay && (
    <div className="rounded-md border border-white/[0.06] bg-[#10131a] p-3">
      <p className="text-xs font-semibold mb-3">
        Trades del {selectedDay}
      </p>

      {!selectedDayData || selectedDayData.trades.length === 0 ? (
        <p className="text-xs text-gray-500">
          Día sin trades
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {selectedDayData.trades.map((trade: any, index: number) => (
            <div
              key={trade.id || index}
              className="flex items-center justify-between rounded-md border border-white/[0.06] bg-[#151922] px-3 py-2"
            >
              <span className="text-xs text-gray-300">
                {trade.asset || "Sin activo"}
              </span>

              <strong
                className={
                  Number(trade.pnl || 0) >= 0
                    ? "text-xs text-emerald-400"
                    : "text-xs text-red-400"
                }
              >
                {Number(trade.pnl || 0) > 0 && "+"}
                {Number(trade.pnl || 0)}
              </strong>
            </div>
          ))}
        </div>
      )}
    </div>
  )}

  <div className="mt-2">
    <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">
      rendimiento reciente
    </p>

    <MiniCandles />
  </div>
</div>
    <MiniCandles />
   
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

function formatTradeDate(trade: TradeRow) {
  const raw = trade.trade_date || trade.created_at;
  if (!raw) return "—";

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return String(raw);

  return date.toLocaleDateString("es-AR");
}

function resultDotClass(result?: string | null) {
  if (result === "tp") return "bg-emerald-400";
  if (result === "sl") return "bg-red-400";
  return "bg-yellow-400";
}

function AvatarPicker({
  avatar,
  handleAvatar,
  size,
}: {
  avatar: string | null;
  handleAvatar: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: "sm" | "lg";
}) {
  const sizeClass = size === "lg" ? "w-14 h-14" : "w-10 h-10";

  return (
    <label className="cursor-pointer ml-auto">
      {avatar ? (
        <img
          src={avatar}
          alt="Avatar"
          className={`${sizeClass} rounded-full object-cover border border-white/[0.08]`}
        />
      ) : (
        <div
          className={`${sizeClass} rounded-full bg-[#1a1d27] border border-white/[0.08] flex items-center justify-center text-xs text-gray-400`}
        >
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
  );
}

function NavSection({ label }: { label: string }) {
  return (
    <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-2.5 pt-3 pb-1">
      {label}
    </p>
  );
}

function NavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
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
  title,
  value,
  sub,
  badge,
  up,
  accent,
  icon,
}: {
  title: string;
  value: string;
  sub: string;
  badge: string;
  up: boolean;
  accent?: boolean;
  icon: string;
}) {
  return (
    <div
      className={`relative rounded-2xl p-5 border overflow-hidden transition hover:-translate-y-px ${
        accent
          ? "bg-gradient-to-br from-[#1e1640] to-[#1a1730] border-violet-500/30"
          : "bg-[#13161e] border-white/[0.06]"
      }`}
    >
      <div
        className={`absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
          accent ? "bg-violet-500/20" : "bg-white/[0.05]"
        }`}
      >
        {icon}
      </div>
      <p className="text-[12px] text-gray-500 font-medium mb-2">{title}</p>
      <p className="text-[26px] font-bold tracking-tight font-mono">
        {value}
        <span
          className={`inline-flex items-center text-[11px] font-semibold px-1.5 py-0.5 rounded-full ml-2 align-middle ${
            up
              ? "bg-emerald-400/15 text-emerald-400"
              : "bg-red-400/15 text-red-400"
          }`}
        >
          {up ? "↑" : "↓"} {badge}
        </span>
      </p>
      <p className="text-[11px] text-gray-500 mt-1">{sub}</p>
    </div>
  );
}

function DonutChart({
  wins,
  losses,
  breakeven,
  total,
}: {
  wins: number;
  losses: number;
  breakeven: number;
  total: number;
}) {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const safeTotal = total > 0 ? total : 1;
  const wPct = (wins / safeTotal) * circ;
  const lPct = (losses / safeTotal) * circ;
  const bPct = (breakeven / safeTotal) * circ;

  return (
    <div className="relative w-[140px] h-[140px] mx-auto">
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="#1a1d27"
          strokeWidth="22"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="#34d399"
          strokeWidth="22"
          strokeDasharray={`${wPct} ${circ - wPct}`}
          strokeDashoffset={circ * 0.25}
          transform="rotate(-90 70 70)"
          strokeLinecap="round"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="#f87171"
          strokeWidth="22"
          strokeDasharray={`${lPct} ${circ - lPct}`}
          strokeDashoffset={circ * 0.25 - wPct - 4}
          transform="rotate(-90 70 70)"
          strokeLinecap="round"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="22"
          strokeDasharray={`${bPct} ${circ - bPct}`}
          strokeDashoffset={circ * 0.25 - wPct - lPct - 8}
          transform="rotate(-90 70 70)"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[22px] font-bold font-mono">{total}</span>
        <span className="text-[10px] text-gray-500">trades</span>
      </div>
    </div>
  );
}

function DonutLegendItem({
  color,
  label,
  value,
  textColor,
}: {
  color: string;
  label: string;
  value: string;
  textColor: string;
}) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <div className="flex items-center gap-2 text-gray-400">
        <span
          style={{ background: color }}
          className="w-2 h-2 rounded-full flex-shrink-0 inline-block"
        />
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
        <div
          key={i}
          className="flex flex-col items-center justify-end flex-1 h-full gap-px"
        >
          <div
            className="w-px bg-white/10"
            style={{ height: `${Math.round(h * 0.18)}px` }}
          />
          <div
            className="w-2 rounded-[2px]"
            style={{
              height: `${Math.round(h * 0.65)}px`,
              background: pos ? "#7c5cfc" : "#f87171",
            }}
          />
          <div
            className="w-px bg-white/10"
            style={{ height: `${Math.round(h * 0.1)}px` }}
          />
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
    asset.label.toLowerCase().includes(assetSearch.toLowerCase()),
  );

  return (
    <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">Gráfico en tiempo real</p>
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
                  type="button"
                  onMouseDown={() => {
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
        title="TradingView chart"
        src={`https://s.tradingview.com/widgetembed/?symbol=${encodeURIComponent(symbol)}&interval=60&hidesidetoolbar=1&symboledit=0&saveimage=0&toolbarbg=13161e&studies=[]&theme=dark&style=1&timezone=America%2FArgentina%2FBuenos_Aires&withdateranges=1&hideideas=1`}
        className="h-[360px] w-full rounded-xl border border-white/[0.06] bg-[#0e1015]"
      />
    </div>
  );
}
