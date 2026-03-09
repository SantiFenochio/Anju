import type { Product } from '../types/cart'
import { supabase } from './supabase/client'

export function openBudgetRequestModal(product?: Product) {
  const subject = product
    ? `Presupuesto a medida · ${product.name}`
    : 'Presupuesto a medida · ANJU Carpintería'

  const bodyLines = [
    'Hola ANJU, quiero solicitar un presupuesto a medida.',
    '',
    product ? `Producto de referencia: ${product.name}` : 'Producto de referencia: (completar)',
    '',
    'Tipo de proyecto (hogar/oficina/local):',
    'Medidas aproximadas:',
    'Cantidad de unidades:',
    'Ubicación (CABA / Zona Norte):',
    '',
    '¡Gracias!',
  ]

  const mailto = `mailto:anju-time@hotmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(bodyLines.join('\n'))}`

  if (supabase) {
    void supabase
      .from('budget_requests')
      .insert({
        product_id: product?.id ?? null,
        product_name: product?.name ?? null,
        created_at: new Date().toISOString(),
      })
  }

  window.location.href = mailto
}
