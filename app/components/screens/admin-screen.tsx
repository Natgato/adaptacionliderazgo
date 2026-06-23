"use client";

import { DemoShell } from "@/app/components/demo-shell";
import { KpiStrip, PrimaryButton, SectionCard, StatusChip, trafficLabels } from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function AdminScreen() {
  const { state, stats } = useDemo();

  return (
    <DemoShell
      title="Administrador"
      subtitle="Vista simple de supervision para explicar el impacto del sistema."
      trafficLevel={state.trafficLevel}
      headerMode="minimal"
      headerAction={<PrimaryButton href="/" variant="ghost">Salir</PrimaryButton>}
    >
      <div className="space-y-4 sm:space-y-6">
        <KpiStrip
          items={[
            { label: "Pedidos activos", value: stats.activeOrders },
            { label: "Mesas disponibles", value: stats.tablesAvailable },
            { label: "Mesas ocupadas", value: stats.tablesOccupied },
            { label: "Afluencia", value: trafficLabels[state.trafficLevel] },
          ]}
        />

        <div className="grid gap-4 sm:gap-6 xl:grid-cols-3">
          <SectionCard eyebrow="Produccion" title="Pedidos">
            <div className="flex flex-wrap gap-3">
              <StatusChip label={`En preparacion ${stats.ordersInPreparation}`} tone="cyan" />
              <StatusChip label={`En horno ${stats.ordersInOven}`} tone="yellow" />
              <StatusChip label={`Listos ${stats.ordersReady}`} tone="emerald" />
            </div>
          </SectionCard>

          <SectionCard eyebrow="Salon" title="Mesas">
            <div className="flex flex-wrap gap-3">
              <StatusChip label={`Disponibles ${stats.tablesAvailable}`} tone="emerald" />
              <StatusChip label={`Ocupadas ${stats.tablesOccupied}`} tone="rose" />
              <StatusChip label={`Afluencia ${trafficLabels[state.trafficLevel]}`} tone="white" />
            </div>
          </SectionCard>

          <SectionCard eyebrow="Tiempo" title="Ritmo">
            <div className="module-card">
              <p className="font-display text-5xl uppercase leading-none tracking-[0.08em] text-white">
                {stats.averageEta} min
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Tiempo promedio estimado de los pedidos activos dentro del sistema.
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </DemoShell>
  );
}
