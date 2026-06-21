"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DemoShell } from "@/app/components/demo-shell";
import { PrimaryButton, SectionCard } from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function ClientOverviewScreen() {
  const router = useRouter();
  const { state, setGuestName } = useDemo();
  const [name, setName] = useState(state.guestName);

  const handleContinue = () => {
    const clean = name.trim();

    if (!clean) return;

    setGuestName(clean);
    router.push("/cliente/mesas");
  };

  return (
    <DemoShell
      title="Invitado"
      subtitle="El cliente entra sin cuenta real. Solo deja su nombre y pasa a una experiencia exclusiva de compra y espera."
      trafficLevel={state.trafficLevel}
      navLinks={[
        { href: "/", label: "Inicio" },
        { href: "/cliente", label: "Nombre" },
        { href: "/cliente/mesas", label: "Mesas" },
        { href: "/cliente/menu", label: "Menu" },
        { href: "/cliente/pago", label: "Pago" },
        { href: "/cliente/seguimiento", label: "Sala" },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard eyebrow="Paso 1" title="Entrar como invitado">
          <div className="space-y-4">
            <div className="module-card panel-enter">
              <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                Nombre del cliente
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Escribe tu nombre para que el pedido, la sala de espera y los puntos se vean personalizados en la demo.
              </p>
            </div>

            <label className="block">
              <span className="mb-2 block font-mono text-[0.64rem] uppercase tracking-[0.24em] text-slate-300">
                Tu nombre
              </span>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Escribe tu nombre"
                className="w-full border border-white/10 bg-black/25 px-4 py-4 text-lg text-white outline-none transition-[border-color,transform,box-shadow] duration-200 ease-[cubic-bezier(0.25,1,0.5,1)] placeholder:text-slate-500 focus:border-cyan-300/60 focus:shadow-[0_0_0_1px_rgba(115,242,255,0.2)]"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="action-pill bg-white text-slate-950" onClick={handleContinue}>
                Continuar a mesas
              </button>
              <PrimaryButton href="/" variant="ghost">Volver al inicio</PrimaryButton>
            </div>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Que sigue" title="Flujo del invitado">
          <div className="space-y-4">
            {[
              "1. Poner nombre",
              "2. Elegir una mesa disponible",
              "3. Armar el pedido",
              "4. Confirmar pago simulado",
              "5. Esperar con juego, puntos y barra de progreso",
            ].map((item, index) => (
              <div key={item} className="module-card panel-enter" style={{ ["--i" as string]: index }}>
                <p className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-white">{item}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </DemoShell>
  );
}
