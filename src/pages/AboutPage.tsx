import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

const aboutAssets = {
  detalleBanco:
    'https://images.pexels.com/photos/5974349/pexels-photo-5974349.jpeg?auto=compress&cs=tinysrgb&w=1200',
  muebleInstalado:
    'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1200',
} as const

export function AboutPage() {
  usePageMeta({
    title: 'Sobre ANJU · Carpintería a medida en Villa Ballester, Buenos Aires',
    description:
      'Conocé ANJU Carpintería, taller familiar en Villa Ballester con más de 30 años fabricando muebles de madera y placares a medida en Buenos Aires.',
    keywords:
      'carpintería familiar Villa Ballester, historia ANJU Carpintería, muebles a medida Buenos Aires',
  })
  return (
    <div className="page-shell max-w-5xl">
      <section className="bg-white rounded-3xl shadow-madera border border-madera/10 overflow-hidden scroll-fade opacity-0">
        <div className="grid md:grid-cols-[1.2fr,0.8fr] gap-0">
          <div className="p-6 sm:p-8 md:p-10 space-y-5">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-oliva">
              Sobre nosotros
            </p>
            <h1 className="heading-h1">
              Taller familiar de Villa Ballester dedicado a muebles a medida
            </h1>
            <p className="text-base text-neutral-700">
              ANJU es una carpintería familiar fundada a principios de los 90 en
              Buenos Aires. Desde entonces trabajamos de forma directa, con trato
              cercano y foco en piezas que se usan todos los días.
            </p>
            <p className="text-base text-neutral-700">
              Nos especializamos en muebles a medida para hogares, oficinas y
              locales: placares, escritorios, mesas y relojes de pared. Cada
              pedido se define según medidas reales, uso y estilo del espacio.
            </p>
            <p className="text-base text-neutral-700">
              Fabricamos en nuestro taller propio con madera maciza de roble,
              pino y cedro, manteniendo control personal en cada etapa del
              proceso.
            </p>
            <div className="grid gap-3 sm:grid-cols-3 pt-1">
              <div className="rounded-xl border border-madera/10 bg-crema/60 px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">Desde los 90</p>
                <p className="mt-1 text-xs text-neutral-700">oficio sostenido en el tiempo</p>
              </div>
              <div className="rounded-xl border border-madera/10 bg-crema/60 px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">Taller propio</p>
                <p className="mt-1 text-xs text-neutral-700">fabricación y control en casa</p>
              </div>
              <div className="rounded-xl border border-madera/10 bg-crema/60 px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">A medida real</p>
                <p className="mt-1 text-xs text-neutral-700">hogares, oficinas y locales</p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:p-7 md:p-8 bg-crema/45 border-t md:border-t-0 md:border-l border-madera/10">
            <div className="h-full min-h-[280px] rounded-2xl border border-dashed border-madera/35 bg-white/80 p-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-madera/80">
                  Foto del taller
                </p>
                <p className="mt-3 text-sm text-neutral-700 leading-relaxed">
                  Este espacio queda preparado para cargar una imagen real del
                  taller ANJU y mostrar el proceso de fabricación.
                </p>
              </div>
              <div className="mt-4 rounded-xl border border-madera/10 bg-crema/50 px-4 py-3 text-xs text-neutral-700">
                Recomendado: foto horizontal de banco de trabajo, madera en
                proceso y herramientas del taller.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <figure className="bg-white rounded-2xl border border-madera/10 overflow-hidden shadow-madera scroll-fade opacity-0">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={aboutAssets.detalleBanco}
              alt="Banco de trabajo del taller de carpintería ANJU en Villa Ballester"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="px-4 py-3 text-sm text-neutral-700 border-t border-madera/5">
            Zona de armado y ajuste final en taller.
          </figcaption>
        </figure>
        <figure className="bg-white rounded-2xl border border-madera/10 overflow-hidden shadow-madera scroll-fade opacity-0">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={aboutAssets.muebleInstalado}
              alt="Mueble de madera a medida instalado en comedor de Buenos Aires"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="px-4 py-3 text-sm text-neutral-700 border-t border-madera/5">
            Entrega terminada en espacio real de uso.
          </figcaption>
        </figure>
      </section>

      <section className="bg-white rounded-3xl border border-madera/10 p-6 sm:p-8 md:p-9 shadow-madera scroll-fade opacity-0 section-stack">
        <h2 className="heading-h2">
          Nuestra forma de trabajar
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-madera/10 bg-crema/50 card-pad">
            <p className="text-sm font-semibold text-neutral-900">
              Escuchamos primero
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              Partimos de medidas reales, necesidad de uso y contexto del
              espacio para evitar soluciones genéricas.
            </p>
          </div>
          <div className="rounded-2xl border border-madera/10 bg-crema/50 card-pad">
            <p className="text-sm font-semibold text-neutral-900">
              Elegimos madera con criterio
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              Trabajamos roble, pino y cedro macizo según el tipo de mueble, la
              resistencia esperada y el acabado buscado.
            </p>
          </div>
          <div className="rounded-2xl border border-madera/10 bg-crema/50 card-pad">
            <p className="text-sm font-semibold text-neutral-900">
              Seguimiento personal
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              Cada pieza se fabrica en nuestro taller propio con revisión directa
              de uniones, terminaciones y detalles antes de la entrega.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-2xl border border-madera/10 card-pad min-h-[178px] shadow-madera scroll-fade opacity-0">
          <h2 className="heading-h3">
            Madera responsable
          </h2>
          <p className="mt-2 text-sm text-neutral-700">
            Elegimos madera con secado controlado y evaluamos cada partida antes
            de fabricar. Así reducimos movimientos y mejoramos la estabilidad de
            las piezas en uso diario.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-madera/10 card-pad min-h-[178px] shadow-madera scroll-fade opacity-0">
          <h2 className="heading-h3">
            Calidad artesanal
          </h2>
          <p className="mt-2 text-sm text-neutral-700">
            Combinamos maquinaria y terminación manual. Revisamos uniones,
            herrajes y acabados por pieza para que el resultado sea prolijo y
            fácil de mantener.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-madera/10 card-pad min-h-[178px] shadow-madera scroll-fade opacity-0">
          <h2 className="heading-h3">
            Diseño para uso cotidiano
          </h2>
          <p className="mt-2 text-sm text-neutral-700">
            Pensamos cada mueble según su función: guardado, circulación y
            resistencia. Aplicamos este criterio tanto en hogares como en
            espacios comerciales.
          </p>
        </div>
      </section>

      <section className="bg-oliva text-crema rounded-3xl p-6 sm:p-8 md:p-9 shadow-madera scroll-fade opacity-0 space-y-5">
        <h2 className="heading-h2 text-crema">
          Si querés, empezamos hoy mismo
        </h2>
        <p className="text-base text-crema/90 max-w-3xl leading-relaxed">
          Podés ver trabajos en el catálogo o escribirnos por WhatsApp con tus
          medidas aproximadas y una referencia. Te respondemos con una propuesta
          clara y realista.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/catalogo"
            className="btn-primary bg-white text-oliva hover:bg-crema/95"
          >
            Ver catálogo
          </Link>
          <a
            href={`https://wa.me/5491144181328?text=${encodeURIComponent('Hola ANJU, quiero consultar por un mueble a medida.')}`}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary-inverse"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}
