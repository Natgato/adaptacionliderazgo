"use client";

import { useEffect } from "react";
import { DemoShell } from "@/app/components/demo-shell";
import {
  OrderProgress,
  PrimaryButton,
  SectionCard,
  TopInfoBar,
  orderLabels,
} from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

const AUTO_FLOW = ["recibido", "preparacion", "horno", "listo", "servido"] as const;

const VISIBLE_REWARDS = [
  {
    points: 200,
    title: "Descuento pequeno",
    copy: "Descuento pequeno para una proxima compra.",
  },
  {
    points: 300,
    title: "Descuento mayor",
    copy: "Descuento mayor para una proxima compra.",
  },
];

export function ClientTrackingScreen() {
  const { state, lastOrder, getOrderTable, resetClientFlow, addRewardPoints, updateOrderStatus } = useDemo();

  useEffect(() => {
    if (!lastOrder || lastOrder.status === "servido") return;

    const pointsTimer = window.setInterval(() => addRewardPoints(5), 12000);
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
      subtitle="Seguimiento del pedido, juego visible y puntos acumulados en una vista compacta."
      trafficLevel={state.trafficLevel}
      headerMode="minimal"
      headerAction={<PrimaryButton href="/" variant="ghost">Salir</PrimaryButton>}
      topBarSlot={
        <TopInfoBar
          guestName={state.guestName}
          points={state.rewardPoints}
          tableName={getOrderTable(lastOrder?.tableId ?? "")?.name}
          orderLabel={lastOrder ? orderLabels[lastOrder.status] : null}
        />
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
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="space-y-4">
            <SectionCard eyebrow="Pedido activo" title={lastOrder.id}>
              <div className="grid grid-cols-2 gap-3">
                <div className="module-card panel-enter">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Cliente</p>
                  <p className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                    {state.guestName || "Invitado"}
                  </p>
                </div>
                <div className="module-card panel-enter" style={{ ["--i" as string]: 1 }}>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Tiempo estimado</p>
                  <p className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.08em] text-cyan-100">
                    {lastOrder.etaMinutes} min
                  </p>
                </div>
                <div className="module-card panel-enter" style={{ ["--i" as string]: 2 }}>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Puntos</p>
                  <p className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.08em] text-yellow-100">
                    {state.rewardPoints} pts
                  </p>
                </div>
                <div className="module-card panel-enter" style={{ ["--i" as string]: 3 }}>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Estado</p>
                  <p className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                    {orderLabels[lastOrder.status]}
                  </p>
                </div>
              </div>

              <div className="mt-4 module-card panel-enter" style={{ ["--i" as string]: 4 }}>
                <p className="text-sm leading-6 text-slate-300">
                  Acumulas 5 puntos por cada minuto de espera.
                </p>
                <div className="mt-4">
                  <OrderProgress status={lastOrder.status} compact />
                </div>
              </div>
            </SectionCard>

            <SectionCard eyebrow="Premios visibles" title="Canjes de la demo">
              <div className="grid gap-3">
                {VISIBLE_REWARDS.map((reward, index) => (
                  <div key={reward.points} className="module-card panel-enter" style={{ ["--i" as string]: index }}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-white">
                          {reward.points} puntos
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{reward.copy}</p>
                      </div>
                      <button type="button" disabled className="action-pill action-pill-secondary cursor-not-allowed opacity-50 bg-[rgba(20,36,86,0.85)] text-cyan-100">
                        Proximamente
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <div className="space-y-4">
            <SectionCard eyebrow="Actividad destacada" title="Juega mientras llega tu pizza">
              <div className="featured-game-card panel-enter">
                <div className="featured-game-copy">
                  <p className="font-display text-5xl uppercase leading-none tracking-[0.08em] text-white sm:text-6xl">
                    Juego activo
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
                    El juego queda al centro de la experiencia para que la sala de espera se sienta entretenida y facil de presentar.
                  </p>
                </div>
                <div className="featured-game-frame">
                  <div className="relative w-full overflow-hidden rounded-[0.2rem] pb-[56%]">
                    <iframe
                      title="Pizza Delivery Demastered"
                      src="https://itch.io/embed/891896"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>

            <SectionCard eyebrow="Control de salida" title="Cerrar recorrido">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="module-card panel-enter">
                  <p className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-white">
                    Reinicia solo al cliente
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Conserva los pedidos simulados del sistema y limpia el recorrido del invitado para volver a presentarlo.
                  </p>
                </div>
                <div className="flex items-stretch">
                  <button type="button" className="action-pill action-pill-primary h-full w-full bg-white text-slate-950" onClick={resetClientFlow}>
                    Reiniciar flujo cliente
                  </button>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}
    </DemoShell>
  );
}
