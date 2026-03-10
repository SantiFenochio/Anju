import { usePageMeta } from '../hooks/usePageMeta'

const testimonials = [
  {
    name: 'Estudio de Arquitectura Palermo',
    text: 'Trabajamos varios proyectos de oficinas y locales con ANJU. Siempre cumplen con las medidas y terminaciones que necesitamos para nuestros clientes.',
    type: 'B2B',
  },
  {
    name: 'Mariana · Belgrano',
    text: 'Encargamos una mesa de comedor a medida y un escritorio para home office. Quedaron impecables y el equipo acompañó todo el proceso.',
    type: 'Hogar',
  },
  {
    name: 'Local de indumentaria · Vicente López',
    text: 'Nos ayudaron a diseñar y fabricar percheros, mostrador y estanterías. El resultado se ve sólido y prolijo, perfecto para el día a día del local.',
    type: 'Comercial',
  },
]

export function TestimonialsPage() {
  usePageMeta({
    title: 'Testimonios de clientes · ANJU Carpintería Buenos Aires',
    description:
      'Opiniones de clientes de ANJU Carpintería. Muebles de madera a medida para hogares, estudios profesionales y locales comerciales en Buenos Aires.',
    keywords:
      'opiniones carpintería ANJU, testimonios muebles a medida Buenos Aires, reseñas ANJU',
  })

  return (
    <div className="page-shell max-w-5xl">
      <header className="space-y-2 max-w-2xl">
        <h1 className="heading-h1">
          Testimonios de clientes
        </h1>
        <p className="text-sm text-neutral-700">
          Una selección de experiencias de clientes que confiaron en ANJU para
          equipar hogares, estudios profesionales y locales en Buenos Aires.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl bg-white border border-madera/10 card-pad shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all flex flex-col gap-3"
          >
            <p className="text-xs uppercase tracking-wide text-oliva">
              {item.type}
            </p>
            <p className="text-sm text-neutral-800 leading-relaxed">
              “{item.text}”
            </p>
            <p className="mt-auto text-xs font-semibold text-neutral-900">
              {item.name}
            </p>
          </article>
        ))}
      </section>
    </div>
  )
}
