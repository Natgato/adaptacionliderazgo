"use client";

import { useMemo } from "react";
import { DemoShell } from "@/app/components/demo-shell";
import { CartSummary, PrimaryButton, SectionCard, StatusChip, categoryLabels } from "@/app/components/demo-ui";
import { useDemo } from "@/app/components/demo-provider";

export function ClientMenuScreen() {
  const { state, selectedTable, addToCart, decreaseCartItem, removeCartItem } = useDemo();

  const grouped = useMemo(() => {
    return {
      pizzas: state.menu.filter((item) => item.category === "pizzas"),
      bebidas: state.menu.filter((item) => item.category === "bebidas"),
      extras: state.menu.filter((item) => item.category === "extras"),
    };
  }, [state.menu]);

  return (
    <DemoShell
      title="Cliente / Catalogo"
      subtitle="Con la mesa ya elegida, el cliente arma el pedido desde un catalogo simple y revisa el resumen antes de pagar."
      trafficLevel={state.trafficLevel}
    >
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard eyebrow="Paso 2" title="Catalogo simulado">
          {!selectedTable ? (
            <div className="module-card">
              <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">Falta elegir mesa</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Vuelve a la pantalla anterior, reserva una mesa disponible y luego entra al catalogo.
              </p>
              <div className="mt-5">
                <PrimaryButton href="/cliente">Volver a mesas</PrimaryButton>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-3">
                <StatusChip label={selectedTable.name} tone="cyan" />
                <StatusChip label="Pedido en construccion" tone="white" />
              </div>

              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="space-y-4">
                  <h3 className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
                    {categoryLabels[category as keyof typeof grouped]}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {items.map((item) => (
                      <article key={item.id} className="module-card">
                        <p className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-white">{item.name}</p>
                        <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-cyan-100">
                            S/ {item.price}
                          </span>
                          <button type="button" className="action-pill bg-white text-slate-950" onClick={() => addToCart(item.id)}>
                            Agregar
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard
          eyebrow="Resumen"
          title="Pedido"
          action={
            <PrimaryButton href="/cliente/pago" disabled={state.cart.length === 0 || !selectedTable}>
              Ir al pago
            </PrimaryButton>
          }
        >
          <CartSummary
            cart={state.cart}
            menu={state.menu}
            onAdd={addToCart}
            onDecrease={decreaseCartItem}
            onRemove={removeCartItem}
          />
        </SectionCard>
      </div>
    </DemoShell>
  );
}
