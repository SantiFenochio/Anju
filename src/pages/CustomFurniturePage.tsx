import type { FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'

export function CustomFurniturePage() {
  usePageMeta({
    title: 'Muebles y placares a medida en Villa Ballester · ANJU Carpintería',
    description:
      'Solicitá muebles y placares a medida con ANJU Carpintería en Villa Ballester, Buenos Aires. Diseñamos proyectos personalizados para CABA y Zona Norte.',
    keywords:
      'placares a medida zona norte, muebles a medida Villa Ballester, carpintería a medida Buenos Aires, presupuesto muebles de madera',
  })
  const [isLoading, setIsLoading] = useState(true)

  const [formData, setFormData] = useState({
    tipo: '',
    madera: '',
    acabado: '',
    medidas: '',
    nombre: '',
    email: '',
    whatsapp: '',
    descripcion: '',
  })

  const [config, setConfig] = useState({
    type: 'escritorio',
    material: 'roble',
    finish: 'mate',
    dimensions: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [configError, setConfigError] = useState('')
  const [submitError, setSubmitError] = useState('')

  const materialConfig = {
    roble: {
      name: 'Roble',
      color: '#8B5A2B',
      img: 'https://images.pexels.com/photos/3965534/pexels-photo-3965534.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    pino: {
      name: 'Pino claro',
      color: '#D8C7A0',
      img: 'https://images.pexels.com/photos/3965552/pexels-photo-3965552.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    cedro: {
      name: 'Cedro',
      color: '#A65A3A',
      img: 'https://images.pexels.com/photos/7652083/pexels-photo-7652083.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  } as const

  const configuratorPreview = {
    roble: {
      escritorio:
        'https://images.pexels.com/photos/3747447/pexels-photo-3747447.jpeg?auto=compress&cs=tinysrgb&w=900',
      mesa: 'https://images.pexels.com/photos/37347/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=900',
      reloj:
        'https://images.pexels.com/photos/1007335/pexels-photo-1007335.jpeg?auto=compress&cs=tinysrgb&w=900',
    },
    pino: {
      escritorio:
        'https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=900',
      mesa: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=900',
      reloj:
        'https://images.pexels.com/photos/707676/pexels-photo-707676.jpeg?auto=compress&cs=tinysrgb&w=900',
    },
    cedro: {
      escritorio:
        'https://images.pexels.com/photos/705439/pexels-photo-705439.jpeg?auto=compress&cs=tinysrgb&w=900',
      mesa: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=900',
      reloj:
        'https://images.pexels.com/photos/707676/pexels-photo-707676.jpeg?auto=compress&cs=tinysrgb&w=900',
    },
  } as const

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

  const previewImg =
    (materialConfig as Record<string, { img: string }>)[formData.madera]?.img ??
    'https://images.pexels.com/photos/3735481/pexels-photo-3735481.jpeg?auto=compress&cs=tinysrgb&w=800'

  const previewType = config.type === 'estanteria' ? 'escritorio' : config.type
  const previewConfigImage =
    configuratorPreview[config.material as keyof typeof configuratorPreview]?.[
      previewType as keyof (typeof configuratorPreview)['roble']
    ] ?? configuratorPreview.roble.escritorio

  const finishMap = {
    mate: 'mate',
    brillo: 'brillante',
    natural: 'a-definir',
  } as const

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const target = event.currentTarget
    const value = target.value
    setFormData((prev) => ({
      ...prev,
      [target.name]: value,
    }))
    setErrors((prev) => {
      if (!prev[target.name]) return prev
      const next = { ...prev }
      delete next[target.name]
      return next
    })
    if (submitError) {
      setSubmitError('')
    }
    if (configError) {
      setConfigError('')
    }
  }

  const clearFieldError = (fieldName: string) => {
    setErrors((prev) => {
      if (!prev[fieldName]) return prev
      const next = { ...prev }
      delete next[fieldName]
      return next
    })
    if (submitError) {
      setSubmitError('')
    }
    if (configError) {
      setConfigError('')
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  const handleConfigChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = event.currentTarget
    setConfig((prev) => ({
      ...prev,
      [target.name]: target.value,
    }))
    if (target.name === 'dimensions') {
      setErrors((prev) => {
        if (!prev.medidas) return prev
        const next = { ...prev }
        delete next.medidas
        return next
      })
      if (submitError) {
        setSubmitError('')
      }
    }
    if (target.name === 'finish') {
      clearFieldError('acabado')
    }
    if (configError) {
      setConfigError('')
    }
  }

  const buildRequestData = () => ({
    tipo: config.type,
    medidas: config.dimensions.trim(),
    madera: config.material,
    acabado: finishMap[config.finish as keyof typeof finishMap],
    nombre: formData.nombre.trim(),
    email: formData.email.trim(),
    whatsapp: formData.whatsapp.trim(),
    descripcion: formData.descripcion.trim(),
  })

  const validateConfigData = (data: ReturnType<typeof buildRequestData>) => {
    const nextErrors: Record<string, string> = {}
    if (!data.tipo) nextErrors.tipo = 'Seleccioná un tipo de mueble.'
    if (!data.madera) nextErrors.madera = 'Seleccioná una madera.'
    if (!data.acabado) nextErrors.acabado = 'Seleccioná un acabado.'
    if (!data.medidas) nextErrors.medidas = 'Indicá medidas aproximadas.'
    return nextErrors
  }

  const validateFullData = (data: ReturnType<typeof buildRequestData>) => {
    const nextErrors = validateConfigData(data)
    if (!data.nombre) nextErrors.nombre = 'Ingresá tu nombre y apellido.'
    if (!data.email) nextErrors.email = 'Ingresá tu email.'
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = 'Ingresá un email válido.'
    }
    if (!data.whatsapp) nextErrors.whatsapp = 'Ingresá tu WhatsApp.'
    if (!data.descripcion) {
      nextErrors.descripcion = 'Contanos brevemente sobre el espacio y uso.'
    }

    return nextErrors
  }

  const openWhatsApp = (requestData: ReturnType<typeof buildRequestData>) => {
    const selectedMaterial =
      materialConfig[requestData.madera as keyof typeof materialConfig]?.name ??
      requestData.madera
    const messageLines = [
      'Hola ANJU, quiero solicitar un mueble a medida.',
      `Tipo de mueble: ${requestData.tipo}`,
      `Madera: ${selectedMaterial}`,
      `Acabado: ${requestData.acabado}`,
      `Medidas aproximadas: ${requestData.medidas}`,
    ]
    if (requestData.descripcion) {
      messageLines.push(`Descripción adicional: ${requestData.descripcion}`)
    }
    if (requestData.nombre || requestData.email || requestData.whatsapp) {
      messageLines.push('')
      if (requestData.nombre) {
        messageLines.push(`Nombre: ${requestData.nombre}`)
      }
      if (requestData.email) {
        messageLines.push(`Email: ${requestData.email}`)
      }
      if (requestData.whatsapp) {
        messageLines.push(`WhatsApp: ${requestData.whatsapp}`)
      }
    }
    const message = messageLines.join('\n')
    window.open(
      `https://wa.me/5491144181328?text=${encodeURIComponent(message)}`,
      '_blank',
    )
  }

  const handleContinueWithDesign = () => {
    const requestData = buildRequestData()
    const nextErrors = validateConfigData(requestData)
    if (Object.keys(nextErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        ...nextErrors,
      }))
      setConfigError('Completá los datos mínimos para continuar por WhatsApp.')
      return
    }
    setErrors((prev) => {
      const next = { ...prev }
      delete next.tipo
      delete next.madera
      delete next.acabado
      delete next.medidas
      return next
    })
    setConfigError('')
    openWhatsApp(requestData)
  }

  const handleSubmitRequest = () => {
    const requestData = buildRequestData()
    const nextErrors = validateFullData(requestData)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSubmitError(
        'Completá los campos obligatorios para enviar la solicitud por WhatsApp.',
      )
      return
    }
    setErrors({})
    setSubmitError('')
    openWhatsApp(requestData)
  }

  const fieldClass =
    'w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-800 transition-colors placeholder:text-neutral-400 hover:border-madera/35 focus:outline-none focus:ring-2 focus:ring-oliva/60'
  const labelClass = 'block text-sm font-semibold text-neutral-900'

  return (
    <div className="page-shell max-w-4xl">
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
          <li className="text-madera">Muebles a medida</li>
        </ol>
      </nav>
      <section className="space-y-3">
        <h1 className="heading-h1">
          Muebles y placares a medida en Buenos Aires
        </h1>
        <p className="text-base text-neutral-700">
          Contanos qué necesitás y preparamos un diseño y presupuesto a medida
          para tu hogar, oficina o local en CABA y Zona Norte.
        </p>
      </section>

      <section className="rounded-3xl border border-madera/10 bg-white section-card space-y-7 shadow-madera scroll-fade opacity-0 transition-all duration-300">
        <div className="space-y-2.5">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-oliva">
            Configurador rápido
          </p>
          <h2 className="heading-h2">
            Definí tu mueble ideal
          </h2>
          <p className="text-base text-neutral-700 max-w-2xl">
            Seleccioná el tipo, la madera, el acabado y las medidas para avanzar
            con tu solicitud personalizada.
          </p>
        </div>
        <div className="grid gap-7 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <div className="space-y-2.5 text-sm">
              <p className="font-semibold text-neutral-900">Tipo de mueble</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { key: 'escritorio', label: 'Escritorio' },
                  { key: 'mesa', label: 'Mesa' },
                  { key: 'reloj', label: 'Reloj' },
                  { key: 'estanteria', label: 'Estantería' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    aria-pressed={config.type === item.key}
                    onClick={() => {
                      setConfig((prev) => ({
                        ...prev,
                        type: item.key,
                      }))
                      clearFieldError('tipo')
                    }}
                    className={`rounded-2xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-oliva/50 ${config.type === item.key ? 'border-madera/60 bg-gradient-to-br from-crema to-white text-madera shadow-[0_10px_24px_rgba(139,90,43,0.14)] -translate-y-0.5' : 'border-neutral-200 text-neutral-700 hover:border-madera/35 hover:text-madera hover:shadow-sm hover:-translate-y-0.5'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {errors.tipo ? (
                <p className="text-xs text-red-600">{errors.tipo}</p>
              ) : null}
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2.5 text-sm">
                <p className="font-semibold text-neutral-900">Madera</p>
                <div className="grid grid-cols-3 gap-2.5">
                  {Object.entries(materialConfig).map(([key, conf]) => (
                    <button
                      key={key}
                      type="button"
                      aria-label={`Seleccionar madera ${conf.name}`}
                      aria-pressed={config.material === key}
                      onClick={() => {
                        setConfig((prev) => ({
                          ...prev,
                          material: key,
                        }))
                        clearFieldError('madera')
                      }}
                      className={`group rounded-xl border p-1.5 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-oliva/50 ${config.material === key ? 'border-madera/60 bg-crema/60 shadow-sm' : 'border-neutral-200 bg-white hover:border-madera/35'}`}
                      title={conf.name}
                    >
                      <span
                        className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-neutral-300 transition-transform duration-200 group-hover:scale-105 ${config.material === key ? 'ring-2 ring-madera ring-offset-2 ring-offset-white' : ''}`}
                        style={{
                          backgroundImage:
                            `repeating-linear-gradient(45deg, ${conf.color}, ${conf.color} 8px, ${shadeColor(conf.color, -10)} 12px, ${conf.color} 16px)`,
                          backgroundSize: '200% 200%',
                        }}
                      />
                      <span className="mt-1.5 block text-[11px] font-medium text-neutral-700">
                        {conf.name}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.madera ? (
                  <p className="text-xs text-red-600">{errors.madera}</p>
                ) : null}
              </div>
              <div className="space-y-2.5 text-sm">
                <p className="font-semibold text-neutral-900">Acabado</p>
                <select
                  name="finish"
                  value={config.finish}
                  onChange={handleConfigChange}
                  className={`${fieldClass} ${errors.acabado ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                  aria-invalid={Boolean(errors.acabado)}
                >
                  <option value="mate">Mate</option>
                  <option value="brillo">Brillo</option>
                  <option value="natural">Natural</option>
                </select>
                {errors.acabado ? (
                  <p className="text-xs text-red-600">{errors.acabado}</p>
                ) : null}
              </div>
            </div>
            <div className="space-y-2.5 text-sm">
              <label className={labelClass} htmlFor="config-dimensions">
                Medidas aproximadas
              </label>
              <input
                id="config-dimensions"
                name="dimensions"
                value={config.dimensions}
                onChange={handleConfigChange}
                placeholder="Ej: 180 x 80 cm, altura 75 cm"
                className={`${fieldClass} ${errors.medidas ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                aria-invalid={Boolean(errors.medidas)}
              />
              {errors.medidas ? (
                <p className="text-xs text-red-600">{errors.medidas}</p>
              ) : null}
            </div>
          </div>
          <div className="rounded-2xl border border-madera/15 bg-crema/60 card-pad space-y-4 shadow-sm transition-all duration-300">
            <div className="rounded-2xl overflow-hidden border border-madera/10 bg-white">
              <img
                src={previewConfigImage}
                alt={`Vista previa de ${config.type} a medida en ${materialConfig[config.material as keyof typeof materialConfig]?.name}`}
                className="w-full h-44 sm:h-48 object-cover"
                loading="lazy"
              />
            </div>
            <button
              type="button"
              onClick={handleContinueWithDesign}
              className="btn-primary w-full px-4 py-3.5"
            >
              Continuar con este diseño
            </button>
            {configError ? (
              <p className="text-xs text-red-600">{configError}</p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-madera/10 bg-crema/60 card-pad space-y-2.5 shadow-sm">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-oliva">
          Antes de enviar
        </p>
        <p className="text-sm text-neutral-700">
          Para recibir una propuesta más precisa, compartinos medidas aproximadas,
          una foto de referencia y el uso principal del mueble.
        </p>
      </section>

      {isLoading ? (
        <div className="rounded-3xl border border-madera/10 bg-white section-card space-y-4">
          <div className="h-48 rounded-2xl skeleton-shimmer animate-shimmer bg-crema/60" />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-3 w-36 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
              <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-40 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
              <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`custom-skeleton-${index}`} className="space-y-2">
                <div className="h-3 w-28 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
                <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="h-3 w-32 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
              <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
              <div className="h-10 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-52 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
            <div className="h-28 rounded-md skeleton-shimmer animate-shimmer bg-crema/60" />
          </div>
          <div className="h-11 w-48 rounded-full skeleton-shimmer animate-shimmer bg-crema/60" />
        </div>
      ) : (
        <form
          onSubmit={(event) => event.preventDefault()}
          className="rounded-3xl border border-madera/10 bg-white section-card space-y-7 shadow-madera scroll-fade opacity-0"
        >
          {submitError ? (
            <div className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          ) : null}
          <div className="rounded-2xl overflow-hidden border border-madera/10 bg-neutral-100">
            <img
              src={previewImg}
              alt={`Vista previa del mueble a medida en ${formData.madera || 'madera seleccionada'}`}
              className="w-full h-40 sm:h-56 object-cover"
              loading="lazy"
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 text-sm">
              <label className={labelClass} htmlFor="tipo">
                Tipo de mueble
              </label>
              <input
                id="tipo"
                name="tipo"
                required
                value={formData.tipo}
                onChange={handleChange}
                placeholder="Ej: Escritorio en L, mesa de comedor, estantería..."
                className={`${fieldClass} ${errors.tipo ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                aria-invalid={Boolean(errors.tipo)}
              />
              {errors.tipo ? (
                <p className="text-xs text-red-600">{errors.tipo}</p>
              ) : null}
            </div>
            <div className="space-y-2 text-sm">
              <label className={labelClass} htmlFor="medidas">
                Medidas aproximadas
              </label>
              <input
                id="medidas"
                name="medidas"
                required
                value={formData.medidas}
                onChange={handleChange}
                placeholder="Ej: 180 x 80 cm, altura 75 cm"
                className={`${fieldClass} ${errors.medidas ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                aria-invalid={Boolean(errors.medidas)}
              />
              {errors.medidas ? (
                <p className="text-xs text-red-600">{errors.medidas}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2 text-sm">
              <label className={labelClass} htmlFor="madera">
                Madera preferida
              </label>
              <select
                id="madera"
                name="madera"
                value={formData.madera}
                onChange={handleChange}
                className={`${fieldClass} ${errors.madera ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                aria-invalid={Boolean(errors.madera)}
              >
                <option value="roble">Roble</option>
                <option value="pino">Pino</option>
                <option value="cedro">Cedro</option>
                <option value="otro">Otro / a definir</option>
              </select>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {Object.entries(materialConfig).map(([key, conf]) => (
                  <button
                    key={key}
                    type="button"
                    aria-label={`Seleccionar material: ${conf.name}`}
                    aria-pressed={formData.madera === key}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        madera: key,
                      }))
                      clearFieldError('madera')
                    }}
                    className={`group rounded-xl border p-1.5 text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-oliva/50 ${formData.madera === key ? 'border-madera/60 bg-crema/60 shadow-sm' : 'border-neutral-200 bg-white hover:border-madera/35'}`}
                    title={conf.name}
                  >
                    <span
                      className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-neutral-300 transition-transform duration-200 group-hover:scale-105 ${formData.madera === key ? 'ring-2 ring-madera ring-offset-2 ring-offset-white' : ''}`}
                      style={{
                        backgroundImage:
                          `repeating-linear-gradient(45deg, ${conf.color}, ${conf.color} 8px, ${shadeColor(conf.color, -10)} 12px, ${conf.color} 16px)`,
                        backgroundSize: '200% 200%',
                      }}
                    />
                    <span className="mt-1 block text-[10px] font-medium text-neutral-700">
                      {conf.name}
                    </span>
                  </button>
                ))}
              </div>
              {errors.madera ? (
                <p className="text-xs text-red-600">{errors.madera}</p>
              ) : null}
            </div>
            <div className="space-y-2 text-sm">
              <label className={labelClass} htmlFor="acabado">
                Acabado
              </label>
              <select
                id="acabado"
                name="acabado"
                value={formData.acabado}
                onChange={handleChange}
                className={`${fieldClass} ${errors.acabado ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                aria-invalid={Boolean(errors.acabado)}
              >
                <option value="mate">Mate</option>
                <option value="satinado">Satinado</option>
                <option value="brillante">Brillante</option>
                <option value="a-definir">A definir juntos</option>
              </select>
              {errors.acabado ? (
                <p className="text-xs text-red-600">{errors.acabado}</p>
              ) : null}
            </div>
            <div className="space-y-2 text-sm">
              <label className={labelClass} htmlFor="whatsapp">
                WhatsApp
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                required
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+54 9 11 ..."
                className={`${fieldClass} ${errors.whatsapp ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                aria-invalid={Boolean(errors.whatsapp)}
              />
              {errors.whatsapp ? (
                <p className="text-xs text-red-600">{errors.whatsapp}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 text-sm">
              <label className={labelClass} htmlFor="nombre">
                Nombre y apellido
              </label>
              <input
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className={`${fieldClass} ${errors.nombre ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                aria-invalid={Boolean(errors.nombre)}
              />
              {errors.nombre ? (
                <p className="text-xs text-red-600">{errors.nombre}</p>
              ) : null}
            </div>
            <div className="space-y-2 text-sm">
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`${fieldClass} ${errors.email ? 'border-red-400 ring-2 ring-red-200' : ''}`}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="text-xs text-red-600">{errors.email}</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <label className={labelClass} htmlFor="descripcion">
              Contanos sobre el espacio y el uso
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              required
              rows={4}
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Ej: Escritorio para home office en living, espacio reducido, necesito cajones y pasacables..."
              className={`${fieldClass} ${errors.descripcion ? 'border-red-400 ring-2 ring-red-200' : ''}`}
              aria-invalid={Boolean(errors.descripcion)}
            />
            {errors.descripcion ? (
              <p className="text-xs text-red-600">{errors.descripcion}</p>
            ) : null}
            <p className="text-xs text-neutral-500">
              Si tenés referencias (links, Instagram, Pinterest) podés pegarlas
              acá también.
            </p>
          </div>

          <p className="text-xs text-neutral-500">
            Para cotizar más rápido, enviá por WhatsApp medidas aproximadas y una foto de referencia.
          </p>

          <button
            type="button"
            onClick={handleSubmitRequest}
            aria-label="Enviar solicitud"
            className="btn-primary w-full text-base px-6 py-4 shadow-[0_14px_30px_rgba(139,90,43,0.28)]"
          >
            Enviar pedido por WhatsApp
          </button>
        </form>
      )}
    </div>
  )
}
