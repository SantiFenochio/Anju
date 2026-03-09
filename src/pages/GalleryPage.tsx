import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

const galleryAssets = {
  seleccionMadera:
    'https://images.pexels.com/photos/3735410/pexels-photo-3735410.jpeg?auto=compress&cs=tinysrgb&w=1200',
  bancoHerramientas:
    'https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg?auto=compress&cs=tinysrgb&w=1200',
  talladoDetalle:
    'https://images.pexels.com/photos/569160/pexels-photo-569160.jpeg?auto=compress&cs=tinysrgb&w=1200',
  armadoEstructura:
    'https://images.pexels.com/photos/5974349/pexels-photo-5974349.jpeg?auto=compress&cs=tinysrgb&w=1200',
  lijadoFinal:
    'https://images.pexels.com/photos/5974409/pexels-photo-5974409.jpeg?auto=compress&cs=tinysrgb&w=1200',
  mesaComedorInstalada:
    'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1200',
  escritorioInstalado:
    'https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=1200',
  livingConMuebles:
    'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=1200',
} as const

const galleryImages = [
  {
    id: 'seleccion-madera',
    src: galleryAssets.seleccionMadera,
    label: 'Selección y control de tablones antes del corte',
    type: 'taller',
    ratioClass: 'aspect-[4/3]',
  },
  {
    id: 'banco-herramientas',
    src: galleryAssets.bancoHerramientas,
    label: 'Banco de trabajo con herramientas de uso diario',
    type: 'taller',
    ratioClass: 'aspect-[3/4]',
  },
  {
    id: 'tallado-detalle',
    src: galleryAssets.talladoDetalle,
    label: 'Trabajo de detalle en cantos y uniones',
    type: 'taller',
    ratioClass: 'aspect-[4/3]',
  },
  {
    id: 'armado-estructura',
    src: galleryAssets.armadoEstructura,
    label: 'Armado de estructura con revisión de escuadra',
    type: 'taller',
    ratioClass: 'aspect-[4/3]',
  },
  {
    id: 'lijado-final',
    src: galleryAssets.lijadoFinal,
    label: 'Lijado previo al acabado final',
    type: 'taller',
    ratioClass: 'aspect-[3/4]',
  },
  {
    id: 'mesa-comedor',
    src: galleryAssets.mesaComedorInstalada,
    label: 'Mesa de comedor instalada en vivienda',
    type: 'producto',
    ratioClass: 'aspect-[4/3]',
  },
  {
    id: 'escritorio-oficina',
    src: galleryAssets.escritorioInstalado,
    label: 'Escritorio a medida para estudio profesional',
    type: 'producto',
    ratioClass: 'aspect-[4/3]',
  },
  {
    id: 'living-integrado',
    src: galleryAssets.livingConMuebles,
    label: 'Mobiliario integrado en living diario',
    type: 'producto',
    ratioClass: 'aspect-[3/4]',
  },
] as const

export function GalleryPage() {
  usePageMeta({
    title: 'Galería de muebles y taller · ANJU Carpintería Buenos Aires',
    description:
      'Fotos del taller de carpintería ANJU y muebles de madera a medida instalados en hogares, oficinas y locales de Buenos Aires.',
    keywords:
      'galería muebles de madera, taller de carpintería Buenos Aires, proyectos ANJU',
  })
  const workshopImages = useMemo(
    () => galleryImages.filter((item) => item.type === 'taller'),
    [],
  )
  const projectImages = useMemo(
    () => galleryImages.filter((item) => item.type === 'producto'),
    [],
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-12 space-y-9">
      <nav aria-label="Breadcrumb" className="text-xs text-madera/70">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link
              to="/"
              className="transition-colors hover:text-madera hover:underline decoration-madera/50 underline-offset-4"
            >
              Inicio
            </Link>
          </li>
          <li className="text-madera/40">›</li>
          <li className="text-madera">Galería</li>
        </ol>
      </nav>
      <section className="rounded-3xl border border-madera/10 bg-white p-5 sm:p-7 md:p-8 space-y-4 shadow-madera">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-oliva">
            Galería ANJU
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900">
            Taller y muebles instalados en uso real
          </h1>
          <p className="text-base text-neutral-700">
            Reunimos escenas de trabajo y entregas para mostrar cómo resolvemos
            cada etapa: preparación de madera, armado en taller e instalación en
            hogares, oficinas y locales.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full border border-madera/20 bg-crema px-3 py-1 text-xs font-medium text-madera">
            Proceso en taller
          </span>
          <span className="inline-flex items-center rounded-full border border-oliva/20 bg-oliva/10 px-3 py-1 text-xs font-medium text-oliva">
            Entregas en uso real
          </span>
          <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
            Reemplazo simple de fotos desde galleryAssets
          </span>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Proceso en taller
            </h2>
            <p className="text-sm text-neutral-700">
              Preparación, armado y terminación antes de la entrega.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workshopImages.map((item, index) => (
            <figure
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-white border border-madera/10 shadow-madera hover:shadow-[0_16px_36px_rgba(139,90,43,0.14)] transition-all duration-300 hover:-translate-y-0.5 scroll-fade opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className={`relative overflow-hidden ${item.ratioClass}`}>
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #8B5A2B, #8B5A2B 8px, #774a22 12px, #8B5A2B 16px)',
                    backgroundSize: '200% 200%',
                  }}
                  aria-hidden="true"
                />
              </div>
              <figcaption className="p-4 min-h-[86px] flex items-start justify-between gap-2 border-t border-madera/5">
                <span className="text-sm text-neutral-800">{item.label}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-madera/10 text-madera">
                  taller
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              Proyectos terminados
            </h2>
            <p className="text-sm text-neutral-700">
              Muebles de ANJU ya instalados y en funcionamiento cotidiano.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectImages.map((item, index) => (
            <figure
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-white border border-madera/10 shadow-madera hover:shadow-[0_16px_36px_rgba(139,90,43,0.14)] transition-all duration-300 hover:-translate-y-0.5 scroll-fade opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className={`relative overflow-hidden ${item.ratioClass}`}>
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #8B5A2B, #8B5A2B 8px, #774a22 12px, #8B5A2B 16px)',
                    backgroundSize: '200% 200%',
                  }}
                  aria-hidden="true"
                />
              </div>
              <figcaption className="p-4 min-h-[86px] flex items-start justify-between gap-2 border-t border-madera/5">
                <span className="text-sm text-neutral-800">{item.label}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-wide px-2.5 py-1 rounded-full bg-oliva/10 text-oliva">
                  producto
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
