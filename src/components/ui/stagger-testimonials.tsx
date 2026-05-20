import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

// Никамир — Клуб Бокса — отзывы учеников
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "«Никамир» изменил мою жизнь. Пришёл совсем без опыта, а через полгода уже участвовал в первых соревнованиях. Тренеры верили в меня, когда я сам в себя не верил.",
    by: "Сергей Иванов, 26 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SergeyIvanov&backgroundColor=1a1a1a&textColor=ffffff",
  },
  {
    tempId: 1,
    testimonial:
      "Отдала сына в «Никамир» в 7 лет. Ребёнок стал собраннее, увереннее и ответственнее. Тренер находит подход к каждому ребёнку — это настоящий профессионал.",
    by: "Марина Петрова, мама ученика",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MarinaPetrova&backgroundColor=b45309&textColor=ffffff",
  },
  {
    tempId: 2,
    testimonial:
      "Атмосфера в зале потрясающая. Все помогают друг другу расти. Здесь нет высокомерия — есть только уважение, труд и бокс.",
    by: "Анна Козлова, 22 года",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AnnaKozlova&backgroundColor=7c3aed&textColor=ffffff",
  },
  {
    tempId: 3,
    testimonial:
      "Записался ради формы, а влюбился в бокс. За 4 месяца сбросил 12 кг и чувствую себя совершенно другим человеком. Рекомендую всем без исключения!",
    by: "Дмитрий Смирнов, 34 года",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DmitrySmirnov&backgroundColor=dc2626&textColor=ffffff",
  },
  {
    tempId: 4,
    testimonial:
      "«Никамир» — это не просто тренировки. Это характер, дисциплина и умение держать удар в жизни. Тренер учит не только технике, но и жизненным ценностям.",
    by: "Елена Новикова, 29 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ElenaNovikova&backgroundColor=d97706&textColor=ffffff",
  },
  {
    tempId: 5,
    testimonial:
      "Мой сын ходит уже второй год. Виден колоссальный прогресс — и в физической форме, и в характере. Клуб — настоящая находка для Краснодара!",
    by: "Алексей Морозов, папа ученика",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AlexeyMorozov&backgroundColor=1d4ed8&textColor=ffffff",
  },
  {
    tempId: 6,
    testimonial:
      "Занимаюсь индивидуально с тренером. Результат превзошёл все ожидания — уже через 2 месяца начала спаррировать. Очень благодарна клубу!",
    by: "Айгуль Рахимова, 24 года",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AigulRahimova&backgroundColor=be185d&textColor=ffffff",
  },
  {
    tempId: 7,
    testimonial:
      "Переехала в Краснодар и сразу нашла «Никамир». Отличный зал, отличные люди. Нашла здесь не только бокс, но и новых друзей.",
    by: "Ольга Ким, 31 год",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=OlgaKim&backgroundColor=0891b2&textColor=ffffff",
  },
  {
    tempId: 8,
    testimonial:
      "В «Никамире» ценят каждую победу — даже самую маленькую. Когда я отработал первый чёткий прямой — весь зал поддержал. Это дорогого стоит.",
    by: "Наталья Соколова, 19 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NataliyaSokolova&backgroundColor=ea580c&textColor=ffffff",
  },
  {
    tempId: 9,
    testimonial:
      "Тренировочная программа продумана отлично. Прогрессирую каждую неделю — это чувствуется и физически, и морально. Лучший клуб в Черёмушках!",
    by: "Михаил Волков, 40 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MikhailVolkov&backgroundColor=15803d&textColor=ffffff",
  },
  {
    tempId: 10,
    testimonial:
      "Здесь занимаются и дети, и взрослые, и совсем новички, и опытные бойцы — и все уважают друг друга. Это особенная атмосфера.",
    by: "София Родригес, 27 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SofiaRodriguez&backgroundColor=7e22ce&textColor=ffffff",
  },
  {
    tempId: 11,
    testimonial:
      "Дисциплина в «Никамире» — это не давление, это уважение к процессу. Тренер объясняет зачем, а не просто приказывает. Это меняет всё.",
    by: "Тимур Асланов, 23 года",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=TimurAslanov&backgroundColor=065f46&textColor=ffffff",
  },
  {
    tempId: 12,
    testimonial:
      "Ходим с мужем вместе на групповые занятия. Отличный способ провести время и зарядиться энергией. Рекомендуем всем парам!",
    by: "Нина Павлова, 33 года",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NinaPavlova&backgroundColor=0369a1&textColor=ffffff",
  },
  {
    tempId: 13,
    testimonial:
      "Бокс в «Никамире» — это философия. Учишься не только бить, но и держать удар, не сдаваться, идти вперёд. Это применимо во всей жизни.",
    by: "Роман Ким, 38 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=RomanKim&backgroundColor=b91c1c&textColor=ffffff",
  },
  {
    tempId: 14,
    testimonial:
      "Никогда не думала, что смогу заниматься боксом. Но здесь встретили без снисхождения — как равную. Теперь хожу три раза в неделю и кайфую.",
    by: "Екатерина Орлова, 36 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=EkaterinaOrlova&backgroundColor=6d28d9&textColor=ffffff",
  },
  {
    tempId: 15,
    testimonial:
      "Получил травму на другой тренировке. В «Никамире» помогли правильно восстановиться и вернуться в форму. Тренер — настоящий профессионал.",
    by: "Даниил Пак, 28 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DaniilPak&backgroundColor=c2410c&textColor=ffffff",
  },
  {
    tempId: 16,
    testimonial:
      "Сын начал заниматься в 5 лет. Уже через месяц перестал бояться — стал смелее, общительнее. Клуб меняет детей к лучшему.",
    by: "Раиса Грин, мама ученика",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=RaisaGrin&backgroundColor=166534&textColor=ffffff",
  },
  {
    tempId: 17,
    testimonial:
      "Техника — это всё в боксе. В «Никамире» учат с фундамента. Не просто машешь руками, а понимаешь каждое движение. Это огромная разница.",
    by: "Кирилл Вонг, 21 год",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=KirillVong&backgroundColor=1e40af&textColor=ffffff",
  },
  {
    tempId: 18,
    testimonial:
      "Зал чистый, оборудование современное, тренеры внимательные. Всё на высшем уровне. Отличный клуб для Краснодара — без вопросов.",
    by: "Александра Фостер, 25 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AlexandraFoster&backgroundColor=9d174d&textColor=ffffff",
  },
  {
    tempId: 19,
    testimonial:
      "Тренер взял меня под крыло с первого же дня. Объяснял каждую деталь, был терпелив. Через три месяца я уже не узнавал себя в зеркале.",
    by: "Карлос Мендес, 30 лет",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=CarlosMendez&backgroundColor=0e7490&textColor=ffffff",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-gray-900 text-white border-gray-900"
          : "z-0 bg-white text-gray-900 border-gray-200 hover:border-gray-400",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc || "/placeholder.svg"}
        alt={`${testimonial.by.split(",")[0]}`}
        className="mb-4 h-14 w-12 bg-gray-100 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3 className={cn("text-base sm:text-xl font-medium", isCenter ? "text-white" : "text-gray-900")}>
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-gray-300" : "text-gray-600",
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Следующий отзыв"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}