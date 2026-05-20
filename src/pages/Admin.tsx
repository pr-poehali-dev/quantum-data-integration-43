import { useState, useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"

const IMAGES_URL = "https://functions.poehali.dev/949d27bb-6532-4e69-8153-36842b4ab8dc"
const UPLOAD_URL = "https://functions.poehali.dev/32ee0d91-f0f5-4707-b28a-164eff4a908b"
const ADMIN_PASSWORD = "Admin2005"

interface SiteImage {
  url: string
  label: string
}

type ImagesMap = Record<string, SiteImage>

const SLOT_ORDER = [
  "hero_slide_1",
  "hero_slide_2",
  "hero_slide_3",
  "section_adults",
  "section_kids",
  "section_personal",
  "cta_background",
]

export default function Admin() {
  const [password, setPassword] = useState("")
  const [isAuth, setIsAuth] = useState(false)
  const [pwdError, setPwdError] = useState(false)
  const [images, setImages] = useState<ImagesMap>({})
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuth(true)
      setPwdError(false)
    } else {
      setPwdError(true)
    }
  }

  const fetchImages = async () => {
    setLoading(true)
    try {
      const res = await fetch(IMAGES_URL)
      const data = await res.json()
      setImages(data)
    } catch {
      setError("Не удалось загрузить изображения")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuth) fetchImages()
  }, [isAuth])

  const handleFileChange = async (slot: string, file: File) => {
    setUploading(slot)
    setError(null)
    try {
      const base64 = await fileToBase64(file)
      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": ADMIN_PASSWORD,
        },
        body: JSON.stringify({ data: base64, content_type: file.type }),
      })
      const uploadData = await res.json()
      if (!uploadData.ok) throw new Error(uploadData.error || "Ошибка загрузки")

      const saveRes = await fetch(IMAGES_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": ADMIN_PASSWORD,
        },
        body: JSON.stringify({ slot, url: uploadData.url }),
      })
      const saveData = await saveRes.json()
      if (!saveData.ok) throw new Error("Ошибка сохранения")

      setImages((prev) => ({
        ...prev,
        [slot]: { ...prev[slot], url: uploadData.url },
      }))
      setSaved(slot)
      setTimeout(() => setSaved(null), 3000)
    } catch (e: unknown) {
      setError((e as Error).message || "Ошибка")
    } finally {
      setUploading(null)
    }
  }

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(",")[1])
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Login screen
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://cdn.poehali.dev/files/221aaf0f-dbed-498d-bd8a-455ff43e4111.png"
              alt="Никамир"
              className="h-20 w-20 object-contain mb-4 drop-shadow-lg"
            />
            <h1 className="text-white font-black text-2xl tracking-widest">НИКАМИР</h1>
            <p className="text-amber-400 text-xs tracking-widest font-semibold mt-1">ПАНЕЛЬ УПРАВЛЕНИЯ</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-4 text-center">Введите пароль для входа</p>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setPwdError(false)
              }}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="Пароль"
              className={`w-full bg-gray-800 text-white px-4 py-3 rounded-lg border outline-none mb-3 text-base tracking-wider ${
                pwdError ? "border-red-500" : "border-gray-700 focus:border-amber-400"
              } transition-colors`}
            />
            {pwdError && (
              <p className="text-red-400 text-xs mb-3 flex items-center gap-1">
                <Icon name="AlertCircle" size={13} /> Неверный пароль
              </p>
            )}
            <button
              onClick={login}
              className="w-full bg-amber-400 hover:bg-amber-500 text-black font-black tracking-widest py-3 rounded-lg transition-colors text-sm"
            >
              ВОЙТИ
            </button>
          </div>

          <p className="text-center mt-4">
            <a href="/" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
              ← Вернуться на сайт
            </a>
          </p>
        </div>
      </div>
    )
  }

  // Admin panel
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.poehali.dev/files/221aaf0f-dbed-498d-bd8a-455ff43e4111.png"
              alt="Никамир"
              className="h-10 w-10 object-contain"
            />
            <div>
              <div className="font-black text-base tracking-widest leading-none">НИКАМИР</div>
              <div className="text-amber-400 text-xs tracking-widest">УПРАВЛЕНИЕ ФОТО</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
            >
              <Icon name="ExternalLink" size={14} /> Открыть сайт
            </a>
            <button
              onClick={() => setIsAuth(false)}
              className="text-gray-500 hover:text-red-400 text-xs flex items-center gap-1 transition-colors"
            >
              <Icon name="LogOut" size={14} /> Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-black tracking-wide mb-1">Фотографии сайта</h2>
          <p className="text-gray-500 text-sm">Нажмите на любое фото чтобы загрузить новое. Изменения применяются сразу.</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-950 border border-red-800 text-red-300 rounded-lg px-4 py-3 text-sm flex items-center gap-2">
            <Icon name="AlertTriangle" size={16} /> {error}
            <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-300">
              <Icon name="X" size={14} />
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <Icon name="Loader2" size={32} className="animate-spin" />
              <span className="text-sm">Загрузка...</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SLOT_ORDER.map((slot) => {
              const img = images[slot]
              if (!img) return null
              const isUploading = uploading === slot
              const isSaved = saved === slot

              return (
                <div key={slot} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
                  {/* Image preview */}
                  <div className="relative aspect-video bg-gray-800 overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Overlay on hover */}
                    <div
                      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                      onClick={() => !isUploading && fileRefs.current[slot]?.click()}
                    >
                      {isUploading ? (
                        <Icon name="Loader2" size={32} className="text-white animate-spin" />
                      ) : (
                        <>
                          <Icon name="Upload" size={28} className="text-amber-400 mb-2" />
                          <span className="text-white text-sm font-semibold">Загрузить новое фото</span>
                        </>
                      )}
                    </div>

                    {/* Saved indicator */}
                    {isSaved && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <Icon name="Check" size={12} /> Сохранено
                      </div>
                    )}

                    {/* Upload progress */}
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <div className="text-center">
                          <Icon name="Loader2" size={32} className="text-amber-400 animate-spin mx-auto mb-2" />
                          <span className="text-white text-xs">Загрузка...</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Label & action */}
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm font-semibold leading-none mb-0.5">{img.label}</p>
                      <p className="text-gray-600 text-xs font-mono">{slot}</p>
                    </div>
                    <button
                      onClick={() => !isUploading && fileRefs.current[slot]?.click()}
                      disabled={isUploading}
                      className="bg-gray-800 hover:bg-amber-400 hover:text-black text-gray-300 p-2 rounded-lg transition-colors disabled:opacity-50"
                      title="Загрузить новое фото"
                    >
                      <Icon name={isUploading ? "Loader2" : "ImagePlus"} size={18} className={isUploading ? "animate-spin" : ""} />
                    </button>
                  </div>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => { fileRefs.current[slot] = el }}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileChange(slot, file)
                      e.target.value = ""
                    }}
                  />
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-gray-500 text-xs leading-relaxed">
            <Icon name="Info" size={13} className="inline mr-1 text-gray-600" />
            Поддерживаются форматы: JPG, PNG, WebP, GIF. После замены фото обновите страницу сайта — изменения отобразятся сразу.
          </p>
        </div>
      </main>
    </div>
  )
}
