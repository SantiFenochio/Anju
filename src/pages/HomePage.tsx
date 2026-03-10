import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { openBudgetRequestModal } from '../services/budgetRequest'

const DUST_PARTICLES = Array.from({ length: 18 }, () => ({
  left: Math.round(Math.random() * 100),
  bottom: Math.round(Math.random() * 20),
  size: 2 + Math.random() * 3,
  duration: 7 + Math.random() * 6,
  delay: Math.random() * 5,
}))

const FAMILY_TIMELINE = [
  {
    year: '1990',
    title: 'Inicio del taller',
    description: 'Comenzamos la producción de mobiliario en madera para hogares.',
  },
  {
    year: '2000',
    title: 'Colecciones base',
    description: 'Definimos líneas estables de escritorios, mesas y guardado.',
  },
  {
    year: '2010',
    title: 'Servicios a medida',
    description: 'Formalizamos procesos de diseño y fabricación personalizada.',
  },
  {
    year: '2020',
    title: 'Escalado operativo',
    description: 'Optimizamos producción y control de calidad para más proyectos.',
  },
  {
    year: 'Hoy',
    title: 'Proyectos integrales',
    description: 'Acompañamos de punta a punta a hogares y empresas.',
  },
]

const TRUSTED_LOGOS = [
  'Estudio Norte',
  'Casa Atelier',
  'Oficinas Delta',
  'Locales Rivera',
  'Deco Sur',
  'Galería Central',
  'Hotel Lumen',
  'Retail Origen',
]

export function HomePage() {
  usePageMeta({
    title: 'Carpintería a medida en Villa Ballester, Buenos Aires · ANJU Carpintería',
    description:
      'ANJU Carpintería en Villa Ballester diseña y fabrica muebles de madera y placares a medida para hogares, oficinas y locales en Buenos Aires, CABA y Zona Norte.',
    keywords:
      'carpintería a medida Villa Ballester, muebles de madera Buenos Aires, placares a medida zona norte, muebles a medida CABA',
  })
  const dustParticles = DUST_PARTICLES
  const heroImage = `${import.meta.env.BASE_URL}anju-hero.jpg`
  const heroBadgeRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = heroBadgeRef.current
    if (!target) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          target.classList.add('animate-fade-in', 'opacity-100')
          target.classList.remove('opacity-0')
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-crema to-white">
        <div className="absolute inset-0 pointer-events-none wood-grain opacity-[0.08]" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-18 grid gap-12 md:gap-14 md:grid-cols-2 items-center">
          <div className="relative">
            <div className="absolute -inset-4 sm:-inset-6 rounded-3xl bg-white/80 wood-grain opacity-[0.08] pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-oliva mb-3.5">
                Carpintería familiar · Buenos Aires
              </p>
              <h1 className="heading-h1">
                Carpintería a medida en Villa Ballester para muebles de madera durables
              </h1>
              <p className="mt-5 text-base text-neutral-700 max-w-xl leading-relaxed">
                Diseñamos y construimos muebles a medida y colecciones estándar en
                madera maciza de origen responsable. Atendemos proyectos
                residenciales, oficinas y locales comerciales con terminaciones
                artesanales, estructura sólida y atención cercana.
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center rounded-full border border-oliva/25 bg-oliva/10 px-3 py-1 text-[11px] font-semibold text-oliva">
                  Diseño y fabricación propia
                </span>
                <span className="inline-flex items-center rounded-full border border-madera/20 bg-white/85 px-3 py-1 text-[11px] font-semibold text-madera">
                  Proyectos B2B y clientes finales
                </span>
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/catalogo"
                  className="btn-primary px-5 py-3"
                >
                  Ver catálogo de muebles
                </Link>
                <Link
                  to="/muebles-a-medida"
                  className="btn-secondary px-5 py-3 bg-white/85 shadow-md hover:shadow-lg"
                >
                  Solicitar mueble a medida
                </Link>
              </div>
              <div
                ref={heroBadgeRef}
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-madera/20 bg-white/85 px-3.5 py-1.5 text-[11px] text-madera shadow-sm opacity-0"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M5 21c6.5 0 12-4.8 14-11.8.2-.7-.4-1.4-1.1-1.3-7.3 1.2-12.3 6-12.9 12.4-.1.5.3.7.7.7Zm3.2-6.5c2.4-2.1 5.1-3.7 8-4.6-2.4 1.5-4.6 3.4-6.4 5.8-1.2 1.5-2.1 3.1-2.8 4.9-.3.1-.6.1-.8.1 0-2.3.8-4.6 2-6.2Z" fill="currentColor" />
                </svg>
                <span>Hecho a mano en Buenos Aires desde 1990 · Madera de origen responsable</span>
              </div>
              <div className="mt-3 inline-flex items-start gap-2 text-xs text-neutral-700 max-w-2xl">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-madera" aria-hidden="true">
                  <path d="M12 3c-3.3 0-6 2.6-6 5.9 0 4.2 5.1 9.7 5.3 9.9.4.4 1 .4 1.4 0 .2-.2 5.3-5.7 5.3-9.9C18 5.6 15.3 3 12 3Zm0 8.1c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2c0 1.2-1 2.2-2.2 2.2Z" fill="currentColor" />
                </svg>
                <span>Av. Brig. Gral. Juan Manuel de Rosas 4933, B1655 Villa Ballester, Provincia de Buenos Aires</span>
              </div>
              <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-sm text-neutral-700">
                <div className="rounded-xl border border-madera/15 bg-white/85 px-4 py-3.5 shadow-sm min-h-[112px]">
                  <p className="text-base font-semibold text-neutral-900">+30 años</p>
                  <p className="mt-1">de experiencia en carpintería fina</p>
                </div>
                <div className="rounded-xl border border-madera/15 bg-white/85 px-4 py-3.5 shadow-sm min-h-[112px]">
                  <p className="text-base font-semibold text-neutral-900">Madera maciza</p>
                  <p className="mt-1">roble, pino y cedro seleccionados</p>
                </div>
                <div className="rounded-xl border border-madera/15 bg-white/85 px-4 py-3.5 shadow-sm min-h-[112px]">
                  <p className="text-base font-semibold text-neutral-900">B2B y B2C</p>
                  <p className="mt-1">atención a locales, estudios y clientes finales</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center md:justify-end">
            <div className="absolute inset-0 hidden md:block rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,rgba(139,90,43,0.12),transparent_60%)]" aria-hidden="true" />
            <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_24px_56px_rgba(139,90,43,0.2)] border border-madera/20 transform-gpu transition-transform bg-[linear-gradient(135deg,#8B5A2B,#F5F0E8)]">
              <img
                src={heroImage}
                alt="Mueble a medida de madera en dormitorio fabricado por carpintería en Villa Ballester"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center sm:object-[center_42%] scale-[1.04] opacity-95"
              />
              <div className="absolute inset-0 pointer-events-none wood-grain opacity-[0.08]" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" aria-hidden="true" />
              <style>
                {`
                  @keyframes woodDustFloat {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    15% { opacity: 0.15; }
                    100% { transform: translateY(-60px) translateX(10px); opacity: 0; }
                  }
                `}
              </style>
              {dustParticles.map((p, i) => (
                <span
                  key={`dust-${i}`}
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: `${p.left}%`,
                    bottom: `${p.bottom}%`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    backgroundColor: '#8B5A2B',
                    borderRadius: '9999px',
                    opacity: 0.12,
                    filter: 'blur(0.2px)',
                    animation: `woodDustFloat ${p.duration}s linear ${p.delay}s infinite`,
                  }}
                />
              ))}
            </div>
            <div className="absolute -bottom-4 right-2 sm:-bottom-5 sm:-right-3 bg-white/92 shadow-madera rounded-xl px-4 py-3 text-xs max-w-[230px] border border-madera/10 scroll-fade opacity-0">
              <p className="font-semibold text-neutral-900">
                Cada pieza se fabrica una a una en nuestro taller familiar.
              </p>
              <p className="mt-1 text-neutral-600">
                Controlamos personalmente el tallado, ensamble y acabado para
                garantizar un resultado que dure generaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative max-w-6xl mx-auto px-4 py-12 sm:py-14">
        <div className="absolute inset-0 pointer-events-none wood-grain opacity-[0.08]" aria-hidden="true" />
        <div className="relative space-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-oliva">
              Línea de tiempo
            </p>
            <h2 className="heading-h2">
              Hitos profesionales desde 1990
            </h2>
            <p className="text-base text-neutral-700 max-w-2xl">
              Cinco etapas clave que resumen la evolución del taller y su servicio.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-0 right-0 top-8 h-px bg-madera/20" aria-hidden="true" />
            <div className="grid gap-4 md:grid-cols-5">
              {FAMILY_TIMELINE.map((item) => (
                <article
                  key={item.year}
                  className="group rounded-2xl border border-madera/15 bg-white/90 shadow-sm p-5 min-h-[180px] scroll-fade opacity-0"
                >
                  <div className="flex h-full flex-col gap-2.5">
                    <span className="text-3xl sm:text-4xl font-semibold text-madera">
                      {item.year}
                    </span>
                    <p className="text-sm font-semibold text-neutral-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-14">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-oliva">
            Confían en nosotros
          </p>
          <h2 className="heading-h2">
            Clientes B2B y B2C que eligen ANJU
          </h2>
          <p className="text-base text-neutral-700 max-w-2xl">
            Marcas, estudios y locales que nos confían mobiliario para uso intensivo
            y piezas a medida.
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {TRUSTED_LOGOS.map((logo) => (
            <div
              key={logo}
              className="group rounded-2xl border border-madera/10 bg-white shadow-sm card-pad min-h-[92px] flex items-center justify-center text-center text-xs sm:text-sm font-semibold text-neutral-500 tracking-wide uppercase transition-all scroll-fade opacity-0 hover:border-oliva/30 hover:text-neutral-700 hover:shadow-md"
            >
              {logo}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-14 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="heading-h2">
              Muebles pensados para uso diario intenso
            </h2>
            <p className="mt-2 text-base text-neutral-700 max-w-2xl">
              Diseñamos para hogares, oficinas y locales que necesitan muebles
              que se vean bien hoy y sigan firmes dentro de muchos años. Nuestros
              herrajes y acabados están elegidos para el uso profesional.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openBudgetRequestModal()}
            className="btn-secondary px-4 py-2.5 text-xs sm:text-sm"
          >
            Presupuesto gratis
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="relative group rounded-2xl bg-white shadow-madera border border-madera/10 overflow-hidden transform-gpu transition-transform hover:scale-[1.02] scroll-fade opacity-0">
            <img
              src="https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Escritorio de madera a medida para oficina en Buenos Aires"
              loading="lazy"
              className="h-40 w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #8B5A2B, #8B5A2B 8px, #774a22 12px, #8B5A2B 16px)',
                backgroundSize: '200% 200%',
              }}
              aria-hidden="true"
            />
            <div className="card-pad min-h-[120px]">
              <h3 className="heading-h3">
                Escritorios ejecutivos
              </h3>
              <p className="mt-1.5 text-sm text-neutral-700">
                Superficies amplias, pasacables y soluciones integradas para
                oficinas modernas.
              </p>
            </div>
          </div>
          <div className="relative group rounded-2xl bg-white shadow-madera border border-madera/10 overflow-hidden transform-gpu transition-transform hover:scale-[1.02] scroll-fade opacity-0">
            <img
              src="https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mesa de comedor de madera maciza hecha a medida en Zona Norte"
              loading="lazy"
              className="h-40 w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #8B5A2B, #8B5A2B 8px, #774a22 12px, #8B5A2B 16px)',
                backgroundSize: '200% 200%',
              }}
              aria-hidden="true"
            />
            <div className="card-pad min-h-[120px]">
              <h3 className="heading-h3">
                Mesas y livings
              </h3>
              <p className="mt-1.5 text-sm text-neutral-700">
                Mesas de comedor, de apoyo y de centro para crear espacios cálidos
                y funcionales.
              </p>
            </div>
          </div>
          <div className="relative group rounded-2xl bg-white shadow-madera border border-madera/10 overflow-hidden transform-gpu transition-transform hover:scale-[1.02] scroll-fade opacity-0">
            <img
              src="https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Mueble de madera para living fabricado por carpintería de Buenos Aires"
              loading="lazy"
              className="h-40 w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, #8B5A2B, #8B5A2B 8px, #774a22 12px, #8B5A2B 16px)',
                backgroundSize: '200% 200%',
              }}
              aria-hidden="true"
            />
            <div className="card-pad min-h-[120px]">
              <h3 className="heading-h3">
                Piezas decorativas
              </h3>
              <p className="mt-1.5 text-sm text-neutral-700">
                Relojes tallados, estanterías y detalles en madera que terminan de
                definir un ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
