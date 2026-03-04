"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, BookOpen, HandHeart } from "lucide-react"
import { cn } from "@/lib/utils"
import { heroSlides } from "./data"

const iconMap = {
  Moon,
  BookOpen,
  HandHeart,
}

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const CurrentIcon = iconMap[Object.keys(iconMap)[currentSlide] as keyof typeof iconMap]

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "relative h-48 sm:h-56 md:h-64 rounded-2xl mx-4 mt-4 overflow-hidden",
            "bg-gradient-to-r",
            heroSlides[currentSlide].gradient
          )}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
            <div className="flex justify-between items-start">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/80 text-sm sm:text-base"
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1"
                >
                  {heroSlides[currentSlide].title}
                </motion.h2>
              </div>
              {CurrentIcon && <CurrentIcon className="w-8 h-8 sm:w-10 sm:h-10 text-white/80" />}
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 text-sm sm:text-base"
            >
              {heroSlides[currentSlide].description}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slider Indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentSlide === index
                ? "w-6 bg-primary"
                : "bg-primary/30 hover:bg-primary/50"
            )}
          />
        ))}
      </div>
    </div>
  )
}
