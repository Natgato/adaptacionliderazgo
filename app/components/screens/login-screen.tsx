"use client";

import { DemoShell } from "@/app/components/demo-shell";
import { PrimaryButton, SectionCard, StatusChip } from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function LoginScreen() {
  const { state, stats } = useDemo();

  return (
    <DemoShell
      title="Acceso demo"
      subtitle="Esta version se enfoca en una presentacion funcional. El acceso principal es el invitado; cocina, mozo y administrador quedan disponibles como paneles separados para mostrar el flujo completo."
      trafficLevel={state.trafficLevel}
      headerMode="hidden"
      mainClassName="flex items-center"
    >
      <div className="grid w-full gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="hud-panel px-5 py-6 sm:px-7 sm:py-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.28em] text-cyan-200/75">
              Pizza Express / Inicio
            </p>
            <h1 className="mt-4 font-display text-[4.2rem] uppercase leading-none tracking-[0.06em] text-white sm:text-[5.8rem]">
              Elige tu acceso
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Una sola entrada para la demo. Cada perfil abre una vista separada y limpia, sin mezclar cocina, salon ni seguimiento del cliente.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Entrar como invitado",
                copy: "Flujo completo para cliente: nombre, mesa, pedido, pago simulado y sala de espera con juego.",
                href: "/cliente",
              },
              {
                title: "Entrar como cocina",
                copy: "Ve los pedidos activos y cambia su estado para empujar el avance de la pizza.",
                href: "/hornero",
              },
              {
                title: "Entrar como mozo",
                copy: "Controla mesas, revisa pedidos listos y marca cuando la orden ya fue servida.",
                href: "/mozo",
              },
              {
                title: "Entrar como administrador",
                copy: "Resumen ejecutivo de afluencia, produccion y ocupacion para presentar el sistema.",
                href: "/admin",
              },
            ].map((role, index) => (
              <article key={role.title} className="module-card panel-enter" style={{ ["--i" as string]: index }}>
                <h3 className="font-display text-3xl uppercase leading-none tracking-[0.08em] text-white sm:text-4xl">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{role.copy}</p>
                <div className="mt-5">
                  <PrimaryButton href={role.href}>Entrar</PrimaryButton>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="grid gap-6">
          <SectionCard eyebrow="Resumen demo" title="Estado del local">
            <div className="space-y-4">
              <div className="module-card">
                <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">Presentacion funcional</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Invitado entra, pone nombre, reserva mesa, arma pedido, paga y espera con seguimiento visible mientras cocina y mozo actualizan el estado.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <StatusChip label={`${stats.activeOrders} pedidos activos`} tone="cyan" />
                <StatusChip label={`${stats.tablesAvailable} mesas disponibles`} tone="emerald" />
                <StatusChip label={`${stats.ordersReady} pedidos listos`} tone="yellow" />
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </DemoShell>
  );
}
