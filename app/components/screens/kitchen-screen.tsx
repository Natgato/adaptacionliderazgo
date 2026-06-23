"use client";

import { DemoShell } from "@/app/components/demo-shell";
import { KpiStrip, OrderCard, PrimaryButton, SectionCard } from "@/app/components/demo-ui";
import { type OrderStatus, useDemo } from "@/app/components/demo-provider";

const kitchenActions: Array<{ label: string; status: OrderStatus }> = [
  { label: "En preparacion", status: "preparacion" },
  { label: "En horno", status: "horno" },
  { label: "Listo", status: "listo" },
  { label: "Entregado", status: "servido" },
];

export function KitchenScreen() {
  const { state, stats, getOrderTable, updateOrderStatus } = useDemo();
  const pendingOrders = state.orders.filter((order) => order.status !== "servido");

  return (
    <DemoShell
      title="Cocina"
      subtitle="Pedidos activos y cambio de estados para avanzar el flujo."
      trafficLevel={state.trafficLevel}
      headerMode="minimal"
      headerAction={<PrimaryButton href="/" variant="ghost">Salir</PrimaryButton>}
    >
      <div className="space-y-4 sm:space-y-6">
        <KpiStrip
          items={[
            { label: "Pendientes", value: pendingOrders.length },
            { label: "Listos", value: stats.ordersReady },
            { label: "Preparacion", value: stats.ordersInPreparation },
            { label: "Promedio ETA", value: `${stats.averageEta} min` },
          ]}
        />

        <SectionCard eyebrow="Cola de cocina" title="Pedidos pendientes">
          <div className="grid gap-4 xl:grid-cols-2">
            {pendingOrders.map((order, index) => (
              <div key={order.id} className="panel-enter" style={{ ["--i" as string]: index }}>
                <OrderCard
                  order={order}
                  table={getOrderTable(order.tableId)}
                  menu={state.menu}
                  action={
                    <div className="flex flex-wrap gap-3">
                      {kitchenActions.map((action) => (
                        <button
                          key={`${order.id}-${action.status}`}
                          type="button"
                          className={action.status === "listo" ? "action-pill action-pill-primary bg-white text-slate-950" : "action-pill action-pill-secondary bg-[rgba(20,36,86,0.85)] text-cyan-100"}
                          onClick={() => updateOrderStatus(order.id, action.status)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </DemoShell>
  );
}
