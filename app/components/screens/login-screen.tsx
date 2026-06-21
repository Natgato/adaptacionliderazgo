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
      navLinks={[
        { href: "/", label: "Inicio" },
        { href: "/cliente", label: "Invitado" },
        { href: "/hornero", label: "Hornero" },
        { href: "/mozo", label: "Mozo" },
        { href: "/admin", label: "Admin" },
      ]}
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard eyebrow="Ingreso" title="Elegir rol">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Entrar como invitado",
                copy: "Pide nombre, muestra mesas, catalogo, pago simulado y sala de espera con juego y puntos.",
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
                <h3 className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{role.copy}</p>
                <div className="mt-5">
                  <PrimaryButton href={role.href}>Entrar</PrimaryButton>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <SectionCard eyebrow="Resumen" title="Demo lista para mostrar">
            <div className="space-y-4">
              <div className="module-card">
                <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                  Flujo principal enfocado
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Invitado entra, pone nombre, reserva mesa, arma pedido, paga y espera con seguimiento visible.
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
