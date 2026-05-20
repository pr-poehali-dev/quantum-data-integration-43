import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Icon from "@/components/ui/icon"
import { useState } from "react"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const slides = [
    {
      image: "https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/cce36030-4f37-43d0-a972-0ba0d909dbae.jpg",
      alt: "Спарринг в боксёрском зале Никамир",
    },
    {
      image: "https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7832caa6-7685-4b62-801f-750660e099ac.jpg",
      alt: "Тренировка на мешке в клубе Никамир",
    },
    {
      image: "https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7008a70d-944a-4339-a6d9-5e2368fed57e.jpg",
      alt: "Тренер и ученик в клубе Никамир",
    },
  ]

  const navItems = [
    { name: "Главная", href: "#hero" },
    { name: "О нас", href: "#mission" },
    { name: "Секции", href: "#community" },
    { name: "Отзывы", href: "#testimonials" },
    { name: "Запись", href: "#join" },
  ]

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${slides[currentSlide].image}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-4 py-4 md:px-8 md:py-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="https://cdn.poehali.dev/files/221aaf0f-dbed-498d-bd8a-455ff43e4111.png"
            alt="Никамир — Клуб Бокса"
            className="h-14 w-14 md:h-16 md:w-16 object-contain drop-shadow-lg"
          />
          <div className="text-white hidden sm:block">
            <div className="font-black text-lg tracking-widest leading-none">НИКАМИР</div>
            <div className="text-xs tracking-widest text-amber-300 font-semibold">КЛУБ БОКСА · КРАСНОДАР</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="relative text-white hover:text-amber-300 transition-colors duration-300 font-semibold tracking-wide pb-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-amber-300 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <Icon name="X" size={26} /> : <Icon name="Menu" size={26} />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/95 z-30 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <img
              src="https://cdn.poehali.dev/files/221aaf0f-dbed-498d-bd8a-455ff43e4111.png"
              alt="Никамир"
              className="h-24 w-24 object-contain mb-4"
            />
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-white text-2xl font-black tracking-wider hover:text-amber-300 transition-colors duration-300"
              >
                {item.name}
              </button>
            ))}
            <div className="mt-4 text-amber-300 text-sm font-semibold tracking-widest">
              +7 (918) 088-49-11
            </div>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 md:px-6">
        <div className="text-center text-white max-w-4xl">
          <div className="mb-3">
            <span className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs md:text-sm font-bold tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm">
              КРАСНОДАР · С 09:00 ДО 21:00
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-wider mb-2 leading-none">
            НИКАМИР
          </h1>

          <p className="text-lg md:text-2xl font-light tracking-widest mb-3 text-amber-300">
            КЛУБ БОКСА
          </p>

          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl mx-auto leading-relaxed">
            Секции для взрослых и детей. Профессиональные тренеры.<br />
            Микрорайон Черёмушки, ул. Маяковского, 163
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LiquidButton
              size="xxl"
              className="font-bold text-base md:text-lg tracking-wide"
              onClick={() => scrollToSection("#join")}
            >
              Записаться на тренировку
            </LiquidButton>
            <a
              href="tel:+79180884911"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-bold tracking-wide hover:border-amber-300 hover:text-amber-300 transition-all duration-300 backdrop-blur-sm rounded-sm text-base md:text-lg"
            >
              <Icon name="Phone" size={20} />
              Позвонить
            </a>
          </div>
        </div>
      </div>

      {/* Slider Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={prevSlide}
            className="text-white hover:text-amber-300 transition-colors p-2"
            aria-label="Предыдущий слайд"
          >
            <Icon name="ChevronLeft" size={24} />
          </button>

          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-amber-400" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Перейти к слайду ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-white hover:text-amber-300 transition-colors p-2"
            aria-label="Следующий слайд"
          >
            <Icon name="ChevronRight" size={24} />
          </button>
        </div>
      </div>

      {/* Side Indicators */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col space-y-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1 h-8 transition-all duration-300 ${
                currentSlide === index ? "bg-amber-400" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Слайд ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
