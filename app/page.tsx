"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  async function handleAuth(e?: React.FormEvent) {
    e?.preventDefault();

    if (!email || !password) {
      alert("Completa email y contraseña");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        window.location.href = "/dashboard";
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        alert(
          "Cuenta creada. Revisá tu email para confirmar la cuenta."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    if (!email) {
      alert("Escribí tu email");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: window.location.origin,
      }
    );

    if (error) {
      alert(error.message);
      return;
    }

    alert("Te enviamos un email para recuperar la contraseña.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0a0d14] text-white p-4">
      <form
        onSubmit={handleAuth}
        className="w-full max-w-[360px] p-8 rounded-2xl border border-white/10 bg-[#11151f] shadow-xl"
      >
        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-violet-400">R</span>Trading
          </h1>

          <p className="text-xs text-gray-400 mt-1">
            Journal Trading Platform
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#0a0d14] border border-white/10 focus:border-violet-400 outline-none text-white"
          />
<div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full p-3 pr-12 rounded-xl bg-[#0a0d14] border border-white/10 focus:border-violet-400 outline-none text-white"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
  >
    {showPassword ? "🙈" : "👁️"}
  </button>
</div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 active:scale-[0.98] transition font-semibold disabled:opacity-50"
          >
            {loading
              ? "Cargando..."
              : isLogin
              ? "Iniciar sesión"
              : "Crear cuenta"}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            {isLogin
              ? "¿No tenés cuenta? Crear cuenta"
              : "Ya tengo cuenta"}
          </button>

          <button
            type="button"
            onClick={resetPassword}
            className="text-xs text-violet-400 hover:text-violet-300 transition"
          >
            Recuperar contraseña
          </button>
        </div>
      </form>
    </main>
  );
}