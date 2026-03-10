import type { ReactNode } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import type { Product } from '../../types/cart'
import { products } from '../../data/products'
import { FloatingWhatsAppButton } from '../whatsapp/FloatingWhatsAppButton'
import { NewsletterForm } from '../newsletter/NewsletterForm'

type LayoutProps = {
  children: ReactNode
}

const searchImagePlaceholder =
  'https://images.pexels.com/photos/3735410/pexels-photo-3735410.jpeg?auto=compress&cs=tinysrgb&w=400'

export function SiteLayout({ children }: LayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const trimmedQuery = searchQuery.trim().toLowerCase()

  const searchResults = useMemo(() => {
    if (!trimmedQuery) return []
    const matches = products.filter((product: Product) => {
      const name = product.name.toLowerCase()
      const category = product.category.toLowerCase()
      return name.includes(trimmedQuery) || category.includes(trimmedQuery)
    })
    return matches.slice(0, 8)
  }, [trimmedQuery])
  const footerBadgeRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const target = footerBadgeRef.current
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
  }, [location.pathname])

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.scroll-fade'),
    )
    if (!elements.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.classList.add('animate-fade-in', 'opacity-100')
            target.classList.remove('opacity-0')
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.2 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [location.pathname])

  const handleSelectProduct = (product: Product) => {
    navigate(`/catalogo#${product.id}`)
    setSearchQuery('')
    setIsMobileSearchOpen(false)
  }

  return (
    <div className="min-h-screen bg-crema text-neutral-900 flex flex-col scroll-smooth text-[15px] sm:text-base leading-relaxed">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-madera/10 bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-shrink-0"
          >
            <img
              src="/anju-logo.svg"
              alt="Logo ANJU"
              className="h-9 w-9 object-contain"
              loading="lazy"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold tracking-wide text-sm sm:text-base">
                ANJU Carpintería
              </span>
              <span className="text-xs text-neutral-600">
                Muebles con alma familiar
              </span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="group flex items-center w-full rounded-full border border-madera/30 bg-crema/70 px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-oliva/70 focus-within:ring-offset-0 transition-all">
              <div className="flex items-center justify-center h-7 w-7 rounded-full bg-madera/10 text-madera mr-2 group-focus-within:scale-110 group-hover:scale-105 transition-transform duration-150">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path
                    d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L18.5 20 20 18.5 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Buscar escritorios, relojes, mesas..."
                className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
            </div>
            {trimmedQuery && (
              <div className="absolute left-0 right-0 mt-2 rounded-2xl bg-white shadow-lg border border-madera/10 max-h-80 overflow-auto z-30">
                {searchResults.length > 0 ? (
                  <ul className="py-2">
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          aria-label={`Seleccionar ${product.name}`}
                          onClick={() => handleSelectProduct(product)}
                          className="w-full px-3 py-2 flex items-center gap-3 hover:bg-crema/60 transition-colors text-left"
                        >
                          <div className="h-10 w-10 rounded-md bg-neutral-100 overflow-hidden flex-shrink-0">
                            <img
                              src={searchImagePlaceholder}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                              {product.name}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-3 py-3 text-xs text-neutral-500">
                    Sin resultados para “{searchQuery}”.
                  </div>
                )}
              </div>
            )}
          </div>

          <nav className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base ml-auto">
            <button
              type="button"
              className="inline-flex items-center justify-center md:hidden h-11 w-11 rounded-full bg-madera text-white shadow-sm hover:bg-madera/90 hover:-translate-y-0.5 transition-all"
              onClick={() => setIsMobileSearchOpen(true)}
              aria-label="Abrir búsqueda de productos"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L18.5 20 20 18.5 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="inline-flex md:hidden items-center justify-center h-11 w-11 rounded-full bg-oliva text-white shadow-sm hover:bg-oliva/90 transition-all"
            >
              <svg viewBox="0 0 24 24" className={`h-6 w-6 transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} aria-hidden="true">
                <path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z" fill="currentColor" />
              </svg>
            </button>
            <div className="hidden sm:flex items-center gap-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-2 py-1 border-b-2 ${
                    isActive ? 'border-madera text-madera' : 'border-transparent text-neutral-700 hover:text-madera'
                  }`
                }
              >
                Inicio
              </NavLink>
              <NavLink
                to="/catalogo"
                className={({ isActive }) =>
                  `px-2 py-1 border-b-2 ${
                    isActive ? 'border-madera text-madera' : 'border-transparent text-neutral-700 hover:text-madera'
                  }`
                }
              >
                Catálogo
              </NavLink>
              <NavLink
                to="/muebles-a-medida"
                className={({ isActive }) =>
                  `px-2 py-1 border-b-2 ${
                    isActive ? 'border-madera text-madera' : 'border-transparent text-neutral-700 hover:text-madera'
                  }`
                }
              >
                Muebles a medida
              </NavLink>
              <NavLink
                to="/galeria"
                className={({ isActive }) =>
                  `px-2 py-1 border-b-2 ${
                    isActive ? 'border-madera text-madera' : 'border-transparent text-neutral-700 hover:text-madera'
                  }`
                }
              >
                Galería
              </NavLink>
              <NavLink
                to="/sobre-nosotros"
                className={({ isActive }) =>
                  `px-2 py-1 border-b-2 ${
                    isActive ? 'border-madera text-madera' : 'border-transparent text-neutral-700 hover:text-madera'
                  }`
                }
              >
                Sobre nosotros
              </NavLink>
            </div>
            <a
              href={`https://wa.me/5491144181328?text=${encodeURIComponent('Hola ANJU, quiero presupuesto para...')}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp ANJU"
              className="hidden sm:inline-flex items-center justify-center h-10 px-4 rounded-full bg-oliva text-white text-sm font-semibold hover:bg-oliva/90 transition-all"
            >
              WhatsApp
            </a>
          </nav>
        </div>
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height,opacity,transform,border-color] duration-200 bg-white ${isMobileMenuOpen ? 'max-h-[26rem] opacity-100 translate-y-0 border-b border-madera/10' : 'max-h-0 opacity-0 -translate-y-2 border-b border-transparent pointer-events-none'}`}
        >
          <div className="max-w-6xl mx-auto px-4 py-4 grid gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-madera text-white shadow-sm hover:bg-madera/90 transition-all"
                onClick={() => setIsMobileSearchOpen(true)}
                aria-label="Abrir búsqueda"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L18.5 20 20 18.5 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" fill="currentColor" />
                </svg>
              </button>
              <a
                href={`https://wa.me/5491144181328?text=${encodeURIComponent('Hola ANJU, quiero presupuesto para...')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp ANJU"
                className="inline-flex items-center justify-center h-11 px-4 rounded-full bg-oliva text-white text-sm font-semibold shadow-sm hover:bg-oliva/90 transition-all"
              >
                WhatsApp
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2 text-base">
              <NavLink to="/" className="px-3 py-3 rounded-md bg-crema/60 hover:bg-crema/80 transition-colors">
                Inicio
              </NavLink>
              <NavLink to="/catalogo" className="px-3 py-3 rounded-md bg-crema/60 hover:bg-crema/80 transition-colors">
                Catálogo
              </NavLink>
              <NavLink to="/muebles-a-medida" className="px-3 py-3 rounded-md bg-crema/60 hover:bg-crema/80 transition-colors">
                Muebles a medida
              </NavLink>
              <NavLink to="/galeria" className="px-3 py-3 rounded-md bg-crema/60 hover:bg-crema/80 transition-colors">
                Galería
              </NavLink>
              <NavLink to="/sobre-nosotros" className="px-3 py-3 rounded-md bg-crema/60 hover:bg-crema/80 transition-colors">
                Sobre nosotros
              </NavLink>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 pt-16">
        {children}
      </main>
      <footer className="bg-neutral-900 text-neutral-100 mt-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none wood-grain opacity-25" aria-hidden="true" />
        <div className="relative">
          <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
            <div>
              <img
                src="/anju-logo.svg"
                alt="Logo ANJU"
                className="h-8 w-8 object-contain mb-3"
                loading="lazy"
              />
              <h3 className="text-sm font-semibold tracking-wide text-crema">
                ANJU Carpintería familiar
              </h3>
              <p className="mt-3 text-sm text-neutral-300">
                Más de 30 años diseñando y construyendo muebles de madera maciza a medida en Buenos Aires.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-crema">
                Contacto
              </h3>
              <div className="mt-3 flex items-start gap-2 text-sm text-neutral-300">
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-madera mt-0.5" aria-hidden="true">
                  <path d="M12 3c-3.3 0-6 2.6-6 5.9 0 4.2 5.1 9.7 5.3 9.9.4.4 1 .4 1.4 0 .2-.2 5.3-5.7 5.3-9.9C18 5.6 15.3 3 12 3Zm0 8.1c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2c0 1.2-1 2.2-2.2 2.2Z" fill="currentColor" />
                </svg>
                <span>Av. Brig. Gral. Juan Manuel de Rosas 4933, B1655 Villa Ballester, Provincia de Buenos Aires</span>
              </div>
              <p className="mt-1 text-sm text-neutral-300">
                Tel / WhatsApp: +54 9 11 4418-1328
              </p>
              <p className="mt-1 text-sm text-neutral-300">
                Email: anju-time@hotmail.com
              </p>
              <p className="mt-3 text-xs text-neutral-400">
                También podés escribirnos desde el{' '}
                <Link
                  to="/contacto"
                  className="underline underline-offset-2 text-crema hover:text-white transition-colors"
                >
                  formulario de contacto
                </Link>
                .
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-madera/30 text-madera hover:text-crema hover:border-crema/40 transition-all"
                  aria-label="Instagram ANJU Carpintería"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d="M16.5 3h-9A4.5 4.5 0 0 0 3 7.5v9A4.5 4.5 0 0 0 7.5 21h9a4.5 4.5 0 0 0 4.5-4.5v-9A4.5 4.5 0 0 0 16.5 3Zm3 13.5a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9ZM12 8.25A3.75 3.75 0 1 0 15.75 12 3.75 3.75 0 0 0 12 8.25Zm0 6A2.25 2.25 0 1 1 14.25 12 2.25 2.25 0 0 1 12 14.25Zm4.125-6.9a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-madera/30 text-madera hover:text-crema hover:border-crema/40 transition-all"
                  aria-label="Facebook ANJU Carpintería"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                    <path d="M13.2 9.1V7.6c0-.7.3-1.1 1.2-1.1h1.4V4.2c-.7-.1-1.5-.2-2.2-.2-2.3 0-3.8 1.4-3.8 3.9v1.2H7.7v2.5h2.1V20h3v-8.4h2.4l.4-2.5h-2.8Z" fill="currentColor" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-crema">
                Taller y entregas
              </h3>
              <p className="mt-3 text-sm text-neutral-300">
                Atendemos mayoristas B2B y clientes finales B2C en CABA y Zona Norte.
              </p>
              <div className="mt-3 rounded-md overflow-hidden border border-madera/30 shadow-madera h-40 transition-shadow">
                <iframe
                  title="Mapa ANJU Carpintería Buenos Aires"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164273.66742066163!2d-58.57338464126919!3d-34.6158037807711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccb627c9f0f0f%3A0x5c0c1a7d3c4aa1c7!2sBuenos%20Aires!5e0!3m2!1ses-419!2sar!4v1700000000000!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
          <div className="border-t border-neutral-800">
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="text-xs text-neutral-500">
                © {new Date().getFullYear()} ANJU Carpintería familiar. Todos los derechos reservados.
              </span>
              <span className="text-xs text-neutral-500">
                Hecho a mano en Buenos Aires.
              </span>
              <span
                ref={footerBadgeRef}
                className="inline-flex items-center gap-2 rounded-full border border-madera/30 bg-madera/15 px-3 py-1 text-[11px] text-crema opacity-0"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M4.5 21.5c4.6-.1 8.8-3 11.3-7.5 1.5-2.7 2.6-6.1 2.2-9.2-.1-.7-.9-1.1-1.5-.8-3.1 1.3-5.9 3.2-8.1 5.6-2.5 2.6-4.1 5.7-4.6 9.1-.1.6.3 1 .7 1.1Zm4.3-5.8c1.7-2 3.7-3.7 5.9-5-1.8 1.6-3.4 3.4-4.7 5.4-.8 1.2-1.4 2.4-1.9 3.7-.2 0-.5.1-.7.1.1-1.4.6-2.8 1.4-4.2Z" fill="currentColor" />
                </svg>
                <span>Hecho a mano en Buenos Aires desde 1990 • Madera responsable</span>
              </span>
              <span className="inline-flex items-center gap-2 text-[11px] text-neutral-400">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-madera" aria-hidden="true">
                  <path d="M12 3c-3.3 0-6 2.6-6 5.9 0 4.2 5.1 9.7 5.3 9.9.4.4 1 .4 1.4 0 .2-.2 5.3-5.7 5.3-9.9C18 5.6 15.3 3 12 3Zm0 8.1c-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2s2.2 1 2.2 2.2c0 1.2-1 2.2-2.2 2.2Z" fill="currentColor" />
                </svg>
                <span>Av. Brig. Gral. Juan Manuel de Rosas 4933, B1655 Villa Ballester, Provincia de Buenos Aires</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
      <FloatingWhatsAppButton />
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden">
          <div className="absolute inset-x-0 top-0 bg-white rounded-b-3xl shadow-lg pt-3 pb-4 px-4 space-y-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileSearchOpen(false)
                  setSearchQuery('')
                }}
                className="h-9 w-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 transition-colors"
                aria-label="Cerrar búsqueda"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                >
                  <path
                    d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.18 12 2.89 5.71 4.3 4.3 10.59 10.6 16.89 4.3z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <div className="group flex items-center flex-1 rounded-full border border-madera/30 bg-crema/80 px-3 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-oliva/70 focus-within:ring-offset-0 transition-all">
                <div className="flex items-center justify-center h-7 w-7 rounded-full bg-madera/10 text-madera mr-2 group-focus-within:scale-110 group-hover:scale-105 transition-transform duration-150">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                  >
                    <path
                      d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L18.5 20 20 18.5 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Buscar en el catálogo ANJU..."
                  className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-[70vh] overflow-auto -mx-1 px-1">
              {trimmedQuery ? (
                searchResults.length > 0 ? (
                  <ul className="space-y-1">
                    {searchResults.map((product) => (
                      <li key={product.id}>
                        <button
                          type="button"
                          aria-label={`Seleccionar ${product.name}`}
                          onClick={() => handleSelectProduct(product)}
                          className="w-full px-3 py-2.5 flex items-center gap-3 rounded-2xl bg-white border border-madera/10 hover:bg-crema/70 transition-colors text-left"
                        >
                          <div className="h-11 w-11 rounded-md bg-neutral-100 overflow-hidden flex-shrink-0">
                            <img
                              src={searchImagePlaceholder}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-neutral-900 truncate">
                              {product.name}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-2 py-4 text-xs text-neutral-500">
                    Sin resultados para “{searchQuery}”.
                  </div>
                )
              ) : (
                <div className="px-2 py-4 text-xs text-neutral-500">
                  Empezá a escribir para buscar escritorios, relojes, mesas y más.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
