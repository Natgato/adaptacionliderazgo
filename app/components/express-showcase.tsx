"use client";

import { useState } from "react";
import { AmbientBlueprint } from "@/app/components/ambient-blueprint";

const forecast = [
  {
    id: "18:30",
    hour: "18:30",
    traffic: "Alta",
    capacity: 92,
    wait: "32 min",
    action: "Reserva o entra a sala virtual",
  },
  {
    id: "20:00",
    hour: "20:00",
    traffic: "Pico",
    capacity: 98,
    wait: "46 min",
    action: "Usa el turno remoto y pedido previo",
  },
  {
    id: "21:15",
    hour: "21:15",
    traffic: "Media",
    capacity: 67,
    wait: "14 min",
    action: "Conviene llegar ahora",
  },
  {
    id: "22:30",
    hour: "22:30",
    traffic: "Ligera",
    capacity: 38,
    wait: "06 min",
    action: "Ingreso casi inmediato",
  },
];

const timeline = [
  {
    phase: "Antes de salir",
    title: "Afluencia predictiva",
    copy: "El cliente revisa si el local esta lleno, compara franjas horarias y decide si reservar o pedir para llevar.",
  },
  {
    phase: "Ingreso",
    title: "Reserva o sala virtual",
    copy: "Si Express esta en pico, el turno remoto ordena la fila y devuelve una hora realista de ingreso.",
  },
  {
    phase: "Pedido",
    title: "QR con avance en vivo",
    copy: "Cada orden genera un QR demo con estados, ETA, prioridad de cocina y alertas de retiro.",
  },
  {
    phase: "Espera",
    title: "Minijuego y puntos",
    copy: "Mientras espera, el usuario acumula puntos de cortesia y desbloquea descuentos para una siguiente visita.",
  },
];

const roles = [
  {
    id: "cliente",
    label: "Cliente",
    badge: "01",
    mission: "Decidir si conviene ir, reservar sin llamar y seguir su pizza sin incertidumbre.",
    actions: ["Ver afluencia en tiempo real", "Reservar mesa o turno", "Seguir pedido con QR", "Entrar al minijuego de puntos"],
    metrics: ["Prediccion por hora", "Tiempo estimado", "Estado del pedido", "Beneficios en espera"],
  },
  {
    id: "caja",
    label: "Caja",
    badge: "02",
    mission: "Confirmar pagos, emitir QR y ordenar el flujo cuando el local entra en hora pico.",
    actions: ["Confirmar reserva", "Emitir QR del pedido", "Mostrar SLA por ticket", "Priorizar retiro o consumo"],
    metrics: ["Tickets activos", "Pagos pendientes", "Pedidos listos", "Alertas de demora"],
  },
  {
    id: "cocina",
    label: "Cocina",
    badge: "03",
    mission: "Trabajar sobre una cola clara, con prioridades visibles y tiempos de preparacion legibles.",
    actions: ["Ver cola por prioridad", "Cambiar estado del pedido", "Marcar horno y empaque", "Disparar alerta de retiro"],
    metrics: ["Cola actual", "Tiempo por partida", "Pedidos urgentes", "Capacidad de horno"],
  },
  {
    id: "salon",
    label: "Salon",
    badge: "04",
    mission: "Asignar mesas y rotacion sin saturar al personal ni dejar clientes sin informacion.",
    actions: ["Asignar mesa libre", "Liberar mesas", "Gestionar sala virtual", "Actualizar tiempo de espera"],
    metrics: ["Mesas ocupadas", "Mesas por liberar", "Turnos remotos", "Tiempo promedio"],
  },
  {
    id: "delivery",
    label: "Delivery",
    badge: "05",
    mission: "Sincronizar recojo, salida y prioridad con la operacion del local.",
    actions: ["Marcar recojo", "Confirmar ventana de salida", "Reordenar paradas", "Notificar llegada"],
    metrics: ["Retiros listos", "Rutas activas", "Pedidos por salir", "Tiempo de despacho"],
  },
  {
    id: "admin",
    label: "Admin",
    badge: "06",
    mission: "Visualizar picos, decisiones de personal, monetizacion solidaria y salud general del servicio.",
    actions: ["Ver panel de afluencia", "Revisar conversion de reservas", "Monitorear anuncios solidarios", "Comparar SLA por canal"],
    metrics: ["Pico del dia", "Reservas confirmadas", "Fondos solidarios", "NPS estimado"],
  },
];

const orderStates = [
  { label: "Confirmado", state: "done" },
  { label: "En cocina", state: "done" },
  { label: "Horno", state: "current" },
  { label: "Empaque", state: "upcoming" },
  { label: "Retiro", state: "upcoming" },
];

export function ExpressShowcase() {
  const [activeRole, setActiveRole] = useState("cliente");
  const [activeForecast, setActiveForecast] = useState("20:00");
  const currentRole = roles.find((role) => role.id === activeRole) ?? roles[0];
  const currentForecast = forecast.find((slot) => slot.id === activeForecast) ?? forecast[1];

  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(62,133,255,0.18),_transparent_38%),linear-gradient(160deg,_rgba(5,10,28,0.98)_0%,_rgba(3,7,20,0.94)_48%,_rgba(0,0,0,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(140deg,_transparent_0%,_transparent_44%,_rgba(47,104,255,0.1)_44%,_rgba(47,104,255,0.12)_63%,_transparent_63%),linear-gradient(180deg,_rgba(121,235,255,0.08),_transparent_28%)]" />
      <AmbientBlueprint />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pb-16 pt-5 sm:px-6 lg:px-10">
        <header className="hud-panel flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-end gap-4">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-cyan-200/80">Express / Rush hour UI demo</p>
              <h1 className="font-display text-5xl uppercase leading-none tracking-[0.08em] text-white sm:text-6xl">Express</h1>
            </div>
            <div className="hidden h-14 w-px bg-white/15 md:block" />
            <p className="max-w-sm text-sm leading-6 text-slate-200/82">
              Un MVP frontend para una pizzeria que reduce incertidumbre antes, durante y despues del pedido.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-right sm:grid-cols-4">
            {[
              ["Modo", "Solo frontend"],
              ["Deploy", "Vercel ready"],
              ["Pico", "20:00"],
              ["Solidario", "Ads activos"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-sm border border-white/10 bg-white/5 px-3 py-2">
                <p className="font-mono text-[0.63rem] uppercase tracking-[0.28em] text-slate-300">{label}</p>
                <p className="font-display text-2xl uppercase leading-none tracking-[0.06em] text-cyan-100">{value}</p>
              </div>
            ))}
          </div>
        </header>

        <main className="mt-6 space-y-6">
          <section className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="hud-panel slant-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
              <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.4em] text-cyan-200/85">Persona 3 inspired service flow</p>
                    <h2 className="font-display text-[4.4rem] uppercase leading-[0.82] tracking-[0.05em] text-white sm:text-[6.8rem]">
                      Dark hour for rush hour
                    </h2>
                    <p className="max-w-xl text-base leading-7 text-slate-200/86 sm:text-lg">
                      Express convierte la hora mas pesada del local en una experiencia visible, ordenada y jugable:
                      predice la afluencia, ofrece reserva o turno remoto, muestra el progreso del pedido y suma puntos
                      mientras el cliente espera.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a href="#roles" className="action-pill bg-white text-slate-950">
                      Ver accesos por usuario
                    </a>
                    <a href="#journey" className="action-pill bg-[rgba(20,36,86,0.85)] text-cyan-100">
                      Revisar procesos del MVP
                    </a>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      ["98%", "Afluencia maxima simulada"],
                      ["46 min", "Espera pico visible antes de salir"],
                      ["S/ 312", "Fondos solidarios del demo"],
                    ].map(([value, label]) => (
                      <div key={label} className="border-l-2 border-cyan-300/80 bg-black/25 px-4 py-2">
                        <p className="font-display text-4xl uppercase leading-none tracking-[0.06em] text-white">{value}</p>
                        <p className="mt-1 text-sm leading-5 text-slate-300">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative flex min-h-[24rem] flex-col justify-between">
                  <div className="absolute right-0 top-0 h-full w-full bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(255,255,255,0.01)),linear-gradient(135deg,_transparent_0%,_transparent_20%,_rgba(87,223,255,0.22)_20%,_rgba(87,223,255,0.04)_40%,_transparent_40%)]" />
                  <div className="relative">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300">Signature element</p>
                    <div className="mt-3 flex items-end gap-3">
                      <span className="font-display text-[7rem] uppercase leading-none tracking-[0.02em] text-electric">E</span>
                      <div className="pb-4">
                        <p className="font-display text-5xl uppercase leading-none tracking-[0.12em] text-white">Express Signal</p>
                        <p className="mt-3 max-w-xs text-sm leading-6 text-slate-300">
                          Una pantalla diagonal que mezcla tablero operativo, afiche y HUD para que la marca se sienta como un sistema vivo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative space-y-3 self-end">
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-cyan-200/80">Role jump</p>
                    <div className="grid gap-2">
                      {roles.map((role) => (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setActiveRole(role.id)}
                          className={`role-tab ${activeRole === role.id ? "role-tab-active" : ""}`}
                        >
                          <span className="font-mono text-xs tracking-[0.25em] text-cyan-100/80">{role.badge}</span>
                          <span className="font-display text-3xl uppercase tracking-[0.09em]">{role.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero-wordmark">EXPRESS</div>
            </div>

            <aside className="grid gap-6">
              <div className="hud-panel slant-reverse px-5 py-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300">Rush forecast</p>
                <div className="mt-3 space-y-3">
                  {forecast.map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setActiveForecast(slot.id)}
                      className={`forecast-row ${activeForecast === slot.id ? "forecast-row-active" : ""}`}
                    >
                      <span className="font-display text-3xl uppercase tracking-[0.08em]">{slot.hour}</span>
                      <span className="text-right">
                        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.22em] text-slate-300">ocupacion</span>
                        <span className="font-display text-3xl uppercase leading-none">{slot.capacity}%</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="hud-panel px-5 py-5">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300">Selected window</p>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-6xl uppercase leading-none tracking-[0.08em] text-white">{currentForecast.hour}</p>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">{currentForecast.action}</p>
                  </div>
                  <div className="flex h-18 w-18 items-center justify-center rounded-full border-4 border-yellow-300/90 bg-[radial-gradient(circle,_rgba(255,234,104,0.95)_0%,_rgba(255,234,104,0.95)_28%,_rgba(13,17,34,1)_30%,_rgba(13,17,34,1)_62%,_rgba(255,255,255,0.95)_64%,_transparent_66%)]" />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-sm border border-cyan-300/20 bg-white/5 px-3 py-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-slate-300">Intensidad</p>
                    <p className="font-display text-3xl uppercase tracking-[0.08em] text-cyan-100">{currentForecast.traffic}</p>
                  </div>
                  <div className="rounded-sm border border-cyan-300/20 bg-white/5 px-3 py-3">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-slate-300">Espera estimada</p>
                    <p className="font-display text-3xl uppercase tracking-[0.08em] text-white">{currentForecast.wait}</p>
                  </div>
                </div>
              </div>
            </aside>
          </section>

          <section id="journey" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="hud-panel px-6 py-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300">Customer journey</p>
                  <h3 className="font-display text-5xl uppercase leading-none tracking-[0.08em] text-white">Del mapa a la pizza</h3>
                </div>
                <p className="max-w-xs text-sm leading-6 text-slate-300">
                  La propuesta integra prediccion, transparencia y entretenimiento desde antes de llegar al local.
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {timeline.map((item) => (
                  <article key={item.phase} className="module-card">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-cyan-200/80">{item.phase}</p>
                    <h4 className="mt-2 font-display text-4xl uppercase leading-none tracking-[0.07em] text-white">{item.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="hud-panel px-6 py-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300">Pedido demo</p>
              <h3 className="mt-2 font-display text-5xl uppercase leading-none tracking-[0.08em] text-white">QR tracking</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
                El MVP muestra una barra por estados para que el cliente sepa exactamente donde esta su orden.
              </p>

              <div className="mt-6 space-y-4">
                {orderStates.map((state, index) => (
                  <div key={state.label} className="flex items-center gap-4">
                    <div
                      className={`h-4 w-4 border-2 ${
                        state.state === "done"
                          ? "border-cyan-300 bg-cyan-300"
                          : state.state === "current"
                            ? "border-yellow-300 bg-yellow-300"
                            : "border-white/25 bg-transparent"
                      }`}
                    />
                    <div className="flex-1 border-b border-dashed border-white/10 pb-3">
                      <div className="flex items-end justify-between gap-3">
                        <p className="font-display text-3xl uppercase tracking-[0.06em] text-white">{state.label}</p>
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-slate-400">
                          {index + 1}/5
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-sm border border-yellow-300/30 bg-[linear-gradient(135deg,_rgba(255,226,77,0.08),_rgba(255,255,255,0.02))] px-4 py-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-yellow-200/80">Estado actual</p>
                <p className="mt-1 font-display text-4xl uppercase leading-none tracking-[0.08em] text-yellow-100">Horno / 08 min</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">Cuando pase a empaque, la app activa una alerta y muestra el modulo de retiro.</p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
            <div className="hud-panel px-6 py-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300">Features del MVP</p>
              <h3 className="mt-2 font-display text-5xl uppercase leading-none tracking-[0.08em] text-white">Sistema integral</h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Sala virtual", "Ordena la fila cuando el salon se llena y devuelve una espera legible."],
                  ["Reserva de mesa", "Permite asegurar espacio y evitar viajes en vano durante la hora critica."],
                  ["QR del pedido", "Hace visible el progreso y reduce consultas repetidas al personal."],
                  ["Minijuego", "Transforma la espera en una actividad ligera con puntos y recompensas."],
                  ["Prediccion de afluencia", "Anticipa picos por hora y ayuda a decidir si conviene ir o no."],
                  ["Ads solidarios", "Monetiza pantallas y destina una parte a una causa social."],
                ].map(([title, copy]) => (
                  <article key={title} className="module-card min-h-40">
                    <h4 className="font-display text-4xl uppercase leading-none tracking-[0.07em] text-white">{title}</h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="hud-panel px-6 py-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300">Mini game loop</p>
                    <h3 className="font-display text-5xl uppercase leading-none tracking-[0.08em] text-white">Wait and win</h3>
                  </div>
                  <p className="max-w-xs text-sm leading-6 text-slate-300">
                    La espera deja de sentirse muerta: cada minuto puede sumar un beneficio y sostener la atencion.
                  </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative overflow-hidden rounded-sm border border-cyan-300/20 bg-[linear-gradient(160deg,_rgba(22,45,125,0.95)_0%,_rgba(8,18,53,0.95)_100%)] px-4 py-5">
                    <div className="absolute inset-y-0 right-0 w-2/5 bg-[linear-gradient(120deg,_transparent_0%,_rgba(117,239,255,0.14)_45%,_transparent_85%)]" />
                    <p className="font-display text-6xl uppercase leading-none tracking-[0.08em] text-white">Combo chain</p>
                    <p className="mt-3 max-w-sm text-sm leading-6 text-slate-200">
                      Un minijuego rapido, pensado para movil, que entrega puntos por reflejos y canjea beneficios en caja.
                    </p>
                    <div className="mt-6 flex gap-3">
                      {["Puntos +120", "Cupon listo", "Sesion 02:14"].map((chip) => (
                        <span key={chip} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-cyan-100">
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-sm border border-white/10 bg-black/20 px-4 py-5">
                    <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-slate-300">Solidarity stream</p>
                    <div className="mt-3 space-y-4">
                      <div>
                        <p className="font-display text-5xl uppercase leading-none tracking-[0.08em] text-yellow-100">S/ 312</p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">Fondos simulados enviados a una organizacion aliada del barrio.</p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="border border-white/10 px-3 py-3">
                          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Impresiones</p>
                          <p className="font-display text-3xl uppercase tracking-[0.06em] text-white">18.4k</p>
                        </div>
                        <div className="border border-white/10 px-3 py-3">
                          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">CTR</p>
                          <p className="font-display text-3xl uppercase tracking-[0.06em] text-cyan-100">3.9%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="roles" className="hud-panel px-6 py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.3em] text-slate-300">Access by role</p>
                <h3 className="font-display text-5xl uppercase leading-none tracking-[0.08em] text-white">Todos los usuarios, todos los procesos</h3>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                Cada rol del sistema entra por un acceso dedicado, con lenguaje operativo propio y acciones priorizadas para la hora de mayor demanda.
              </p>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveRole(role.id)}
                  className={`role-access ${activeRole === role.id ? "role-access-active" : ""}`}
                >
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-cyan-100/75">{role.badge}</span>
                  <span className="font-display text-3xl uppercase leading-none tracking-[0.08em]">{role.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
              <article className="slant-panel border border-cyan-300/20 bg-[linear-gradient(150deg,_rgba(18,38,102,0.95)_0%,_rgba(7,14,43,0.95)_100%)] px-5 py-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-cyan-100/75">Portal activo</p>
                <h4 className="mt-2 font-display text-6xl uppercase leading-none tracking-[0.08em] text-white">{currentRole.label}</h4>
                <p className="mt-4 text-sm leading-7 text-slate-200">{currentRole.mission}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {currentRole.metrics.map((metric) => (
                    <div key={metric} className="rounded-sm border border-white/10 bg-black/20 px-3 py-3">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Metric</p>
                      <p className="mt-1 font-display text-3xl uppercase leading-none tracking-[0.06em] text-white">{metric}</p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="module-card">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-slate-300">Procesos clave</p>
                  <div className="mt-4 space-y-3">
                    {currentRole.actions.map((action) => (
                      <div key={action} className="flex items-start gap-3 border-b border-dashed border-white/10 pb-3 last:border-b-0 last:pb-0">
                        <span className="mt-1 h-2.5 w-2.5 rotate-45 bg-cyan-300" />
                        <p className="text-sm leading-6 text-slate-200">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="module-card">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.25em] text-slate-300">Vista demo</p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-sm border border-white/10 bg-black/20 px-3 py-3">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-slate-300">Flujo</p>
                      <p className="mt-1 font-display text-4xl uppercase leading-none tracking-[0.06em] text-white">
                        {currentRole.label} / operativo
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">
                      Este acceso puede crecer luego hacia dashboards reales, auth por rol y estados conectados a backend sin rehacer la experiencia visual.
                    </p>
                    <a href="#top" className="action-pill w-fit bg-[rgba(255,255,255,0.88)] text-slate-950">
                      Volver arriba
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
