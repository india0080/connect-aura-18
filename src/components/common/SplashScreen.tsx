import { useEffect, useState } from "react";
import logoImg from "@/assets/gomilap-logo.png";

/**
 * Mobile splash screen shown on first app load.
 * - Mobile-only (hidden on md+ screens)
 * - Brand purple-to-pink gradient background
 * - Animated GoMilap logo + wordmark
 * - Auto-dismisses after ~1.6s with a fade-out
 */
export const SplashScreen = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Lock scroll while splash is showing
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fadeTimer = window.setTimeout(() => setFading(true), 1400);
    const hideTimer = window.setTimeout(() => setVisible(false), 1900);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading GoMilap"
      className={`md:hidden fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(160deg, hsl(280 70% 18%) 0%, hsl(310 75% 32%) 55%, hsl(335 85% 58%) 100%)",
      }}
    >
      {/* Decorative glow blobs */}
      <div
        aria-hidden
        className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-50"
        style={{ background: "hsl(330 90% 60% / 0.55)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full blur-3xl opacity-50"
        style={{ background: "hsl(270 90% 55% / 0.55)" }}
      />

      {/* Logo */}
      <div className="relative animate-fade-in">
        <div
          aria-hidden
          className="absolute inset-0 rounded-3xl blur-2xl animate-pulse"
          style={{ background: "hsl(330 90% 65% / 0.55)" }}
        />
        <img
          src={logoImg}
          alt="GoMilap"
          className="relative h-28 w-28 rounded-3xl object-cover shadow-2xl ring-1 ring-white/20"
        />
      </div>

      {/* Wordmark */}
      <div className="relative mt-6 text-center animate-fade-in" style={{ animationDelay: "120ms" }}>
        <h1
          className="text-3xl font-extrabold tracking-tight text-white"
          style={{ fontFamily: "'Sora', 'Inter', sans-serif" }}
        >
          GoMilap
        </h1>
        <p className="mt-1 text-sm text-white/80">Connect • Chat • Belong</p>
      </div>

      {/* Loader dots */}
      <div className="absolute bottom-16 flex items-center gap-2" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-white/90 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 rounded-full bg-white/70 animate-bounce" style={{ animationDelay: "120ms" }} />
        <span className="h-2 w-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "240ms" }} />
      </div>
    </div>
  );
};

export default SplashScreen;
