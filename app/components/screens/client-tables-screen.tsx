"use client";

import { useRouter } from "next/navigation";
import { DemoShell } from "@/app/components/demo-shell";
import { KpiStrip, PrimaryButton, SectionCard, TableCard, TopInfoBar, orderLabels } from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function ClientTablesScreen() {
  const router = useRouter();
  const { state, stats, reserveTable, selectedTable, lastOrder } = useDemo();

  return (
    <DemoShell
      title="Mesas"
      subtitle="Selecciona una mesa disponible antes de pasar al menu."
      trafficLevel={state.trafficLevel}
      headerMode="minimal"
      headerAction={<PrimaryButton href="/" variant="ghost">Salir</PrimaryButton>}
      topBarSlot={
        <TopInfoBar
          guestName={state.guestName}
          points={state.rewardPoints}
          tableName={selectedTable?.name}
          orderLabel={lastOrder ? orderLabels[lastOrder.status] : null}
        />
      }
    >
      <div className="space-y-4 sm:space-y-6">
        <KpiStrip
          items={[
            { label: "Nivel del local", value: state.trafficLevel === "alta" ? "Alta demanda" : state.trafficLevel === "concurrido" ? "Dia concurrido" : "Dia tranquilo" },
            { label: "Mesas disponibles", value: stats.tablesAvailable },
            { label: "Pedidos activos", value: stats.activeOrders },
            { label: "Tiempo promedio", value: `${stats.averageEta} min` },
          ]}
        />

        <SectionCard
          eyebrow="Seleccion de mesa"
          title="Elige tu mesa"
          action={<PrimaryButton href="/cliente/menu" disabled={!selectedTable}>Continuar al menu</PrimaryButton>}
        >
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
            {state.tables.map((table, index) => (
              <div key={table.id} className="panel-enter" style={{ ["--i" as string]: index }}>
                <TableCard
                  table={table}
                  selected={selectedTable?.id === table.id}
                  action={
                    table.status === "disponible" ? (
                      <button type="button" className="action-pill action-pill-primary bg-white text-slate-950" onClick={() => reserveTable(table.id)}>
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
                  La mesa quedo apartada para la demo. Ahora puedes pasar al catalogo y construir el pedido completo.
                </p>
              </div>
              <div className="module-card panel-enter" style={{ ["--i" as string]: 1 }}>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Accion principal</p>
                <p className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                  Catalogo y resumen
                </p>
                <div className="mt-5">
                  <button type="button" className="action-pill action-pill-primary bg-white text-slate-950" onClick={() => router.push("/cliente/menu")}>
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
