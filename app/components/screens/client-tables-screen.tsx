"use client";

import { useRouter } from "next/navigation";
import { DemoShell } from "@/app/components/demo-shell";
import { KpiStrip, PrimaryButton, RewardsPanel, SectionCard, TableCard, TopInfoBar, orderLabels } from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function ClientTablesScreen() {
  const router = useRouter();
  const { state, stats, reserveTable, selectedTable, lastOrder } = useDemo();

  return (
    <DemoShell
      title="Invitado / Mesas"
      subtitle="Ya dentro de la experiencia del cliente, el siguiente objetivo es elegir una mesa visible y clara antes de pasar al menu."
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
            tableName={selectedTable?.name}
            orderLabel={lastOrder ? orderLabels[lastOrder.status] : null}
          />
          <RewardsPanel points={state.rewardPoints} />
        </div>
      }
    >
      <div className="space-y-6">
        <KpiStrip
          items={[
            { label: "Nivel del local", value: state.trafficLevel === "alta" ? "Alta demanda" : state.trafficLevel === "concurrido" ? "Dia concurrido" : "Dia tranquilo" },
            { label: "Mesas disponibles", value: stats.tablesAvailable },
            { label: "Pedidos activos", value: stats.activeOrders },
            { label: "Tiempo promedio", value: `${stats.averageEta} min` },
          ]}
        />

        <SectionCard
          eyebrow="Paso 2"
          title="Elegir mesa"
          action={<PrimaryButton href="/cliente/menu" disabled={!selectedTable}>Continuar al menu</PrimaryButton>}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {state.tables.map((table, index) => (
              <div key={table.id} className="panel-enter" style={{ ["--i" as string]: index }}>
                <TableCard
                  table={table}
                  selected={selectedTable?.id === table.id}
                  action={
                    table.status === "disponible" ? (
                      <button type="button" className="action-pill bg-white text-slate-950" onClick={() => reserveTable(table.id)}>
                        Reservar mesa
                      </button>
                    ) : null
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {selectedTable ? (
          <SectionCard eyebrow="Mesa activa" title={selectedTable.name}>
            <div className="grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
              <div className="module-card panel-enter">
                <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                  Reserva confirmada
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  La mesa quedó apartada para el demo. Ahora puedes pasar al catálogo y construir el pedido completo.
                </p>
              </div>
              <div className="module-card panel-enter" style={{ ["--i" as string]: 1 }}>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Siguiente paso</p>
                <p className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                  Catalogo y resumen
                </p>
                <div className="mt-5">
                  <button type="button" className="action-pill bg-[rgba(20,36,86,0.85)] text-cyan-100" onClick={() => router.push("/cliente/menu")}>
                    Ir al menu
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>
        ) : null}
      </div>
    </DemoShell>
  );
}
