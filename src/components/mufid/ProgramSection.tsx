"use client"

import { motion } from "framer-motion"
import { ArrowRight, Users, Clock, GraduationCap, BookOpen, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { programData } from "./data"

const iconMap = {
  GraduationCap,
  BookOpen,
  Star,
}

export function ProgramSection() {
  return (
    <section className="py-6">
      <div className="px-4 flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          Program Pendidikan
        </h2>
        <Button variant="ghost" size="sm" className="text-primary">
          Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full px-4"
      >
        <CarouselContent className="-ml-2 sm:-ml-4">
          {programData.map((program, index) => {
            const Icon = iconMap[program.icon as keyof typeof iconMap]
            const progress = program.capacity && program.registered
              ? (program.registered / program.capacity) * 100
              : 0

            return (
              <CarouselItem
                key={program.id}
                className="pl-2 sm:pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Card className="h-full border-border/50 hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden">
                    <div className={cn("h-2 w-full", program.color)} />
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                            program.color
                          )}
                        >
                          {Icon && <Icon className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                            {program.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {program.description}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {program.capacity && program.registered && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{program.registered} terdaftar</span>
                            <span>Kuota {program.capacity}</span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div
                              className={cn("h-full rounded-full transition-all", program.color)}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Users className="w-3.5 h-3.5" />
                          <span>{program.level}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{program.schedule}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4 border-primary/20 text-primary hover:bg-primary/10"
                      >
                        Daftar Sekarang
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
