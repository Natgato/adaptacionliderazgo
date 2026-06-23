"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type {
  CartItem,
  MenuCategory,
  MenuItem,
  Order,
  OrderStatus,
  Table,
  TableStatus,
  TrafficLevel,
} from "@/app/components/demo-provider";

export const orderLabels: Record<OrderStatus, string> = {
  recibido: "Pedido recibido",
  preparacion: "En preparacion",
  horno: "En horno",
  listo: "Listo para entregar",
  servido: "Entregado",
};

export const tableLabels: Record<TableStatus, string> = {
  disponible: "Disponible",
  ocupada: "Ocupada",
  reservada: "Reservada",
  en_atencion: "En atencion",
};

export const categoryLabels: Record<MenuCategory, string> = {
  pizzas: "Pizzas",
  bebidas: "Bebidas",
  extras: "Extras",
};

export const trafficLabels: Record<TrafficLevel, string> = {
  tranquilo: "Dia tranquilo",
  concurrido: "Dia concurrido",
  alta: "Alta demanda",
};

export function SectionCard({
  title,
  eyebrow,
  children,
  action,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="hud-panel panel-enter px-5 py-5 sm:px-6 sm:py-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-slate-300">{eyebrow}</p>
          <h2 className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.08em] text-white sm:text-5xl">
            {title}
          </h2>
        </div>
        {action}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function KpiStrip({
  items,
}: {
  items: Array<{ label: string; value: string | number }>;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <div key={item.label} className="module-card panel-enter" style={{ ["--i" as string]: index }}>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">{item.label}</p>
          <p className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function StatusChip({
  label,
  tone,
}: {
  label: string;
  tone: "cyan" | "yellow" | "white" | "rose" | "emerald";
}) {
  const tones = {
    cyan: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
    yellow: "border-yellow-300/35 bg-yellow-300/10 text-yellow-100",
    white: "border-white/20 bg-white/10 text-white",
    rose: "border-rose-300/35 bg-rose-300/12 text-rose-100",
    emerald: "border-emerald-300/35 bg-emerald-300/12 text-emerald-100",
  };

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] ${tones[tone]}`}>
      {label}
    </span>
  );
}

export function TopInfoBar({
  guestName,
  points,
  tableName,
  orderLabel,
}: {
  guestName: string;
  points: number;
  tableName?: string | null;
  orderLabel?: string | null;
}) {
  return (
    <div className="hud-panel top-strip px-4 py-3">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="info-chip">
          <span className="info-chip-label">Invitado</span>
          <span className="info-chip-value">{guestName || "Sin nombre"}</span>
        </div>
        <div className="info-chip">
          <span className="info-chip-label">Mesa</span>
          <span className="info-chip-value">{tableName || "Sin elegir"}</span>
        </div>
        <div className="info-chip">
          <span className="info-chip-label">Puntos</span>
          <span className="info-chip-value">{points} pts</span>
        </div>
        <div className="info-chip">
          <span className="info-chip-label">Estado</span>
          <span className="info-chip-value">{orderLabel || "Sin pedido"}</span>
        </div>
      </div>
    </div>
  );
}

type RewardItem = {
  id: string;
  name: string;
  cost: number;
  bonus: string;
  note: string;
};

const REWARDS: RewardItem[] = [
  { id: "r1", name: "Descuento ligero", cost: 200, bonus: "- proxima compra", note: "200 puntos: descuento pequeno para una proxima compra." },
  { id: "r2", name: "Descuento mayor", cost: 300, bonus: "- mas ahorro", note: "300 puntos: descuento mayor para una proxima compra." },
];

export function RewardsPanel({ points }: { points: number }) {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(REWARDS[0].id);
  const selectedReward = useMemo(
    () => REWARDS.find((reward) => reward.id === selectedId) ?? REWARDS[0],
    [selectedId],
  );

  return (
    <>
      <button type="button" className="action-pill action-pill-secondary w-full sm:w-auto bg-[rgba(20,36,86,0.85)] text-cyan-100" onClick={() => setOpen(true)}>
        Ver recompensas
      </button>
      {open ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4 backdrop-blur-[2px]">
          <div className="reward-panel w-full max-w-5xl overflow-hidden border border-cyan-300/25 bg-[linear-gradient(140deg,_rgba(11,20,60,0.98),_rgba(8,13,35,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
            <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="relative overflow-hidden border-r border-white/10 bg-[linear-gradient(180deg,_rgba(5,14,53,0.95),_rgba(7,12,31,0.95))] px-5 py-6">
                <p className="font-display text-6xl uppercase leading-none tracking-[0.08em] text-white">Premios</p>
                <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
                  Mientras esperas acumulas puntos y desbloqueas mejoras para tu siguiente visita.
                </p>
                <div className="mt-6 rounded-sm border border-cyan-300/20 bg-white/5 px-4 py-3">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Saldo actual</p>
                  <p className="mt-2 font-display text-5xl uppercase leading-none tracking-[0.08em] text-cyan-100">{points} pts</p>
                </div>
                <div className="mt-6 space-y-2">
                  {REWARDS.map((reward, index) => {
                    const active = reward.id === selectedId;

                    return (
                      <button
                        key={reward.id}
                        type="button"
                        onClick={() => setSelectedId(reward.id)}
                        className={`reward-row ${active ? "reward-row-active" : ""}`}
                        style={{ ["--i" as string]: index }}
                      >
                        <div className="flex-1 text-left">
                          <p className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-white sm:text-4xl">{reward.name}</p>
                          <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan-100/80">
                            {reward.bonus}
                          </p>
                        </div>
                        <span className="rounded-full bg-black/80 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-white sm:text-sm">
                          {reward.cost}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative overflow-hidden px-6 py-6">
                <div className="absolute inset-y-0 right-0 w-2/5 bg-[linear-gradient(120deg,_transparent_0%,_rgba(117,239,255,0.14)_45%,_transparent_85%)]" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Recompensa seleccionada</p>
                    <p className="mt-2 font-display text-5xl uppercase leading-none tracking-[0.08em] text-white sm:text-6xl">
                      {selectedReward.name}
                    </p>
                  </div>
                  <button type="button" className="action-pill action-pill-primary bg-white text-slate-950" onClick={() => setOpen(false)}>
                    Cerrar
                  </button>
                </div>

                <div className="mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="module-card min-h-56">
                    <p className="font-display text-5xl uppercase leading-none tracking-[0.08em] text-cyan-100">
                      {selectedReward.cost} pts
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{selectedReward.note}</p>
                    <div className="mt-6 rounded-sm border border-white/10 bg-black/20 px-4 py-4">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Estado del canje</p>
                      <p className="mt-2 font-display text-3xl uppercase leading-none tracking-[0.08em] text-white sm:text-4xl">
                        Proximamente
                      </p>
                    </div>
                  </div>
                  <div className="module-card min-h-56">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Descripcion</p>
                    <p className="mt-3 text-base leading-7 text-slate-200">
                      Un panel de recompensas pensado para la sala de espera: claro, rapido de explicar y facil de mostrar en presentacion.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <StatusChip label={points >= selectedReward.cost ? "Ya puedes aspirar al premio" : "Sigue acumulando"} tone={points >= selectedReward.cost ? "emerald" : "yellow"} />
                      <StatusChip label="Canje disponible proximamente" tone="white" />
                      <button
                        type="button"
                        disabled
                        className="action-pill action-pill-primary cursor-not-allowed opacity-50 bg-white text-slate-950"
                      >
                        Canjear
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function tableTone(status: TableStatus) {
  switch (status) {
    case "disponible":
      return "emerald";
    case "ocupada":
      return "rose";
    case "reservada":
      return "yellow";
    case "en_atencion":
      return "cyan";
  }
}

export function orderTone(status: OrderStatus) {
  switch (status) {
    case "recibido":
      return "white";
    case "preparacion":
      return "cyan";
    case "horno":
      return "yellow";
    case "listo":
      return "emerald";
    case "servido":
      return "rose";
  }
}

export function TableCard({
  table,
  action,
  selected,
}: {
  table: Table;
  action?: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <article className={`module-card ${selected ? "border-cyan-300/45" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">{table.name}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Capacidad para {table.capacity} personas</p>
        </div>
        <StatusChip label={tableLabels[table.status]} tone={tableTone(table.status)} />
      </div>
      {action ? <div className="mt-5">{action}</div> : null}
    </article>
  );
}

export function PrimaryButton({
  children,
  href,
  disabled,
  onClick,
  variant = "solid",
}: {
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: "solid" | "ghost";
}) {
  const className = `action-pill ${
    variant === "solid"
      ? "action-pill-primary bg-white text-slate-950"
      : "action-pill-secondary bg-[rgba(20,36,86,0.85)] text-cyan-100"
  } ${disabled ? "pointer-events-none opacity-40" : ""}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export function OrderProgress({ status, compact = false }: { status: OrderStatus; compact?: boolean }) {
  const steps: OrderStatus[] = ["recibido", "preparacion", "horno", "listo", "servido"];
  const activeIndex = steps.indexOf(status);

  if (compact) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {steps.map((step, index) => {
            const done = index < activeIndex;
            const current = index === activeIndex;

            return (
              <div key={step} className="space-y-2">
                <div
                  className={`h-2.5 w-full rounded-full transition-colors duration-200 ${
                    done
                      ? "bg-cyan-300 shadow-[0_0_18px_rgba(115,242,255,0.42)]"
                      : current
                        ? "status-pulse bg-yellow-300"
                        : "bg-white/12"
                  }`}
                />
                <p className={`font-mono text-[0.58rem] uppercase tracking-[0.16em] ${current ? "text-white" : "text-slate-400"}`}>
                  {orderLabels[step]}
                </p>
              </div>
            );
          })}
        </div>
        <p className="font-display text-3xl uppercase leading-none tracking-[0.07em] text-cyan-100 sm:text-4xl">
          {orderLabels[status]}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const done = index < activeIndex;
        const current = index === activeIndex;

        return (
          <div key={step} className="flex items-center gap-4">
            <div
              className={`h-4 w-4 border-2 transition-colors duration-200 ${
                done
                  ? "border-cyan-300 bg-cyan-300"
                  : current
                    ? "status-pulse border-yellow-300 bg-yellow-300"
                    : "border-white/25 bg-transparent"
              }`}
            />
            <div className="flex-1 border-b border-dashed border-white/10 pb-3">
              <div className="flex items-end justify-between gap-3">
                <p className="font-display text-3xl uppercase tracking-[0.06em] text-white">{orderLabels[step]}</p>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-slate-400">
                  {index + 1}/5
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CartSummary({
  cart,
  menu,
  onAdd,
  onDecrease,
  onRemove,
}: {
  cart: CartItem[];
  menu: MenuItem[];
  onAdd?: (itemId: string) => void;
  onDecrease?: (itemId: string) => void;
  onRemove?: (itemId: string) => void;
}) {
  const total = cart.reduce((sum, cartItem) => {
    const item = menu.find((product) => product.id === cartItem.itemId);
    return sum + (item?.price ?? 0) * cartItem.quantity;
  }, 0);

  return (
    <div className="space-y-4">
      {cart.length === 0 ? (
        <div className="module-card">
          <p className="font-display text-3xl uppercase tracking-[0.06em] text-white">Sin productos</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">Agrega una pizza o una bebida para activar el pedido demo.</p>
        </div>
      ) : null}

      {cart.map((cartItem) => {
        const item = menu.find((product) => product.id === cartItem.itemId);
        if (!item) return null;

        return (
          <article key={cartItem.itemId} className="module-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-white">
                  {item.name}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
              </div>
              <p className="font-display text-3xl uppercase leading-none tracking-[0.06em] text-cyan-100">
                S/ {item.price * cartItem.quantity}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-white">
                Cantidad {cartItem.quantity}
              </span>
              {onDecrease ? (
                <button type="button" className="action-pill bg-[rgba(20,36,86,0.85)] text-cyan-100" onClick={() => onDecrease(cartItem.itemId)}>
                  Quitar uno
                </button>
              ) : null}
              {onAdd ? (
                <button type="button" className="action-pill bg-[rgba(20,36,86,0.85)] text-cyan-100" onClick={() => onAdd(cartItem.itemId)}>
                  Agregar uno
                </button>
              ) : null}
              {onRemove ? (
                <button type="button" className="action-pill bg-[rgba(255,255,255,0.88)] text-slate-950" onClick={() => onRemove(cartItem.itemId)}>
                  Eliminar
                </button>
              ) : null}
            </div>
          </article>
        );
      })}

      <div className="rounded-sm border border-white/10 bg-black/20 px-4 py-4">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Total simulado</p>
        <p className="mt-2 font-display text-5xl uppercase leading-none tracking-[0.08em] text-white">S/ {total}</p>
      </div>
    </div>
  );
}

export function OrderCard({
  order,
  table,
  menu,
  action,
}: {
  order: Order;
  table?: Table;
  menu: MenuItem[];
  action?: React.ReactNode;
}) {
  return (
    <article className="module-card">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-display text-4xl uppercase leading-none tracking-[0.08em] text-white">{order.id}</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {table?.name ?? "Mesa desconocida"} / registrado a las {order.createdAt} / ETA {order.etaMinutes} min
          </p>
        </div>
        <StatusChip label={orderLabels[order.status]} tone={orderTone(order.status)} />
      </div>

      <div className="mt-5 space-y-3">
        {order.items.map((orderItem) => {
          const item = menu.find((product) => product.id === orderItem.itemId);

          return (
            <div key={`${order.id}-${orderItem.itemId}`} className="flex items-center justify-between gap-3 border-b border-dashed border-white/10 pb-3">
              <p className="text-sm leading-6 text-slate-200">{item?.name ?? orderItem.itemId}</p>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-slate-300">
                x{orderItem.quantity}
              </span>
            </div>
          );
        })}
      </div>

      {action ? <div className="mt-5">{action}</div> : null}
    </article>
  );
}
