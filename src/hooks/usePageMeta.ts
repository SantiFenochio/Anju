import { useEffect } from 'react'

type PageMetaOptions = {
  title: string
  description: string
  keywords?: string
}

export function usePageMeta({ title, description, keywords }: PageMetaOptions) {
  useEffect(() => {
    if (typeof document === 'undefined') return

    const siteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
    const baseUrl = siteUrl || 'https://anju.com.ar'
    const canonicalUrl =
      typeof window !== 'undefined'
        ? `${baseUrl}${window.location.pathname}`
        : baseUrl

    document.title = title

    const ensureMetaByName = (name: string, content: string) => {
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

    const ensureMetaByProperty = (property: string, content: string) => {
      if (!content) return
      let element = document.querySelector<HTMLMetaElement>(
        `meta[property="${property}"]`,
      )
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute('property', property)
        document.head.appendChild(element)
      }
      element.content = content
    }

    const ensureCanonical = (href: string) => {
      let element = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!element) {
        element = document.createElement('link')
        element.rel = 'canonical'
        document.head.appendChild(element)
      }
      element.href = href
    }

    ensureMetaByName('description', description)
    if (keywords) {
      ensureMetaByName('keywords', keywords)
    }
    ensureMetaByProperty('og:title', title)
    ensureMetaByProperty('og:description', description)
    ensureMetaByProperty('og:url', canonicalUrl)
    ensureMetaByName('twitter:title', title)
    ensureMetaByName('twitter:description', description)
    ensureCanonical(canonicalUrl)
  }, [title, description, keywords])
}
