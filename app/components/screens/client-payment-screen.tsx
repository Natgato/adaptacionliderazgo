"use client";

import { useRouter } from "next/navigation";
import { DemoShell } from "@/app/components/demo-shell";
import {
  CartSummary,
  PrimaryButton,
  SectionCard,
  StatusChip,
  TopInfoBar,
  orderLabels,
} from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function ClientPaymentScreen() {
  const router = useRouter();
  const { state, selectedTable, completePayment, lastOrder } = useDemo();

  const handlePayment = () => {
    const orderId = completePayment();
    if (orderId) router.push("/cliente/seguimiento");
  };

  return (
    <DemoShell
      title="Pago"
      subtitle="Confirma el pago simulado para generar el pedido y enviarlo a cocina."
      trafficLevel={state.trafficLevel}
      headerMode="minimal"
      headerAction={<PrimaryButton href="/" variant="ghost">Salir</PrimaryButton>}
      topBarSlot={
        <TopInfoBar
          guestName={state.guestName}
          points={state.rewardPoints}
          tableName={selectedTable?.name}
          orderLabel={lastOrder ? orderLabels[lastOrder.status] : "Pago pendiente"}
        />
      }
    >
      <div className="grid gap-4 sm:gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard eyebrow="Pago simulado" title="Confirmar compra">
          {!selectedTable || state.cart.length === 0 ? (
            <div className="module-card">
              <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">No hay pedido listo</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Primero reserva una mesa y agrega productos al carrito para poder simular el pago.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <PrimaryButton href="/cliente/mesas">Ir a mesas</PrimaryButton>
                <PrimaryButton href="/cliente/menu" variant="ghost">Ir al menu</PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <StatusChip label={selectedTable.name} tone="cyan" />
                <StatusChip label="Pago demo" tone="yellow" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {["Tarjeta", "Yape", "Efectivo"].map((method, index) => (
                  <div key={method} className="module-card panel-enter" style={{ ["--i" as string]: index }}>
                    <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">{method}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">Metodo simulado para la presentacion.</p>
                  </div>
                ))}
              </div>

              <div className="module-card">
                <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                  Generar pedido
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Al confirmar, el sistema crea un pedido nuevo con estado inicial &quot;Pedido recibido&quot; y lo envia al panel del cocinero.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" className="action-pill action-pill-primary bg-white text-slate-950" onClick={handlePayment}>
                    Confirmar pago
                  </button>
                  <PrimaryButton href="/cliente/menu" variant="ghost">Volver al menu</PrimaryButton>
                </div>
              </div>
            </div>
          )}
        </SectionCard>

        <SectionCard eyebrow="Resumen final" title="Carrito">
          <CartSummary cart={state.cart} menu={state.menu} />
        </SectionCard>
      </div>
    </DemoShell>
  );
}
