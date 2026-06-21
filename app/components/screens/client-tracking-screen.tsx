"use client";

import { useEffect } from "react";
import { DemoShell } from "@/app/components/demo-shell";
import {
  OrderCard,
  OrderProgress,
  PrimaryButton,
  RewardsPanel,
  SectionCard,
  TopInfoBar,
  orderLabels,
} from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

const AUTO_FLOW = ["recibido", "preparacion", "horno", "listo", "servido"] as const;

export function ClientTrackingScreen() {
  const { state, lastOrder, getOrderTable, resetClientFlow, addRewardPoints, updateOrderStatus } = useDemo();

  useEffect(() => {
    if (!lastOrder || lastOrder.status === "servido") return;

    const pointsTimer = window.setInterval(() => addRewardPoints(15), 5000);
    return () => window.clearInterval(pointsTimer);
  }, [addRewardPoints, lastOrder]);

  useEffect(() => {
    if (!lastOrder || lastOrder.status === "servido") return;

    const flowTimer = window.setInterval(() => {
      const currentIndex = AUTO_FLOW.indexOf(lastOrder.status);
      const nextStatus = AUTO_FLOW[currentIndex + 1];
      if (nextStatus) updateOrderStatus(lastOrder.id, nextStatus);
    }, 18000);

    return () => window.clearInterval(flowTimer);
  }, [lastOrder, updateOrderStatus]);

  return (
    <DemoShell
      title="Sala de espera"
      subtitle="Despues del pago, el invitado entra a una sala de espera con seguimiento visible, juego integrado y puntos que crecen mientras espera."
      trafficLevel={state.trafficLevel}
      navLinks={[
        { href: "/", label: "Inicio" },
        { href: "/cliente", label: "Nombre" },
        { href: "/cliente/mesas", label: "Mesas" },
        { href: "/cliente/menu", label: "Menu" },
        { href: "/cliente/pago", label: "Pago" },
        { href: "/cliente/seguimiento", label: "Sala" },
      ]}
      topBarSlot={
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <TopInfoBar
            guestName={state.guestName}
            points={state.rewardPoints}
            tableName={getOrderTable(lastOrder?.tableId ?? "")?.name}
            orderLabel={lastOrder ? orderLabels[lastOrder.status] : null}
          />
          <RewardsPanel points={state.rewardPoints} />
        </div>
      }
    >
      {!lastOrder ? (
        <SectionCard eyebrow="Sala" title="Sin pedido activo">
          <div className="module-card">
            <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">Aun no existe un pedido</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Completa el flujo desde el menu y el pago para activar la sala de espera y el seguimiento.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <PrimaryButton href="/cliente">Empezar de nuevo</PrimaryButton>
              <PrimaryButton href="/cliente/menu" variant="ghost">Ir al menu</PrimaryButton>
            </div>
          </div>
        </SectionCard>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <SectionCard eyebrow="Sala activa" title={`Esperando ${state.guestName || "invitado"}`}>
              <div className="space-y-5">
                <div className="module-card panel-enter">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Pedido</p>
                  <p className="mt-2 font-display text-5xl uppercase leading-none tracking-[0.08em] text-white">{lastOrder.id}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Mientras esperas tu pizza, acumulas puntos para futuros descuentos dentro del sistema demo.
                  </p>
                </div>

                <div className="module-card panel-enter" style={{ ["--i" as string]: 1 }}>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Tiempo estimado</p>
                  <p className="mt-2 font-display text-5xl uppercase leading-none tracking-[0.08em] text-cyan-100">
                    {lastOrder.etaMinutes} min
                  </p>
                </div>

                <div className="module-card panel-enter" style={{ ["--i" as string]: 2 }}>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Puntos ganados</p>
                  <p className="mt-2 font-display text-5xl uppercase leading-none tracking-[0.08em] text-yellow-100">
                    {state.rewardPoints} pts
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard eyebrow="Seguimiento" title="Avance de la pizza">
              <OrderProgress status={lastOrder.status} />
              <div className="mt-6">
                <OrderCard order={lastOrder} table={getOrderTable(lastOrder.tableId)} menu={state.menu} />
              </div>
            </SectionCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <SectionCard eyebrow="Actividad" title="Juego en espera">
              <div className="module-card panel-enter">
                <p className="mb-4 text-sm leading-6 text-slate-300">
                  El cliente puede entretenerse mientras el pedido avanza. El juego se muestra como actividad integrada dentro de la sala de espera.
                </p>
                <div className="overflow-hidden border border-white/10 bg-black/30 p-3">
                  <iframe
                    title="Pizza Delivery Demastered"
                    height="167"
                    width="552"
                    src="https://itch.io/embed/891896"
                    className="mx-auto max-w-full"
                  />
                </div>
              </div>
            </SectionCard>

            <SectionCard eyebrow="Salida" title="Cerrar demostracion">
              <div className="space-y-4">
                <div className="module-card panel-enter">
                  <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                    Fin del recorrido
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Cuando termine la presentación puedes reiniciar solo el flujo del invitado sin tocar el resto de pedidos simulados del sistema.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button type="button" className="action-pill bg-white text-slate-950" onClick={resetClientFlow}>
                    Reiniciar flujo cliente
                  </button>
                  <PrimaryButton href="/cliente/mesas" variant="ghost">Volver a mesas</PrimaryButton>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
