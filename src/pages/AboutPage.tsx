import { usePageMeta } from '../hooks/usePageMeta'

const aboutAssets = {
  tallerEquipo:
    'https://images.pexels.com/photos/3760072/pexels-photo-3760072.jpeg?auto=compress&cs=tinysrgb&w=1200',
  detalleBanco:
    'https://images.pexels.com/photos/5974349/pexels-photo-5974349.jpeg?auto=compress&cs=tinysrgb&w=1200',
  muebleInstalado:
    'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1200',
} as const

export function AboutPage() {
  usePageMeta({
    title: 'Sobre ANJU Carpintería · Taller de muebles a medida en Buenos Aires',
    description:
      'Conocé la historia de ANJU Carpintería familiar en Buenos Aires. Más de 30 años diseñando y fabricando muebles de madera a medida para hogares y negocios.',
    keywords:
      'sobre carpintería ANJU, carpintería familiar Buenos Aires, muebles a medida historia',
  })
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-12 space-y-9">
      <section className="bg-white rounded-3xl shadow-madera border border-madera/10 overflow-hidden scroll-fade opacity-0">
        <div className="grid md:grid-cols-[3fr,2fr] gap-0">
          <div className="p-6 sm:p-8 md:p-9 space-y-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-oliva">
              Sobre nosotros
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900">
              Carpintería familiar, trabajo directo y diseño a medida
            </h1>
            <p className="text-base text-neutral-700">
              ANJU nació a principios de los 90 como taller familiar en Buenos
              Aires. Empezamos con encargos de barrio y hoy trabajamos para
              hogares, estudios, oficinas y locales que buscan muebles de uso
              real, bien resueltos y durables.
            </p>
            <p className="text-base text-neutral-700">
              Mantenemos una forma de trabajo simple: relevamos necesidades,
              proponemos opciones claras de madera y medidas, y fabricamos cada
              pieza con seguimiento cercano hasta la instalación.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-madera/10 bg-crema/60 px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">+30 años</p>
                <p className="mt-1 text-xs text-neutral-700">de oficio continuo</p>
              </div>
              <div className="rounded-xl border border-madera/10 bg-crema/60 px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">Taller propio</p>
                <p className="mt-1 text-xs text-neutral-700">en Villa Ballester</p>
              </div>
              <div className="rounded-xl border border-madera/10 bg-crema/60 px-4 py-3">
                <p className="text-sm font-semibold text-neutral-900">B2B y B2C</p>
                <p className="mt-1 text-xs text-neutral-700">CABA y Zona Norte</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src={aboutAssets.tallerEquipo}
              alt="Equipo de carpintería trabajando en el taller"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <figure className="bg-white rounded-2xl border border-madera/10 overflow-hidden shadow-madera scroll-fade opacity-0">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={aboutAssets.detalleBanco}
              alt="Banco de trabajo con piezas en proceso de armado"
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
              alt="Mueble de madera instalado en comedor"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="px-4 py-3 text-sm text-neutral-700 border-t border-madera/5">
            Entrega terminada en espacio real de uso.
          </figcaption>
        </figure>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-2xl border border-madera/10 p-5 sm:p-6 min-h-[178px] shadow-madera scroll-fade opacity-0">
          <h2 className="text-base font-semibold text-neutral-900">
            Madera responsable
          </h2>
          <p className="mt-2 text-sm text-neutral-700">
            Elegimos madera con secado controlado y evaluamos cada partida antes
            de fabricar. Así reducimos movimientos y mejoramos la estabilidad de
            las piezas en uso diario.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-madera/10 p-5 sm:p-6 min-h-[178px] shadow-madera scroll-fade opacity-0">
          <h2 className="text-base font-semibold text-neutral-900">
            Calidad artesanal
          </h2>
          <p className="mt-2 text-sm text-neutral-700">
            Combinamos maquinaria y terminación manual. Revisamos uniones,
            herrajes y acabados por pieza para que el resultado sea prolijo y
            fácil de mantener.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-madera/10 p-5 sm:p-6 min-h-[178px] shadow-madera scroll-fade opacity-0">
          <h2 className="text-base font-semibold text-neutral-900">
            Diseño para uso cotidiano
          </h2>
          <p className="mt-2 text-sm text-neutral-700">
            Pensamos cada mueble según su función: guardado, circulación y
            resistencia. Aplicamos este criterio tanto en hogares como en
            espacios comerciales.
          </p>
        </div>
      </section>

      <section className="bg-oliva text-crema rounded-3xl p-6 sm:p-8 md:p-9 shadow-madera scroll-fade opacity-0 space-y-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Cómo trabajamos cada pedido
        </h2>
        <p className="text-base text-crema/90 max-w-3xl">
          Recibimos medidas y referencias por WhatsApp, definimos materiales y
          terminación, y avanzamos con fabricación e instalación coordinada.
        </p>
        <div className="grid gap-2.5 text-sm text-crema/90 sm:grid-cols-2">
          <p>· Relevamiento de medidas y uso del mueble</p>
          <p>· Definición de madera, acabado y herrajes</p>
          <p>· Fabricación en taller propio</p>
          <p>· Entrega e instalación en CABA y Zona Norte</p>
        </div>
        <p className="text-xs text-crema/75">
          Fotos reemplazables desde el objeto aboutAssets para cargar imágenes
          reales del taller y entregas.
        </p>
      </section>
    </div>
  )
}
