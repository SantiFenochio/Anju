export type ProductCategory = 'escritorio' | 'reloj' | 'mesa'

export type ProductMaterial = 'roble' | 'pino' | 'cedro'

export type Product = {
  id: string
  name: string
  category: ProductCategory
  material: ProductMaterial
  description?: string
}

export type CartItem = {
  product: Product
  quantity: number
}
