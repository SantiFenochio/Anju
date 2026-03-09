import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { GalleryPage } from './pages/GalleryPage'
import { AboutPage } from './pages/AboutPage'
import { CartPage } from './pages/CartPage'
import { CustomFurniturePage } from './pages/CustomFurniturePage'
import { TestimonialsPage } from './pages/TestimonialsPage'
import { ContactPage } from './pages/ContactPage'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <SiteLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogPage />} />
            <Route path="/galeria" element={<GalleryPage />} />
            <Route path="/sobre-nosotros" element={<AboutPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/muebles-a-medida" element={<CustomFurniturePage />} />
            <Route path="/testimonios" element={<TestimonialsPage />} />
            <Route path="/contacto" element={<ContactPage />} />
          </Routes>
        </SiteLayout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
