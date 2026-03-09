import { useState } from 'react'
import { supabase } from '../../services/supabase/client'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email) return

    try {
      if (supabase) {
        const { error } = await supabase.from('newsletter_subscriptions').insert({
          email,
          created_at: new Date().toISOString(),
        })

        if (error) {
          throw error
        }
      }

      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2"
    >
      <p className="text-xs text-neutral-200">
        Recibí novedades de colecciones y proyectos especiales 2 o 3 veces al año.
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-madera">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M4 6.75h16a1.25 1.25 0 0 1 1.25 1.25v8.5A1.25 1.25 0 0 1 20 17.75H4A1.25 1.25 0 0 1 2.75 16.5V8A1.25 1.25 0 0 1 4 6.75Zm0 1.5v.3l8 4.8 8-4.8v-.3H4Zm16 7.75v-6l-7.44 4.47a1.25 1.25 0 0 1-1.12 0L4 10v6h16Z" fill="currentColor" />
            </svg>
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            className="w-full rounded-full bg-white/10 border border-white/20 pl-9 pr-3 py-1.5 text-xs text-neutral-50 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-crema/70 transition-all"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-crema text-oliva text-xs font-semibold px-3 py-1.5 hover:bg-white transition-colors"
        >
          Suscribirme
        </button>
      </div>
      {status === 'success' && (
        <p className="text-[11px] text-crema/90">Gracias, te sumamos a la lista.</p>
      )}
      {status === 'error' && (
        <p className="text-[11px] text-red-200">
          No pudimos guardar tu mail. Probá nuevamente en unos minutos.
        </p>
      )}
    </form>
  )
}
