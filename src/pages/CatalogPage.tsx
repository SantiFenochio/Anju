import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import type {
  Product,
  ProductCategory,
  ProductMaterial,
} from '../types/cart'
import { useCart } from '../contexts/CartContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { openBudgetRequestModal } from '../services/budgetRequest'

type Filters = {
  category: ProductCategory | 'todos'
  material: ProductMaterial | 'todos'
}

const fallbackImage = '/Mueble1.jpg'

const categoryLabels: Record<ProductCategory, string> = {
  escritorio: 'Escritorios',
  reloj: 'Relojes de pared',
  mesa: 'Mesas',
}

const categoryContextLabels: Record<ProductCategory, string> = {
  escritorio: 'Oficina y home office',
  reloj: 'Decoración mural',
  mesa: 'Comedor y living',
}

const materialLabels: Record<ProductMaterial, string> = {
  roble: 'Roble',
  pino: 'Pino',
  cedro: 'Cedro',
}

function getImagesForProduct(product: Product) {
  if (product.images.length > 0) return product.images
  return [fallbackImage]
}

function shadeColor(hex: string, percent: number) {
  const clean = hex.replace('#', '')
  const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16)
  let r = (num >> 16) & 255
  let g = (num >> 8) & 255
  let b = num & 255
  r = Math.min(255, Math.max(0, Math.floor((r * (100 + percent)) / 100)))
  g = Math.min(255, Math.max(0, Math.floor((g * (100 + percent)) / 100)))
  b = Math.min(255, Math.max(0, Math.floor((b * (100 + percent)) / 100)))
  return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`
}

export function CatalogPage() {
  usePageMeta({
    title: 'Catálogo de muebles de madera a medida en Buenos Aires · ANJU Carpintería',
    description:
      'Catálogo ANJU de muebles de madera a medida en Villa Ballester, Buenos Aires: escritorios, mesas, relojes y soluciones para hogares, oficinas y locales.',
    keywords:
      'muebles de madera Buenos Aires, catálogo carpintería Villa Ballester, escritorios a medida zona norte, mesas de madera CABA',
  })
  const [filters, setFilters] = useState<Filters>({
    category: 'todos',
    material: 'todos',
  })
  const { addToCart } = useCart()
  const [quickProduct, setQuickProduct] = useState<Product | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [cardImageIndex, setCardImageIndex] = useState<Record<string, number>>({})
  const overlayRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [justAddedId, setJustAddedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (quickProduct) {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setQuickProduct(null)
        }
      }
      document.addEventListener('keydown', onKeyDown)
      const raf = requestAnimationFrame(() => {
        const overlay = overlayRef.current
        const content = contentRef.current
        if (overlay) {
          overlay.classList.remove('opacity-0')
          overlay.classList.add('opacity-100')
        }
        if (content) {
          content.classList.remove('opacity-0', 'translate-y-1', 'scale-95')
          content.classList.add('opacity-100', 'translate-y-0', 'scale-100')
        }
      })
      return () => {
        cancelAnimationFrame(raf)
        document.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [quickProduct, overlayRef, contentRef])

  function createRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ripple = document.createElement('span')
    ripple.style.position = 'absolute'
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.backgroundImage =
      'repeating-linear-gradient(45deg, rgba(245,240,232,0.35) 0px, rgba(139,90,43,0.35) 10px, rgba(119,74,34,0.35) 14px, rgba(245,240,232,0.35) 20px)'
    ripple.style.backgroundSize = '200% 200%'
    ripple.style.borderRadius = '50%'
    ripple.style.transform = 'translate(-50%, -50%) scale(0)'
    ripple.style.opacity = '0.7'
    ripple.style.pointerEvents = 'none'
    ripple.style.transition = 'transform 450ms ease-out, opacity 600ms ease-out'
    button.appendChild(ripple)
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(1)'
      ripple.style.opacity = '0'
    })
    setTimeout(() => {
      ripple.remove()
    }, 650)
  }

  function handleAddToCart(product: Product, e: React.MouseEvent<HTMLButtonElement>) {
    createRipple(e)
    addToCart(product)
    setJustAddedId(product.id)
    setTimeout(() => {
      setJustAddedId((prev) => (prev === product.id ? null : prev))
    }, 1200)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category !== 'todos' && product.category !== filters.category) {
        return false
      }
      if (filters.material !== 'todos' && product.material !== filters.material) {
        return false
      }
      return true
    })
  }, [filters])
  const categoryOptions = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [])
  const materialOptions = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.material)))
  }, [])
  const isSingleProduct = filteredProducts.length === 1
  const categoryLabel =
    filters.category === 'todos'
      ? null
      : categoryLabels[filters.category]

  const quickImages = quickProduct ? getImagesForProduct(quickProduct) : []
  const hasQuickManyImages = quickImages.length > 1
  const quickActiveImageIndex =
    quickImages.length > 0 ? activeImageIndex % quickImages.length : 0

  return (
    <div className="page-shell">
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
          <li>
            <Link
              to="/catalogo"
              className="transition-colors hover:text-madera hover:underline decoration-madera/50 underline-offset-4"
            >
              Catálogo
            </Link>
          </li>
          {categoryLabel && (
            <>
              <li className="text-madera/40">›</li>
              <li className="text-madera">{categoryLabel}</li>
            </>
          )}
        </ol>
      </nav>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="heading-h1">
            Catálogo de muebles de madera a medida en Buenos Aires
          </h1>
          <p className="mt-2 text-base text-neutral-700 max-w-2xl">
            Piezas estándar en madera maciza listas para entregar o adaptar a tu proyecto. 
            Podés combinarlas con pedidos 100% a medida.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 bg-white rounded-2xl shadow-madera border border-madera/10 card-pad scroll-fade animate-fade-in">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-neutral-700">Tipo de mueble</p>
          <select
            aria-label="Filtrar por tipo de mueble"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm"
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category: e.target.value as Filters['category'],
              }))
            }
          >
            <option value="todos">Todos</option>
            {categoryOptions.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[category]}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-neutral-700">Madera</p>
          <select
            aria-label="Filtrar por tipo de madera"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm"
            value={filters.material}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                material: e.target.value as Filters['material'],
              }))
            }
          >
            <option value="todos">Todas</option>
            {materialOptions.map((material) => (
              <option key={material} value={material}>
                {materialLabels[material]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`catalog-skeleton-${index}`}
              className="rounded-2xl border border-madera/10 bg-white overflow-hidden"
            >
              <div className="h-56 skeleton-shimmer animate-shimmer bg-crema/60" />
              <div className="h-16 border-y border-madera/10 bg-white/80 px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-11 w-11 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
                  <div className="h-11 w-11 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
                  <div className="h-11 w-11 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="h-4 w-3/4 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="h-3 w-full rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="h-3 w-5/6 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                  <div className="h-5 w-20 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                </div>
                <div className="h-7 w-28 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="h-10 w-full rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="h-9 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                  <div className="h-9 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`grid gap-6 auto-rows-fr ${isSingleProduct ? 'place-items-center sm:grid-cols-1 lg:grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}
        >
          {filteredProducts.map((product) => {
            const images = getImagesForProduct(product)
            const hasManyImages = images.length > 1
            const currentCardImageIndex = (cardImageIndex[product.id] ?? 0) % images.length
            return (
              <article
                key={product.id}
                className={`relative group h-full rounded-2xl bg-white border border-madera/10 flex flex-col overflow-hidden transform-gpu transition-all duration-300 hover:scale-[1.01] shadow-madera hover:shadow-[0_16px_36px_rgba(139,90,43,0.14)] scroll-fade animate-fade-in ${isSingleProduct ? 'w-full max-w-xl' : ''}`}
              >
                <div className="relative border-b border-madera/10 bg-crema/30">
                  <div className="relative h-56">
                    <img
                      src={images[currentCardImageIndex]}
                      alt={`${product.name} en ${product.material} - foto ${currentCardImageIndex + 1}`}
                      loading="lazy"
                      className={`h-full w-full ${hasManyImages ? 'object-cover' : 'object-contain'} bg-crema/35 transition-opacity duration-500 ease-out`}
                    />
                    {hasManyImages && (
                      <>
                        <button
                          type="button"
                          aria-label="Foto anterior"
                          onClick={() =>
                            setCardImageIndex((prev) => ({
                              ...prev,
                              [product.id]:
                                (currentCardImageIndex - 1 + images.length) %
                                images.length,
                            }))
                          }
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-madera/15 bg-white/85 text-madera shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden="true">
                            <path d="M15.5 4.5 8 12l7.5 7.5-1.5 1.5L5 12l9-9 1.5 1.5Z" fill="currentColor" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          aria-label="Foto siguiente"
                          onClick={() =>
                            setCardImageIndex((prev) => ({
                              ...prev,
                              [product.id]:
                                (currentCardImageIndex + 1) % images.length,
                            }))
                          }
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-madera/15 bg-white/85 text-madera shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden="true">
                            <path d="M8.5 4.5 7 6l7.5 6L7 18l1.5 1.5 9-7.5-9-7.5Z" fill="currentColor" />
                          </svg>
                        </button>
                      </>
                    )}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-[0.08] transition-opacity"
                      style={{
                        backgroundImage:
                          `repeating-linear-gradient(45deg, #8B5A2B, #8B5A2B 8px, ${shadeColor('#8B5A2B', -10)} 12px, #8B5A2B 16px)`,
                        backgroundSize: '200% 200%',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                  {hasManyImages && (
                    <div className="h-16 border-t border-madera/10 bg-white/90">
                      <div className="flex h-full items-center gap-2 overflow-x-auto px-3 py-2 scroll-smooth">
                        {images.map((src, index) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() =>
                              setCardImageIndex((prev) => ({
                                ...prev,
                                [product.id]: index,
                              }))
                            }
                            className={`h-11 w-11 rounded-md overflow-hidden border ${index === currentCardImageIndex ? 'border-madera shadow-[0_0_0_2px_rgba(139,90,43,0.18)]' : 'border-transparent'} bg-white shadow-sm shrink-0`}
                            aria-label={`Imagen ${index + 1} de ${product.name}`}
                          >
                            <img
                              src={src}
                              alt={`Miniatura ${index + 1} de ${product.name} en ${product.material}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-pad flex flex-col gap-3 flex-1 min-h-[270px]">
                  <h2 className="heading-h3">
                    {product.name}
                  </h2>
                  <p className="min-h-[64px] text-sm text-neutral-600">
                    {product.description ??
                      (product.category === 'escritorio'
                        ? 'Escritorio de trabajo con estructura reforzada y pasacables.'
                        : product.category === 'reloj'
                          ? 'Reloj de pared tallado a mano con mecanismo silencioso.'
                        : product.category === 'mesa'
                          ? 'Mesa de madera maciza diseñada para uso intensivo diario.'
                          : 'Mueble de madera maciza con diseño artesanal y terminación personalizada.')}
                  </p>
                  <div className="mt-1 min-h-[30px] flex flex-wrap content-start gap-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-full bg-oliva/10 text-oliva">
                      {product.material.toUpperCase()}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-madera/10 text-madera">
                      {categoryContextLabels[product.category]}
                    </span>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-crema/80 text-[11px] text-madera px-2.5 py-1 border border-madera/15">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="M12 1.75a10.25 10.25 0 1 0 0 20.5 10.25 10.25 0 0 0 0-20.5Zm0 1.5a8.75 8.75 0 1 1 0 17.5 8.75 8.75 0 0 1 0-17.5Zm-.75 3.25c0-.41.34-.75.75-.75s.75.34.75.75v5.05l3.2 1.85a.75.75 0 0 1-.75 1.3l-3.6-2.08a.75 0 0 1-.35-.65V6.5Z" fill="currentColor" />
                    </svg>
                    <span>{product.leadTime ?? 'Fabricación 30-45 días'}</span>
                  </div>
                  <div className="mt-auto grid grid-cols-1 gap-2.5">
                    <a
                      href={`https://wa.me/5491144181328?text=${encodeURIComponent(`Hola ANJU, estoy interesado en ${product.name}. Quiero coordinar disponibilidad, medidas y opciones de terminación.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Consultar por WhatsApp"
                      className="btn-primary bg-oliva px-4 py-2.5 hover:bg-oliva/90"
                    >
                      Consultar por WhatsApp
                    </a>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        aria-label={`Solicitar a medida para ${product.name}`}
                        onClick={() => openBudgetRequestModal(product)}
                        className="btn-secondary border-oliva/40 text-oliva text-xs px-3 py-2.5"
                      >
                        Solicitar a medida
                      </button>
                      <button
                        type="button"
                        aria-label={`Ver rápido ${product.name}`}
                        onClick={() => {
                          setActiveImageIndex(0)
                          setQuickProduct(product)
                        }}
                        className="btn-secondary border-madera/25 text-madera text-xs px-3 py-2.5"
                      >
                        Ver rápido
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
      {quickProduct && (
        <div
          ref={(el) => {
            overlayRef.current = el
          }}
          className="fixed inset-0 z-30 opacity-0 bg-crema/70 backdrop-blur-sm transition-opacity duration-300 ease-out"
          onClick={() => setQuickProduct(null)}
        >
          <div
            ref={(el) => {
              contentRef.current = el
            }}
            className="mx-auto mt-10 sm:mt-16 max-w-3xl w-[92%] sm:w-[90%] rounded-3xl bg-white border border-madera/10 shadow-xl overflow-hidden translate-y-1 scale-95 opacity-0 transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-madera/10">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">{quickProduct.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setQuickProduct(null)}
                className="h-9 w-9 rounded-full border border-madera/20 bg-white/80 flex items-center justify-center text-madera hover:text-neutral-900 hover:bg-crema transition-all"
                aria-label="Cerrar vista rápida"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
                  <path d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.18 12 2.89 5.71 4.3 4.3 10.59 10.6 16.89 4.3z" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="grid sm:grid-cols-[1.6fr,1fr] gap-0">
              <div className="p-5">
                <div className="group relative rounded-2xl overflow-hidden border border-madera/10 bg-neutral-100">
                  <img
                    src={quickImages[quickActiveImageIndex]}
                    alt={`${quickProduct.name} en ${quickProduct.material} - foto ${quickActiveImageIndex + 1}`}
                    className="w-full h-64 sm:h-80 object-contain bg-crema/40 transition-opacity duration-500 ease-out cursor-zoom-in"
                    loading="lazy"
                    style={{ touchAction: 'pinch-zoom' }}
                  />
                  {hasQuickManyImages && (
                    <>
                      <button
                        type="button"
                        aria-label="Imagen anterior"
                        onClick={() =>
                          setActiveImageIndex(
                            (prev) => (prev - 1 + quickImages.length) % quickImages.length,
                          )
                        }
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-madera/15 bg-white/85 text-madera shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden="true">
                          <path d="M15.5 4.5 8 12l7.5 7.5-1.5 1.5L5 12l9-9 1.5 1.5Z" fill="currentColor" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label="Imagen siguiente"
                        onClick={() =>
                          setActiveImageIndex(
                            (prev) => (prev + 1) % quickImages.length,
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full border border-madera/15 bg-white/85 text-madera shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4 mx-auto" aria-hidden="true">
                          <path d="M8.5 4.5 7 6l7.5 6L7 18l1.5 1.5 9-7.5-9-7.5Z" fill="currentColor" />
                        </svg>
                      </button>
                      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 overflow-x-auto rounded-full bg-white/80 px-2 py-2 shadow-sm">
                        {quickImages.map((src, idx) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setActiveImageIndex(idx)}
                            className={`h-12 w-12 rounded-md overflow-hidden border ${idx === quickActiveImageIndex ? 'border-madera shadow-[0_0_0_2px_rgba(139,90,43,0.2)]' : 'border-transparent'} bg-white shadow-sm`}
                            aria-label={`Imagen ${idx + 1}`}
                            title={`Imagen ${idx + 1}`}
                          >
                            <img src={src} alt={`Miniatura ${idx + 1} de ${quickProduct.name} en ${quickProduct.material}`} className="w-full h-full object-cover" loading="lazy" />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="p-5 sm:p-6 flex flex-col gap-3.5">
                <p className="text-sm leading-relaxed text-neutral-700">
                  {quickProduct.description ??
                    (quickProduct.category === 'escritorio'
                      ? 'Superficie amplia y estructura reforzada, ideal para trabajo diario. Pasacables y terminación en madera natural.'
                      : quickProduct.category === 'reloj'
                        ? 'Reloj de pared tallado a mano con mecanismo silencioso. Diseñado para destacar en livings y estudios.'
                        : 'Mesa de madera maciza resistente al uso intensivo. Terminación artesanal y apta para 6 a 8 personas según modelo.')}
                </p>
                <p className="text-xs text-neutral-500">
                  {`${quickProduct.leadTime ?? 'Fabricación 30-45 días'} · Maderas: roble, pino, cedro · Acabados: natural, aceitado, laqueado.`}
                </p>
                <div className="mt-2 grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    aria-label={`Solicitar a medida para ${quickProduct.name}`}
                    onClick={() => openBudgetRequestModal(quickProduct)}
                    className="btn-primary bg-oliva hover:bg-oliva/90"
                  >
                    Solicitar a medida
                  </button>
                  <button
                    type="button"
                    aria-label={`Agregar ${quickProduct.name} al carrito`}
                    onClick={(e) => {
                      if (!quickProduct) return
                      handleAddToCart(quickProduct, e)
                    }}
                    className="relative overflow-hidden btn-secondary gap-2 border-madera/30 text-madera text-xs px-4 py-2.5"
                  >
                    {quickProduct && justAddedId === quickProduct.id ? (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.26 14h9.51c.84 0 1.58-.52 1.86-1.3l2.34-6.3H6.21L5.27 4H2v2h2l3.6 7.59-.68 1.55C6.53 15.37 7.04 16 7.74 16H19v-2H7.26ZM6.5 6h12.02l-1.7 4.58c-.12.32-.42.52-.76.52H8.53L6.5 6Z" fill="currentColor" />
                      </svg>
                    )}
                    <span>{quickProduct && justAddedId === quickProduct.id ? 'Agregado' : 'Agregar al carrito'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
