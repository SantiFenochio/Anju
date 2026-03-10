import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { useCart } from '../contexts/CartContext'

export function CartPage() {
  usePageMeta({
    title: 'Carrito de pedido · ANJU Carpintería Buenos Aires',
    description:
      'Revisá tu carrito de muebles de madera ANJU y enviá tu pedido por WhatsApp. Entregas coordinadas en CABA y Zona Norte.',
    keywords:
      'carrito muebles de madera, pedido muebles a medida Buenos Aires, carrito ANJU',
  })
  const { items, totalItems } = useCart()
  const navigate = useNavigate()
  const [deliveryMethod, setDeliveryMethod] = useState<'retiro' | 'envio'>(
    'envio',
  )

  const deliveryOptions = useMemo(
    () => ({
      retiro: {
        label: 'Retiro en taller',
        description: 'Coordinamos día y horario.',
      },
      envio: {
        label: 'Envío a domicilio CABA/Zona Norte',
        description: 'Coordinamos zona, acceso y franja horaria.',
      },
    }),
    [],
  )

  const handleSendByWhatsApp = () => {
    if (!items.length) return
    const lines = [
      'Hola ANJU, quiero enviar este pedido del carrito:',
      '',
      ...items.map(
        (item) =>
          `• ${item.quantity} x ${item.product.name} (${item.product.material.toUpperCase()})`,
      ),
      '',
      `Entrega: ${deliveryOptions[deliveryMethod].label}`,
      '',
      'Quedo atento para coordinar detalles y entrega.',
    ]
    window.open(
      `https://wa.me/5491144181328?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
    )
  }

  return (
    <div className="page-shell max-w-4xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="heading-h1">
            Tu selección
          </h1>
          <p className="mt-1 text-sm text-neutral-700">
            {totalItems === 0
              ? 'Todavía no agregaste productos. Explorá el catálogo para comenzar tu pedido.'
              : `Tenés ${totalItems} ítem${totalItems === 1 ? '' : 's'} en tu carrito.`}
          </p>
        </div>
        <Link
          to="/catalogo"
          className="btn-secondary hidden sm:inline-flex text-xs"
        >
          Seguir en catálogo
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-madera/30 bg-white p-6 text-sm text-neutral-700 shadow-madera scroll-fade opacity-0">
          <p>Tu carrito está vacío.</p>
          <Link
            to="/catalogo"
            className="btn-primary mt-3 text-xs"
          >
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[3fr,2fr]">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.quantity}`}
                className="rounded-2xl border border-madera/10 bg-white card-pad flex items-center gap-4 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(139,90,43,0.12)] transition-transform transition-shadow shadow-madera scroll-fade opacity-0 cart-item-pop"
              >
                <div className="h-16 w-16 rounded-xl bg-crema flex items-center justify-center text-xs text-neutral-600">
                  {item.product.category === 'escritorio' && 'Escritorio'}
                  {item.product.category === 'reloj' && 'Reloj'}
                  {item.product.category === 'mesa' && 'Mesa'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-900">
                    {item.product.name}
                  </p>
                  <p className="mt-1 text-xs text-neutral-600">
                    {item.product.material.toUpperCase()} · Cantidad: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <aside className="rounded-2xl border border-madera/10 bg-white card-pad h-max sticky top-24 shadow-madera scroll-fade opacity-0">
            <h2 className="heading-h3">
              Resumen del pedido
            </h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-madera/10 bg-crema/70 p-3">
                <p className="text-xs font-semibold text-neutral-700">Entrega</p>
                <div className="mt-2 grid gap-2">
                  {(['retiro', 'envio'] as Array<'retiro' | 'envio'>).map(
                    (key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setDeliveryMethod(key)}
                        className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition-all ${deliveryMethod === key ? 'border-madera bg-madera/10 text-madera shadow-sm' : 'border-neutral-200 text-neutral-700 hover:border-oliva/40 hover:text-oliva'}`}
                      >
                        <span className="font-semibold">
                          {deliveryOptions[key].label}
                        </span>
                        <span className="mt-1 block text-[11px] text-neutral-500">
                          {deliveryOptions[key].description}
                        </span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-neutral-500">
              Te respondemos por WhatsApp para confirmar medidas, terminación y entrega.
            </p>
            <button
              type="button"
              aria-label="Enviar pedido por WhatsApp"
              onClick={handleSendByWhatsApp}
              disabled={!items.length}
              className="btn-primary mt-5 w-full text-base disabled:bg-neutral-300 disabled:text-neutral-600 disabled:shadow-none"
            >
              Enviar pedido por WhatsApp
            </button>
            <button
              type="button"
              aria-label="Seguir en catálogo"
              onClick={() => navigate('/catalogo')}
              className="btn-secondary mt-2 w-full text-xs"
            >
              Seguir en catálogo
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}
