"use client";

import Link from "next/link";
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
  listo: "Listo",
  servido: "Servido",
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
    <section className="hud-panel px-5 py-5 sm:px-6 sm:py-6">
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
      {items.map((item) => (
        <div key={item.label} className="module-card">
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
    variant === "solid" ? "bg-white text-slate-950" : "bg-[rgba(20,36,86,0.85)] text-cyan-100"
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

export function OrderProgress({ status }: { status: OrderStatus }) {
  const steps: OrderStatus[] = ["recibido", "preparacion", "horno", "listo", "servido"];
  const activeIndex = steps.indexOf(status);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const done = index < activeIndex;
        const current = index === activeIndex;

        return (
          <div key={step} className="flex items-center gap-4">
            <div
              className={`h-4 w-4 border-2 ${
                done
                  ? "border-cyan-300 bg-cyan-300"
                  : current
                    ? "border-yellow-300 bg-yellow-300"
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

        if (!item) {
          return null;
        }

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
            {table?.name ?? "Mesa desconocida"} · registrado a las {order.createdAt} · ETA {order.etaMinutes} min
          </p>
        </div>
        <StatusChip label={orderLabels[order.status]} tone={orderTone(order.status)} />
      </div>

      <div className="mt-5 space-y-3">
        {order.items.map((orderItem) => {
          const item = menu.find((product) => product.id === orderItem.itemId);

          return (
            <div key={`${order.id}-${orderItem.itemId}`} className="flex items-center justify-between gap-3 border-b border-dashed border-white/10 pb-3">
              <p className="text-sm leading-6 text-slate-200">
                {item?.name ?? orderItem.itemId}
              </p>
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
