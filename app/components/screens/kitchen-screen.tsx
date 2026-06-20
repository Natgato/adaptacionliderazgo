"use client";

import { DemoShell } from "@/app/components/demo-shell";
import { KpiStrip, OrderCard, SectionCard } from "@/app/components/demo-ui";
import { type OrderStatus, useDemo } from "@/app/components/demo-provider";

const kitchenActions: Array<{ label: string; status: OrderStatus }> = [
  { label: "Marcar en preparacion", status: "preparacion" },
  { label: "Marcar en horno", status: "horno" },
  { label: "Marcar listo", status: "listo" },
];

export function KitchenScreen() {
  const { state, stats, getOrderTable, updateOrderStatus } = useDemo();
  const pendingOrders = state.orders.filter((order) => order.status !== "servido");

  return (
    <DemoShell
      title="Hornero / Cocina"
      subtitle="Aqui se ve la cola de pedidos, el estado de cada orden y los botones para avanzar el flujo de cocina hasta dejarla lista."
      trafficLevel={state.trafficLevel}
    >
      <div className="space-y-6">
        <KpiStrip
          items={[
            { label: "Pedidos pendientes", value: pendingOrders.length },
            { label: "Pedidos listos", value: stats.ordersReady },
            { label: "En preparacion", value: stats.ordersInPreparation },
            { label: "Promedio ETA", value: `${stats.averageEta} min` },
          ]}
        />

        <SectionCard eyebrow="Cola activa" title="Pedidos pendientes">
          <div className="grid gap-4 xl:grid-cols-2">
            {pendingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                table={getOrderTable(order.tableId)}
                menu={state.menu}
                action={
                  <div className="flex flex-wrap gap-3">
                    {kitchenActions.map((action) => (
                      <button
                        key={`${order.id}-${action.status}`}
                        type="button"
                        className="action-pill bg-[rgba(20,36,86,0.85)] text-cyan-100"
                        onClick={() => updateOrderStatus(order.id, action.status)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </SectionCard>
      </div>
    </DemoShell>
  );
}
