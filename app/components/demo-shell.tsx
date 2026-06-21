"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AmbientBlueprint } from "@/app/components/ambient-blueprint";
import type { TrafficLevel } from "@/app/components/demo-provider";

const trafficCopy: Record<TrafficLevel, string> = {
  tranquilo: "Dia tranquilo",
  concurrido: "Dia concurrido",
  alta: "Alta demanda",
};

export function DemoShell({
  title,
  subtitle,
  trafficLevel,
  navLinks,
  topBarSlot,
  mobileMinimal,
  children,
}: {
  title: string;
  subtitle: string;
  trafficLevel: TrafficLevel;
  navLinks?: Array<{ href: string; label: string }>;
  topBarSlot?: React.ReactNode;
  mobileMinimal?: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const links = navLinks ?? [
    { href: "/", label: "Inicio" },
    { href: "/cliente", label: "Invitado" },
    { href: "/hornero", label: "Hornero" },
    { href: "/mozo", label: "Mozo" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(62,133,255,0.18),_transparent_38%),linear-gradient(160deg,_rgba(5,10,28,0.98)_0%,_rgba(3,7,20,0.94)_48%,_rgba(0,0,0,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(140deg,_transparent_0%,_transparent_44%,_rgba(47,104,255,0.1)_44%,_rgba(47,104,255,0.12)_63%,_transparent_63%),linear-gradient(180deg,_rgba(121,235,255,0.08),_transparent_28%)]" />
      <AmbientBlueprint />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-3 py-3 sm:px-6 sm:py-5 lg:px-10">
        <header className={`hud-panel flex flex-col gap-4 px-4 py-4 sm:px-5 sm:py-5 ${mobileMinimal ? "mobile-shell-minimal" : ""}`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-cyan-200/75 sm:text-[0.7rem] sm:tracking-[0.35em]">
                Pizza Express / Demo funcional
              </p>
              <h1 className="font-display text-[2.9rem] uppercase leading-none tracking-[0.06em] text-white sm:text-6xl sm:tracking-[0.08em]">
                {title}
              </h1>
              <p className="shell-subtitle max-w-3xl text-sm leading-6 text-slate-200/82 sm:text-base">{subtitle}</p>
            </div>

            <div className="shell-traffic min-w-0 rounded-sm border border-white/10 bg-white/5 px-4 py-3 sm:min-w-56">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.26em] text-slate-300">Afluencia</p>
              <p className="mt-1 font-display text-3xl uppercase leading-none tracking-[0.08em] text-cyan-100 sm:text-4xl">
                {trafficCopy[trafficLevel]}
              </p>
            </div>
          </div>

          <nav className="shell-nav flex gap-2 overflow-x-auto pb-1 sm:grid sm:overflow-visible sm:pb-0 xl:grid-cols-6">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link key={link.href} href={link.href} className={`role-access min-w-max sm:min-w-0 ${active ? "role-access-active" : ""}`}>
                  <span className="font-display text-[1.9rem] uppercase leading-none tracking-[0.07em] sm:text-3xl sm:tracking-[0.08em]">
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </header>

        {topBarSlot ? <div className="mt-4">{topBarSlot}</div> : null}
        <main className="mt-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
