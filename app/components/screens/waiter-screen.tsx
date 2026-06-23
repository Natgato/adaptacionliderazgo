"use client";

import { DemoShell } from "@/app/components/demo-shell";
import { KpiStrip, OrderCard, PrimaryButton, SectionCard, TableCard } from "@/app/components/demo-ui";
import { type TableStatus, useDemo } from "@/app/components/demo-provider";

const tableStatusOptions: Array<{ label: string; value: TableStatus }> = [
  { label: "Disponible", value: "disponible" },
  { label: "Ocupada", value: "ocupada" },
  { label: "Reservada", value: "reservada" },
  { label: "En atencion", value: "en_atencion" },
];

export function WaiterScreen() {
  const { state, stats, updateTableStatus, updateOrderStatus } = useDemo();
  const readyOrders = state.orders.filter((order) => order.status === "listo");
  const pendingOrders = state.orders.filter((order) => order.status !== "listo" && order.status !== "servido");

  return (
    <DemoShell
      title="Mozo"
      subtitle="Control de mesas, pedidos listos y cierre del servicio."
      trafficLevel={state.trafficLevel}
      headerMode="minimal"
      headerAction={<PrimaryButton href="/" variant="ghost">Salir</PrimaryButton>}
    >
      <div className="space-y-4 sm:space-y-6">
        <KpiStrip
          items={[
            { label: "Mesas disponibles", value: stats.tablesAvailable },
            { label: "Mesas ocupadas", value: stats.tablesOccupied },
            { label: "Pedidos listos", value: stats.ordersReady },
            { label: "Pedidos activos", value: stats.activeOrders },
          ]}
        />

        <div className="grid gap-4 sm:gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <SectionCard eyebrow="Salon" title="Estado de mesas">
            <div className="grid gap-4 md:grid-cols-2">
              {state.tables.map((table, index) => (
                <div key={table.id} className="panel-enter" style={{ ["--i" as string]: index }}>
                  <TableCard
                    table={table}
                    action={
                      <div className="flex flex-wrap gap-2">
                        {tableStatusOptions.map((option) => (
                          <button
                            key={`${table.id}-${option.value}`}
                            type="button"
                            className="action-pill action-pill-secondary bg-[rgba(20,36,86,0.85)] text-cyan-100"
                            onClick={() => updateTableStatus(table.id, option.value)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    }
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          <div className="grid gap-4 sm:gap-6">
            <SectionCard eyebrow="Listos para servir" title="Pedidos listos">
              <div className="space-y-4">
                {readyOrders.length === 0 ? (
                  <div className="module-card">
                    <p className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-white">
                      Nada listo todavia
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Cuando cocina marque un pedido como listo, aparecera aqui para ser servido.
                    </p>
                  </div>
                ) : null}
                {readyOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    table={state.tables.find((table) => table.id === order.tableId)}
                    menu={state.menu}
                    action={
                      <button type="button" className="action-pill action-pill-primary bg-white text-slate-950" onClick={() => updateOrderStatus(order.id, "servido")}>
                        Marcar servido
                      </button>
                    }
                  />
                ))}
              </div>
            </SectionCard>

            <SectionCard eyebrow="Pedidos en curso" title="Pendientes">
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    table={state.tables.find((table) => table.id === order.tableId)}
                    menu={state.menu}
                  />
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
