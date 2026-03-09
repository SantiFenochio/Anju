import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { CartItem, Product } from '../types/cart'
import { supabase } from '../services/supabase/client'

const STORAGE_KEY = 'anju_cart'

type CartContextValue = {
  items: CartItem[]
  addToCart: (product: Product) => void
  totalItems: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

type CartProviderProps = {
  children: ReactNode
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return []
      const parsed = JSON.parse(raw) as CartItem[]
      if (!Array.isArray(parsed)) return []
      return parsed
    } catch {
      return []
    }
  })

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    return { totalItems }
  }, [items])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }

    const sync = async () => {
      if (!supabase) return

      const { data: user } = await supabase.auth.getUser()
      if (!user?.user) return

      await supabase.from('carts').upsert(
        {
          user_id: user.user.id,
          items,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      )
    }

    void sync()
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        totalItems: summary.totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return ctx
}
