import HeroSection from "@/components/HeroSection"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"

export default function Index() {
  const missionStatement =
    "В клубе «Никамир» мы верим: бокс — это не просто спорт, это характер. Рождённые в сердце Краснодара, мы объединяем детей и взрослых, которых связывает страсть к силе, дисциплине и победе над собой. Тренируешься ли ты ради формы, уверенности или чемпионского пояса — мы здесь, чтобы вести тебя вперёд. Наш зал живёт ритмом ударов, волей к победе и радостью общих достижений. Приходи к нам — боксируй не только ради тела, но ради духа, характера и чистой любви к боксу."

  const timelineEntries = [
    {
      id: 1,
      image: "https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/cce36030-4f37-43d0-a972-0ba0d909dbae.jpg",
      alt: "Спарринг в боксёрском зале",
      title: "Секция бокса для взрослых",
      description:
        "Взрослая секция — это профессиональный подход, современное оборудование и опытные тренеры. Неважно, новичок ты или уже занимался раньше — мы выстроим программу под тебя. Бокс развивает силу, выносливость, скорость и уверенность в себе. Записывайся — первая тренировка бесплатно!",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7832caa6-7685-4b62-801f-750660e099ac.jpg",
      alt: "Тренировка на боксёрском мешке",
      title: "Детская секция с 5 лет",
      description:
        "Детский бокс в «Никамире» — это безопасность, дисциплина и характер с малых лет. Тренеры с педагогическим опытом работают с детьми от 5 лет. Ребёнок научится самозащите, уважению к сопернику и уверенности в своих силах. Приходите на пробное занятие вместе!",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7008a70d-944a-4339-a6d9-5e2368fed57e.jpg",
      alt: "Тренер и ученик в зале",
      title: "Индивидуальные тренировки",
      description:
        "Хочешь максимального прогресса? Индивидуальные занятия с тренером дают результат в разы быстрее. Персональная программа, полное внимание тренера и чёткий план роста — от первого удара до соревнований. Запишись на персональную тренировку уже сегодня!",
      layout: "left" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Statement Section */}
      <section id="mission" className="relative min-h-screen flex items-center justify-center py-20 bg-white">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <img
                src="https://cdn.poehali.dev/files/221aaf0f-dbed-498d-bd8a-455ff43e4111.png"
                alt="Никамир логотип"
                className="h-28 w-28 md:h-36 md:w-36 object-contain"
                loading="lazy"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-12 text-gray-900">НАША МИССИЯ</h2>
            <TextGradientScroll
              text={missionStatement}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-gray-800"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>
      </section>

      {/* Timeline — Секции */}
      <section id="community" className="relative py-20 bg-white">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-gray-900">НАШИ СЕКЦИИ</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Бокс для детей и взрослых, групповые и индивидуальные тренировки — выбери свой путь.
              </p>
            </div>
          </div>

          <Timeline entries={timelineEntries} />
        </div>
      </section>

      {/* График работы */}
      <section className="relative py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-wider text-gray-900 mb-8 text-center">
              КОНТАКТЫ И ГРАФИК
            </h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="bg-gray-900 text-white px-6 py-5 flex items-center gap-4">
                <img
                  src="https://cdn.poehali.dev/files/221aaf0f-dbed-498d-bd8a-455ff43e4111.png"
                  alt="Никамир"
                  className="h-12 w-12 object-contain"
                />
                <div>
                  <div className="font-black text-lg tracking-widest">НИКАМИР</div>
                  <div className="text-amber-300 text-xs tracking-widest font-semibold">КЛУБ БОКСА · КРАСНОДАР</div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Адрес */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-amber-600 text-lg">📍</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 tracking-widest mb-0.5">АДРЕС</div>
                    <div className="font-semibold text-gray-900">Краснодар, мкр. Черёмушки (Дубинка)</div>
                    <div className="text-gray-600">ул. Маяковского, 163</div>
                  </div>
                </div>

                {/* Телефоны */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-amber-600 text-lg">📞</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 tracking-widest mb-0.5">ТЕЛЕФОНЫ</div>
                    <a href="tel:+79180884911" className="block font-semibold text-gray-900 hover:text-amber-600 transition-colors">
                      +7 (918) 088-49-11
                    </a>
                    <a href="tel:+79891411927" className="block font-semibold text-gray-900 hover:text-amber-600 transition-colors">
                      +7 (989) 141-19-27
                    </a>
                  </div>
                </div>

                {/* График */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-amber-600 text-lg">🕘</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-gray-400 tracking-widest mb-2">РЕЖИМ РАБОТЫ</div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Понедельник — Суббота</span>
                        <span className="font-black text-gray-900 bg-amber-50 px-3 py-0.5 rounded-full text-sm">09:00 – 21:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Воскресенье</span>
                        <span className="font-semibold text-red-500 bg-red-50 px-3 py-0.5 rounded-full text-sm">Выходной</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6">
                <a
                  href="tel:+79180884911"
                  className="block w-full bg-gray-900 text-white text-center py-4 font-black tracking-widest hover:bg-amber-500 transition-colors duration-300 rounded-sm text-sm"
                >
                  ПОЗВОНИТЬ И ЗАПИСАТЬСЯ
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 bg-white">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
              Что говорят наши{" "}
              <span className="bg-gradient-to-r from-gray-900 to-amber-600 bg-clip-text text-transparent">БОЙЦЫ</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Реальные истории наших учеников, которые нашли силу и характер в «Никамире».
            </p>
          </motion.div>

          <StaggerTestimonials />
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="join" className="relative">
        <SmoothScrollHero
          scrollHeight={2500}
          desktopImage="https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/cce36030-4f37-43d0-a972-0ba0d909dbae.jpg"
          mobileImage="https://cdn.poehali.dev/projects/4b624ba6-281f-4c6d-9f01-2b06688f6660/files/7832caa6-7685-4b62-801f-750660e099ac.jpg"
          initialClipPercentage={30}
          finalClipPercentage={70}
        />
      </section>
    </div>
  )
}
