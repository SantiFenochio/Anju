import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase/client'
import { usePageMeta } from '../hooks/usePageMeta'

export function ContactPage() {
  usePageMeta({
    title: 'Contacto carpintería en Villa Ballester · ANJU Buenos Aires',
    description:
      'Contactá a ANJU Carpintería en Villa Ballester para muebles de madera y placares a medida en Buenos Aires, CABA y Zona Norte.',
    keywords:
      'contacto carpintería Villa Ballester, presupuesto muebles a medida Buenos Aires, contacto placares zona norte',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('idle')

    const formData = new FormData(event.currentTarget)

    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      whatsapp: String(formData.get('whatsapp') || ''),
      reason: String(formData.get('reason') || ''),
      message: String(formData.get('message') || ''),
    }

    try {
      setIsSubmitting(true)

      if (supabase) {
        const { error } = await supabase.from('contact_messages').insert({
          ...payload,
          created_at: new Date().toISOString(),
        })

        if (error) {
          throw error
        }
      }

      setStatus('success')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-shell">
      <header className="space-y-2 max-w-2xl">
        <h1 className="heading-h1">
          Contacto de carpintería a medida en Villa Ballester
        </h1>
        <p className="text-sm text-neutral-700">
          Escribinos para coordinar un proyecto a medida, pedir presupuesto
          sobre piezas del catálogo o recibir información para mayoristas.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-[3fr,2fr] items-start">
        {isLoading ? (
          <div className="rounded-3xl border border-madera/10 bg-white card-pad space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3 w-32 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3 w-24 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-36 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 w-44 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
              <div className="h-28 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
            </div>
            <div className="h-11 w-40 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-madera/10 bg-white card-pad space-y-4 shadow-madera scroll-fade opacity-0"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 text-sm">
                <label htmlFor="name" className="block text-neutral-800">
                  Nombre y apellido
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-oliva/60"
                />
              </div>
              <div className="space-y-1.5 text-sm">
                <label htmlFor="email" className="block text-neutral-800">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-oliva/60"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5 text-sm">
                <label htmlFor="whatsapp" className="block text-neutral-800">
                  WhatsApp
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="+54 9 11 ..."
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-oliva/60"
                />
              </div>
              <div className="space-y-1.5 text-sm">
                <label htmlFor="reason" className="block text-neutral-800">
                  Motivo de contacto
                </label>
                <select
                  id="reason"
                  name="reason"
                  aria-label="Motivo de contacto"
                  className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-oliva/60"
                >
                  <option value="mueble-medida">Mueble a medida</option>
                  <option value="catalogo">Producto del catálogo</option>
                  <option value="mayorista">Mayorista / revendedor</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              <label htmlFor="message" className="block text-neutral-800">
                Contanos qué necesitás
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-oliva/60"
              />
            </div>

            {status === 'success' && (
              <p className="text-xs text-oliva mt-1">
                Gracias, recibimos tu mensaje. Te vamos a responder a la brevedad.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-600 mt-1">
                No pudimos enviar el mensaje. Probá nuevamente en unos minutos.
              </p>
            )}

            <button
              type="submit"
              aria-label="Enviar mensaje de contacto"
              disabled={isSubmitting}
              className="btn-primary mt-2 disabled:bg-neutral-400 disabled:text-neutral-700 disabled:shadow-none"
            >
              Enviar mensaje
            </button>
          </form>
        )}

        <aside className="space-y-4">
          <div className="rounded-3xl border border-madera/10 bg-white card-pad space-y-2 shadow-madera scroll-fade opacity-0">
            <h2 className="heading-h3">
              Taller y entregas
            </h2>
            <p className="text-sm text-neutral-700">
              Av. Brig. Gral. Juan Manuel de Rosas 4933, B1655 Villa Ballester, Provincia de Buenos Aires. Coordinamos visitas al taller y entregas en la ciudad y alrededores.
            </p>
            <p className="text-sm text-neutral-700">
              Tel / WhatsApp: +54 9 11 4418-1328
              <br />
              Email: anju-time@hotmail.com
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden border border-madera/30 shadow-madera h-64 transition-shadow scroll-fade opacity-0">
            <iframe
              title="Mapa ANJU Carpintería Buenos Aires"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164273.66742066163!2d-58.57338464126919!3d-34.6158037807711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb627c9f0f0f%3A0x5c0c1a7d3c4aa1c7!2sBuenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
