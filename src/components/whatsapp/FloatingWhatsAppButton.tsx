const WHATSAPP_NUMBER = '5491144181328'
const MESSAGE = 'Hola ANJU, quiero presupuesto para...'

export function FloatingWhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir conversación de WhatsApp con ANJU Carpintería"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30 group"
    >
      <div className="relative flex items-center gap-3 rounded-full bg-oliva text-white px-4 py-3 shadow-lg shadow-oliva/40 hover:shadow-xl hover:-translate-y-0.5 transition-all">
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-oliva/30 animate-whatsapp-pulse"
        />
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-6 w-6 fill-current"
          >
            <path d="M16 3C9.383 3 4 8.037 4 14.25c0 2.77 1.139 5.28 3.027 7.2L6 29l4.738-1.553A12.2 12.2 0 0 0 16 25.5c6.617 0 12-5.037 12-11.25C28 8.037 22.617 3 16 3Zm0 2c5.518 0 10 4.15 10 9.25 0 5.098-4.482 9.25-10 9.25-1.43 0-2.82-.293-4.104-.87l-.293-.131-2.82.926.566-3.41-.223-.234C7.01 18.149 6 16.246 6 14.25 6 9.15 10.482 5 16 5Zm-4.195 4.5a1.04 1.04 0 0 0-.777.373c-.203.24-.77.752-.77 1.835 0 1.083.79 2.13.898 2.277.112.149 1.558 2.473 3.84 3.37 1.9.75 2.288.687 2.695.644.406-.037 1.327-.54 1.513-1.061.187-.523.187-.972.133-1.063-.053-.093-.203-.148-.43-.26-.224-.112-1.327-.655-1.532-.73-.203-.075-.352-.112-.5.112-.148.223-.574.73-.703.88-.13.148-.26.168-.482.056-.224-.111-.944-.347-1.8-1.104-.664-.59-1.113-1.32-1.246-1.543-.13-.224-.014-.345.098-.456.1-.1.224-.26.335-.39.112-.13.149-.224.224-.373.074-.148.037-.28-.018-.392-.053-.111-.47-1.167-.664-1.6-.176-.4-.356-.061-.47-.037Z" />
          </svg>
        </div>
        <div className="flex flex-col text-[11px] sm:text-xs">
          <span className="font-semibold">WhatsApp ANJU</span>
          <span className="text-white/80">“Hola ANJU, quiero presupuesto...”</span>
        </div>
      </div>
    </a>
  )
}
