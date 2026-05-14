"use client";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTrade() {
  const router = useRouter();

  const [asset, setAsset] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [type, setType] = useState("compra");
  const [entry, setEntry] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  const [exit, setExit] = useState("");
  const [result, setResult] = useState("tp");
  const [notes, setNotes] = useState("");
  const [emotion, setEmotion] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const assetSuggestions = [
    "BTCUSDT",
    "ETHUSDT",
    "EURUSD",
    "GBPUSD",
    "XAUUSD",
    "US30",
    "NAS100",
    "SPX500",
  ];

  const filteredAssets = assetSuggestions.filter((item) =>
    item.toLowerCase().includes(asset.toLowerCase())
  );

  useEffect(() => {
    const editingTrade = localStorage.getItem("editingTrade");

    if (editingTrade) {
      const trade = JSON.parse(editingTrade);

      setAsset(trade.asset || "");
      setType(trade.type || "compra");
      setEntry(trade.entry || "");
      setExit(trade.exit || "");
      setResult(trade.result || "tp");
      setNotes(trade.notes || "");
      setEmotion(trade.emotion || "");
      setFile(trade.file || null);
    }
  }, []);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setSelectedFile(selected);

    const reader = new FileReader();

    reader.onloadend = () => {
      setFile(reader.result as string);
    };

    reader.readAsDataURL(selected);
  }

  async function saveTrade() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Tenés que iniciar sesión.");
      window.location.href = "/";
      return;
    }

    let fileUrl: string | null = null;
    console.log("FILE ACTUAL:", file);

    if (selectedFile) {
      const fileExt = selectedFile.name.split(".").pop();

      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("trade-files")
        .upload(filePath, selectedFile);

      if (uploadError) {
        console.error("UPLOAD ERROR:", uploadError);
        alert("Error subiendo imagen: " + uploadError.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("trade-files").getPublicUrl(filePath);

      fileUrl = publicUrl;
    }

    const { error } = await supabase.from("trades").insert({
      user_id: user.id,
      asset,
      type,
      entry: Number(entry),
      stop_loss: Number(stopLoss),
      take_profit: Number(takeProfit),
      exit: Number(exit),
      result,
      notes,
      emotion,
      file_url: fileUrl,
      trade_date: new Date().toISOString().slice(0, 10),
      trade_time: new Date().toTimeString().slice(0, 8),
      session_name: "Sin definir",
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/dashboard";
  }

  const inputClass =
    "w-full px-3 py-2.5 bg-[#1a1d27] border border-white/[0.06] rounded-xl text-[13px] text-white placeholder-gray-600 focus:outline-none focus:border-violet-500/50 transition";
  const labelClass =
    "text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block";

  return (
    <main className="min-h-screen bg-[#0e1015] text-[#f0f2f8] flex flex-col">
      <div className="xl:hidden flex items-center justify-between px-4 py-4 bg-[#13161e] border-b border-white/[0.06] sticky top-0 z-50">
        <a
          href="/dashboard"
          className="w-10 h-10 rounded-xl bg-[#1a1d27] border border-white/[0.06] flex items-center justify-center text-white"
        >
          ←
        </a>

        <div className="text-center">
          <p className="text-sm font-semibold">Nueva operación</p>
          <p className="text-[10px] text-gray-500">Trading Journal</p>
        </div>

        <div className="w-10" />
      </div>

      {/* TOPBAR */}
      <div className="flex items-center justify-between px-6 py-4 bg-[#13161e] border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="hidden xl:flex flex items-center gap-1.5 text-gray-500 hover:text-white text-[13px] transition"
          >
            ← Volver
          </button>
          <span className="text-white/10">|</span>
          <span className="text-[14px] font-semibold">Nueva operación </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/dashboard"
            className="px-4 py-1.5 rounded-lg text-[13px] text-gray-400 hover:text-white bg-[#1a1d27] border border-white/[0.06] transition"
          >
            Cancelar
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              saveTrade();
            }}
            className="px-5 py-1.5 rounded-lg text-[13px] font-semibold text-white bg-violet-600 hover:bg-violet-500 shadow-[0_0_16px_rgba(124,92,252,0.3)] transition"
          >
            Guardar operación
          </a>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 md:p-6 flex flex-col xl:flex-row gap-5 max-w-[1100px] mx-auto w-full">
        {/* LEFT — FORMULARIO */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Instrumento + Tipo */}
          <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-[13px] font-semibold mb-4">
              Datos de la operación
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* ── ACTIVO CON AUTOCOMPLETE ── */}
              <div className="relative">
                <label className={labelClass}>Activo</label>

                <input
                  placeholder="BTC, EURUSD..."
                  value={asset}
                  onChange={(e) => {
                    setAsset(e.target.value.toUpperCase());
                    setShowSuggestions(true);
                  }}
                  onFocus={() => {
                    if (asset) setShowSuggestions(true);
                  }}
                  // El timeout le da tiempo al click de la sugerencia a dispararse
                  // antes de que el blur cierre el dropdown
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                  className={inputClass}
                  autoComplete="off"
                />

                {showSuggestions && asset && filteredAssets.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full bg-[#1a1d27] border border-white/[0.08] rounded-xl overflow-hidden shadow-xl">
                    {filteredAssets.map((item) => (
                      <button
                        key={item}
                        type="button"
                        // onMouseDown en lugar de onClick para que dispare ANTES del onBlur
                        onMouseDown={() => {
                          setAsset(item);
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-3 py-2 text-[13px] text-gray-300 hover:bg-violet-600/20 hover:text-white transition"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* ── FIN ACTIVO ── */}

              <div>
                <label className={labelClass}>Tipo</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={inputClass}
                >
                  <option value="compra">Compra</option>
                  <option value="venta">Venta</option>
                </select>
              </div>

              <div>
  <label className={labelClass}>Precio entrada</label>
  <input
    placeholder="0.00"
    value={entry}
    onChange={(e) => setEntry(e.target.value)}
    className={inputClass}
  />
</div>

<div>
  <label className={labelClass}>Stop Loss</label>
  <input
    placeholder="0.00"
    value={stopLoss}
    onChange={(e) => setStopLoss(e.target.value)}
    className={inputClass}
  />
</div>

<div>
  <label className={labelClass}>Take Profit</label>
  <input
    placeholder="0.00"
    value={takeProfit}
    onChange={(e) => setTakeProfit(e.target.value)}
    className={inputClass}
  />
</div>

<div>
  <label className={labelClass}>Precio salida</label>
  <input
    placeholder="0.00"
    value={exit}
    onChange={(e) => setExit(e.target.value)}
    className={inputClass}
  />
</div>
            </div>
          </div>

          {/* Resultado */}
          <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-[13px] font-semibold mb-4">Resultado</p>
            <div className="flex gap-2">
              {(["tp", "sl", "be"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setResult(r)}
                  className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold border transition ${
                    result === r
                      ? r === "tp"
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                        : r === "sl"
                        ? "bg-red-500/15 border-red-500/40 text-red-400"
                        : "bg-yellow-500/15 border-yellow-500/40 text-yellow-400"
                      : "bg-[#1a1d27] border-white/[0.06] text-gray-500 hover:text-white"
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Notas + Psicología */}
          <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-[13px] font-semibold mb-4">Análisis</p>
            <div className="flex flex-col gap-3">
              <div>
                <label className={labelClass}>Notas de la operación</label>
                <textarea
                  placeholder="¿Qué viste en el mercado? ¿Por qué entraste?"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Estado emocional / psicología
                </label>
                <textarea
                  placeholder="¿Cómo te sentías al operar?"
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — IMAGEN */}
        <div className="w-full xl:w-[340px] xl:min-w-[340px]">
          <div className="bg-[#13161e] border border-white/[0.06] rounded-2xl p-5 sticky top-6">
            <p className="text-[13px] font-semibold mb-1">
              Captura del trade
            </p>
            <p className="text-[11px] text-gray-500 mb-4">
              Screenshot del gráfico o setup
            </p>

            <label className="cursor-pointer block">
              {file ? (
                <div className="relative group">
                  <img
                    src={file}
                    alt="trade screenshot"
                    className="w-full rounded-xl object-cover border border-white/[0.06]"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                    <span className="text-[12px] text-white font-medium">
                      Cambiar imagen
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[260px] rounded-xl border-2 border-dashed border-white/[0.08] hover:border-violet-500/40 bg-[#1a1d27] flex flex-col items-center justify-center gap-3 transition">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-xl">
                    📎
                  </div>
                  <div className="text-center">
                    <p className="text-[13px] text-gray-400 font-medium">
                      Subir captura
                    </p>
                    <p className="text-[11px] text-gray-600 mt-1">
                      PNG, JPG, WEBP
                    </p>
                  </div>
                </div>
              )}
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFile}
                className="hidden"
              />
            </label>

            {file && (
              <button
                onClick={() => setFile(null)}
                className="mt-3 w-full py-2 rounded-xl text-[12px] text-gray-500 hover:text-red-400 bg-[#1a1d27] border border-white/[0.06] transition"
              >
                Eliminar imagen
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
