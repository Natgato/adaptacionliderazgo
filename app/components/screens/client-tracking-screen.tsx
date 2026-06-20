"use client";

import { DemoShell } from "@/app/components/demo-shell";
import { OrderCard, OrderProgress, PrimaryButton, SectionCard } from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function ClientTrackingScreen() {
  const { state, lastOrder, getOrderTable, resetClientFlow } = useDemo();

  return (
    <DemoShell
      title="Cliente / Seguimiento"
      subtitle="Despues del pago, el cliente entra a una vista de seguimiento que cambia segun lo que haga cocina y mozo."
      trafficLevel={state.trafficLevel}
    >
      {!lastOrder ? (
        <SectionCard eyebrow="Paso 4" title="Sin pedido activo">
          <div className="module-card">
            <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">Aun no existe un pedido</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Completa el flujo desde el menu y el pago para activar la barra de seguimiento.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <PrimaryButton href="/cliente">Empezar de nuevo</PrimaryButton>
              <PrimaryButton href="/cliente/menu" variant="ghost">Ir al menu</PrimaryButton>
            </div>
          </div>
        </SectionCard>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <SectionCard eyebrow="Paso 4" title="Estado del pedido">
            <OrderProgress status={lastOrder.status} />
            <div className="mt-6 flex flex-wrap gap-3">
              <PrimaryButton href="/hornero" variant="ghost">Ver panel del hornero</PrimaryButton>
              <PrimaryButton href="/mozo" variant="ghost">Ver panel del mozo</PrimaryButton>
            </div>
          </SectionCard>

          <SectionCard eyebrow="Detalle" title={lastOrder.id}>
            <OrderCard order={lastOrder} table={getOrderTable(lastOrder.tableId)} menu={state.menu} />
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                className="action-pill bg-white text-slate-950"
                onClick={resetClientFlow}
              >
                Reiniciar flujo cliente
              </button>
              <PrimaryButton href="/cliente">Volver al inicio cliente</PrimaryButton>
            </div>
          </SectionCard>
        </div>
      )}
    </DemoShell>
  );
}
