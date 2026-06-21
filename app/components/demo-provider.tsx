"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type TrafficLevel = "tranquilo" | "concurrido" | "alta";
export type TableStatus = "disponible" | "ocupada" | "reservada" | "en_atencion";
export type OrderStatus = "recibido" | "preparacion" | "horno" | "listo" | "servido";
export type MenuCategory = "pizzas" | "bebidas" | "extras";

export type Table = {
  id: string;
  name: string;
  capacity: number;
  status: TableStatus;
};

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
};

export type CartItem = {
  itemId: string;
  quantity: number;
};

export type Order = {
  id: string;
  tableId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  etaMinutes: number;
  status: OrderStatus;
};

type DemoState = {
  trafficLevel: TrafficLevel;
  tables: Table[];
  menu: MenuItem[];
  orders: Order[];
  guestName: string;
  rewardPoints: number;
  selectedTableId: string | null;
  cart: CartItem[];
  lastOrderId: string | null;
};

type DemoStats = {
  activeOrders: number;
  tablesAvailable: number;
  tablesOccupied: number;
  ordersInPreparation: number;
  ordersInOven: number;
  ordersReady: number;
  averageEta: number;
};

type DemoContextValue = {
  state: DemoState;
  stats: DemoStats;
  selectedTable: Table | null;
  lastOrder: Order | null;
  setGuestName: (name: string) => void;
  addRewardPoints: (amount: number) => void;
  reserveTable: (tableId: string) => void;
  updateTableStatus: (tableId: string, status: TableStatus) => void;
  addToCart: (itemId: string) => void;
  decreaseCartItem: (itemId: string) => void;
  removeCartItem: (itemId: string) => void;
  clearCart: () => void;
  completePayment: () => string | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  resetClientFlow: () => void;
  getMenuItem: (itemId: string) => MenuItem | undefined;
  getOrderTable: (tableId: string) => Table | undefined;
};

const STORAGE_KEY = "pizza-express-demo-state-v3";
const ORDER_FLOW: OrderStatus[] = ["recibido", "preparacion", "horno", "listo", "servido"];

const MENU_ITEMS: MenuItem[] = [
  {
    id: "pizza-margherita",
    name: "Margherita Signal",
    category: "pizzas",
    description: "Salsa de tomate, mozzarella y albahaca fresca.",
    price: 32,
  },
  {
    id: "pizza-pepperoni",
    name: "Pepperoni Overdrive",
    category: "pizzas",
    description: "Pepperoni crocante y doble queso.",
    price: 38,
  },
  {
    id: "pizza-andina",
    name: "Andina Express",
    category: "pizzas",
    description: "Chorizo, cebolla morada y aji suave.",
    price: 40,
  },
  {
    id: "pizza-veggie",
    name: "Veggie Neon",
    category: "pizzas",
    description: "Pimientos, aceitunas, champinones y tomate cherry.",
    price: 35,
  },
  {
    id: "gaseosa",
    name: "Gaseosa Helada",
    category: "bebidas",
    description: "Botella personal.",
    price: 7,
  },
  {
    id: "limonada",
    name: "Limonada de la Casa",
    category: "bebidas",
    description: "Vaso grande con hierbabuena.",
    price: 9,
  },
  {
    id: "agua",
    name: "Agua Mineral",
    category: "bebidas",
    description: "Botella sin gas.",
    price: 5,
  },
  {
    id: "bordes",
    name: "Borde de Queso",
    category: "extras",
    description: "Extra de borde relleno.",
    price: 8,
  },
  {
    id: "salsa",
    name: "Dip Picante",
    category: "extras",
    description: "Salsa de la casa.",
    price: 4,
  },
  {
    id: "postre",
    name: "Mini Brownie",
    category: "extras",
    description: "Postre rapido para cerrar la noche.",
    price: 10,
  },
];

function createInitialTables(): Table[] {
  return [
    { id: "m1", name: "Mesa 1", capacity: 2, status: "disponible" },
    { id: "m2", name: "Mesa 2", capacity: 2, status: "ocupada" },
    { id: "m3", name: "Mesa 3", capacity: 4, status: "reservada" },
    { id: "m4", name: "Mesa 4", capacity: 4, status: "disponible" },
    { id: "m5", name: "Mesa 5", capacity: 6, status: "ocupada" },
    { id: "m6", name: "Mesa 6", capacity: 2, status: "disponible" },
    { id: "m7", name: "Mesa 7", capacity: 4, status: "en_atencion" },
    { id: "m8", name: "Mesa 8", capacity: 6, status: "disponible" },
  ];
}

function createInitialOrders(): Order[] {
  return [
    {
      id: "PED-201",
      tableId: "m2",
      items: [
        { itemId: "pizza-pepperoni", quantity: 1 },
        { itemId: "gaseosa", quantity: 2 },
      ],
      total: 52,
      createdAt: "19:05",
      etaMinutes: 14,
      status: "preparacion",
    },
    {
      id: "PED-202",
      tableId: "m5",
      items: [
        { itemId: "pizza-andina", quantity: 1 },
        { itemId: "bordes", quantity: 1 },
      ],
      total: 48,
      createdAt: "19:12",
      etaMinutes: 9,
      status: "horno",
    },
    {
      id: "PED-203",
      tableId: "m7",
      items: [
        { itemId: "pizza-margherita", quantity: 1 },
        { itemId: "limonada", quantity: 1 },
      ],
      total: 41,
      createdAt: "19:18",
      etaMinutes: 3,
      status: "listo",
    },
  ];
}

function computeTrafficLevel(tables: Table[], orders: Order[]): TrafficLevel {
  const busyTables = tables.filter((table) => table.status !== "disponible").length;
  const activeOrders = orders.filter((order) => order.status !== "servido").length;
  const pressure = busyTables + activeOrders;

  if (pressure >= 10) return "alta";
  if (pressure >= 6) return "concurrido";
  return "tranquilo";
}

function createInitialState(): DemoState {
  const tables = createInitialTables();
  const orders = createInitialOrders();

  return {
    trafficLevel: computeTrafficLevel(tables, orders),
    tables,
    menu: MENU_ITEMS,
    orders,
    guestName: "",
    rewardPoints: 0,
    selectedTableId: null,
    cart: [],
    lastOrderId: null,
  };
}

function loadState(): DemoState {
  if (typeof window === "undefined") {
    return createInitialState();
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored ? (JSON.parse(stored) as DemoState) : createInitialState();
}

function calculateTotal(cart: CartItem[], menu: MenuItem[]) {
  return cart.reduce((sum, cartItem) => {
    const product = menu.find((item) => item.id === cartItem.itemId);
    return sum + (product?.price ?? 0) * cartItem.quantity;
  }, 0);
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(loadState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const stats = useMemo<DemoStats>(() => {
    const activeOrders = state.orders.filter((order) => order.status !== "servido");
    const tablesAvailable = state.tables.filter((table) => table.status === "disponible").length;
    const tablesOccupied = state.tables.filter((table) => table.status === "ocupada").length;
    const ordersInPreparation = state.orders.filter((order) => order.status === "preparacion").length;
    const ordersInOven = state.orders.filter((order) => order.status === "horno").length;
    const ordersReady = state.orders.filter((order) => order.status === "listo").length;
    const averageEta =
      activeOrders.length > 0
        ? Math.round(activeOrders.reduce((sum, order) => sum + order.etaMinutes, 0) / activeOrders.length)
        : 0;

    return {
      activeOrders: activeOrders.length,
      tablesAvailable,
      tablesOccupied,
      ordersInPreparation,
      ordersInOven,
      ordersReady,
      averageEta,
    };
  }, [state.orders, state.tables]);

  const selectedTable = state.tables.find((table) => table.id === state.selectedTableId) ?? null;
  const lastOrder = state.orders.find((order) => order.id === state.lastOrderId) ?? null;

  const syncTraffic = (tables: Table[], orders: Order[]) => computeTrafficLevel(tables, orders);

  const setGuestName = (name: string) => {
    setState((current) => ({ ...current, guestName: name }));
  };

  const addRewardPoints = (amount: number) => {
    setState((current) => ({ ...current, rewardPoints: current.rewardPoints + amount }));
  };

  const reserveTable = (tableId: string) => {
    setState((current) => {
      const nextTables: Table[] = current.tables.map((table) => {
        if (table.id === current.selectedTableId && table.id !== tableId && table.status === "reservada") {
          return { ...table, status: "disponible" };
        }

        if (table.id === tableId && table.status === "disponible") {
          return { ...table, status: "reservada" };
        }

        return table;
      });

      return {
        ...current,
        tables: nextTables,
        selectedTableId: tableId,
        trafficLevel: syncTraffic(nextTables, current.orders),
      };
    });
  };

  const updateTableStatus = (tableId: string, status: TableStatus) => {
    setState((current) => {
      const nextTables: Table[] = current.tables.map((table) =>
        table.id === tableId ? { ...table, status } : table,
      );

      return {
        ...current,
        tables: nextTables,
        trafficLevel: syncTraffic(nextTables, current.orders),
      };
    });
  };

  const addToCart = (itemId: string) => {
    setState((current) => {
      const found = current.cart.find((item) => item.itemId === itemId);
      const nextCart = found
        ? current.cart.map((item) =>
            item.itemId === itemId ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...current.cart, { itemId, quantity: 1 }];

      return { ...current, cart: nextCart };
    });
  };

  const decreaseCartItem = (itemId: string) => {
    setState((current) => ({
      ...current,
      cart: current.cart
        .map((item) => (item.itemId === itemId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    }));
  };

  const removeCartItem = (itemId: string) => {
    setState((current) => ({
      ...current,
      cart: current.cart.filter((item) => item.itemId !== itemId),
    }));
  };

  const clearCart = () => {
    setState((current) => ({ ...current, cart: [] }));
  };

  const completePayment = () => {
    let orderId: string | null = null;

    setState((current) => {
      if (!current.selectedTableId || current.cart.length === 0) {
        return current;
      }

      orderId = `PED-${204 + current.orders.length}`;

      const nextOrder: Order = {
        id: orderId,
        tableId: current.selectedTableId,
        items: current.cart,
        total: calculateTotal(current.cart, current.menu),
        createdAt: new Date().toLocaleTimeString("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        etaMinutes: 10 + current.cart.reduce((sum, item) => sum + item.quantity * 2, 0),
        status: "recibido",
      };

      const nextOrders = [nextOrder, ...current.orders];
      const nextTables: Table[] = current.tables.map((table) =>
        table.id === current.selectedTableId ? { ...table, status: "ocupada" } : table,
      );

      return {
        ...current,
        orders: nextOrders,
        tables: nextTables,
        cart: [],
        lastOrderId: orderId,
        trafficLevel: syncTraffic(nextTables, nextOrders),
      };
    });

    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setState((current) => {
      const nextOrders: Order[] = current.orders.map((order) => {
        if (order.id !== orderId) return order;

        const nextStatusIndex = ORDER_FLOW.indexOf(status);
        const currentStatusIndex = ORDER_FLOW.indexOf(order.status);

        return {
          ...order,
          status,
          etaMinutes: Math.max(order.etaMinutes - Math.max(nextStatusIndex - currentStatusIndex, 1) * 4, 0),
        };
      });

      const servedOrder = nextOrders.find((order) => order.id === orderId && order.status === "servido");
      const nextTables: Table[] = servedOrder
        ? current.tables.map((table) =>
            table.id === servedOrder.tableId ? { ...table, status: "ocupada" } : table,
          )
        : current.tables;

      return {
        ...current,
        orders: nextOrders,
        tables: nextTables,
        trafficLevel: syncTraffic(nextTables, nextOrders),
      };
    });
  };

  const resetClientFlow = () => {
    setState((current) => {
      const nextTables: Table[] = current.tables.map((table) =>
        table.id === current.selectedTableId && table.status === "reservada"
          ? { ...table, status: "disponible" }
          : table,
      );

      return {
        ...current,
        tables: nextTables,
        guestName: current.guestName,
        rewardPoints: current.rewardPoints,
        selectedTableId: null,
        cart: [],
        lastOrderId: null,
        trafficLevel: syncTraffic(nextTables, current.orders),
      };
    });
  };

  const value: DemoContextValue = {
    state,
    stats,
    selectedTable,
    lastOrder,
    setGuestName,
    addRewardPoints,
    reserveTable,
    updateTableStatus,
    addToCart,
    decreaseCartItem,
    removeCartItem,
    clearCart,
    completePayment,
    updateOrderStatus,
    resetClientFlow,
    getMenuItem: (itemId: string) => state.menu.find((item) => item.id === itemId),
    getOrderTable: (tableId: string) => state.tables.find((table) => table.id === tableId),
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);

  if (!context) {
    throw new Error("useDemo debe usarse dentro de DemoProvider");
  }

  return context;
}
