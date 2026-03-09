import { useEffect } from 'react'

type PageMetaOptions = {
  title: string
  description: string
  keywords?: string
}

export function usePageMeta({ title, description, keywords }: PageMetaOptions) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    document.title = title

    const ensureMeta = (name: string, content: string) => {
      if (!content) return
      let element = document.querySelector<HTMLMetaElement>(
        `meta[name="${name}"]`,
      )
      if (!element) {
        element = document.createElement('meta')
        element.name = name
        document.head.appendChild(element)
      }
      element.content = content
    }

    ensureMeta('description', description)
    if (keywords) {
      ensureMeta('keywords', keywords)
    }
  }, [title, description, keywords])
}
