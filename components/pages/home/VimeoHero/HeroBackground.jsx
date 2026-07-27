import Particles from "@/components/animations/Particles";

export default function HeroBackground({ glowRef }) {
  return (
    <>
      {/* Light Image Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/hero-bg-light.svg')] bg-cover bg-center bg-no-repeat opacity-90 dark:opacity-0 pointer-events-none transition-opacity duration-500"
      />

      {/* Dark Image Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('/hero-bg-dark.svg')] bg-cover bg-center bg-no-repeat opacity-0 dark:opacity-90 pointer-events-none transition-opacity duration-500"
      />

      {/* Subtle Central Contrast Radial Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(248,250,252,0.45)_0%,rgba(248,250,252,0.1)_60%,transparent_100%)] dark:bg-[radial-gradient(circle_at_50%_35%,rgba(3,7,18,0.45)_0%,rgba(3,7,18,0.1)_60%,transparent_100%)] pointer-events-none transition-colors duration-300"
      />

      {/* <div
                aria-hidden="true"
                className="
                    absolute inset-0
                    [background-image:linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]
                    [background-size:80px_80px]
                    [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]
                    pointer-events-none
                "
            /> */}

      {/* RIGHT SIDE DECORATORS */}
      <div
        aria-hidden="true"
        className="hidden lg:flex absolute top-0 bottom-0 right-0 w-20 flex-col items-center justify-center gap-8 z-[5] pointer-events-none border-l border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="hero-side-el flex items-center justify-center opacity-50 w-1.5 h-1.5 bg-transparent border border-slate-400 dark:border-slate-600 rotate-45" />
        <div className="hero-side-el flex items-center justify-center opacity-50 w-px h-20 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        <div className="hero-side-el flex items-center justify-center opacity-50 text-[0.65rem] tracking-[0.3em] font-semibold text-slate-600 dark:text-slate-400">
          2025
        </div>
        <div className="hero-side-el flex items-center justify-center opacity-40 w-px h-20 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        <div className="hero-side-el flex items-center justify-center opacity-40 w-1.5 h-1.5 bg-slate-400 dark:bg-slate-600" />
        <div className="hero-side-el flex items-center justify-center opacity-50  text-[0.85rem] font-bold text-slate-700 dark:text-slate-300">
          WEB
        </div>
      </div>

      {/* Particles */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-25 pointer-events-none"
      >
        <Particles
          particleColors={[
            "#3b82f6",
            "#38bdf8",
            "#60a5fa",
            "#818cf8",
            "#93c5fd",
          ]}
          particleCount={130}
          speed={0.3}
          particleBaseSize={220}
          alphaParticles
        />
      </div>

      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="
                    absolute top-0 left-0 w-[600px] h-[600px] rounded-full
                    pointer-events-none
                    [will-change:transform]
                    bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,rgba(2,132,199,0.06)_40%,transparent_70%)]
                "
      />
    </>
  );
}
