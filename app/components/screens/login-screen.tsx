"use client";

import { DemoShell } from "@/app/components/demo-shell";
import { PrimaryButton, SectionCard, StatusChip } from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function LoginScreen() {
  const { state, stats } = useDemo();

  return (
    <DemoShell
      title="Control central"
      subtitle="Elige un rol de demostracion y entra directo al flujo. No hay login real: el objetivo es presentar el sistema integral de Pizza Express con estados compartidos."
      trafficLevel={state.trafficLevel}
    >
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard eyebrow="Accesos" title="Ingreso por rol">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Cliente",
                copy: "Revisa afluencia, elige mesa, arma el pedido, paga y sigue el avance.",
                href: "/cliente",
              },
              {
                title: "Hornero",
                copy: "Gestiona cola de pedidos, cambia estados y vigila tiempos estimados.",
                href: "/hornero",
              },
              {
                title: "Mozo",
                copy: "Controla mesas, verifica pedidos listos y marca los servidos.",
                href: "/mozo",
              },
              {
                title: "Admin",
                copy: "Consulta estadisticas globales para una presentacion ejecutiva del demo.",
                href: "/admin",
              },
            ].map((role) => (
              <article key={role.title} className="module-card">
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
          <SectionCard eyebrow="Estado del demo" title="Resumen operativo">
            <div className="space-y-4">
              <div className="module-card">
                <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                  Flujo completo listo
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Cliente reserva mesa, genera pedido, paga y sigue el estado. Hornero y mozo actualizan el mismo pedido desde sus paneles.
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
