"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  BookOpen,
  Users,
  Calendar as CalendarIcon,
  Gift,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/mufid/PageHeader"
import { agendaEventsData } from "@/components/mufid/data"

const categoryConfig = {
  kajian: { label: "Kajian", color: "bg-red-500", icon: BookOpen },
  event: { label: "Event", color: "bg-amber-500", icon: Gift },
  pengajian: { label: "Pengajian", color: "bg-rose-500", icon: Users },
  rapat: { label: "Rapat", color: "bg-blue-500", icon: FileText },
  lainnya: { label: "Lainnya", color: "bg-gray-500", icon: CalendarIcon },
}

const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]

const months = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 8, 1)) // September 2024
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDayOfMonth = new Date(year, month, 1).getDay()

  // Generate calendar days
  const calendarDays = useMemo(() => {
    const daysArray = []
    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push({ day: null, date: null })
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
      daysArray.push({ day: i, date: dateStr })
    }
    return daysArray
  }, [year, month, firstDayOfMonth, daysInMonth])

  // Get events for selected date or all upcoming events
  const filteredEvents = useMemo(() => {
    if (selectedDate) {
      return agendaEventsData.filter((event) => event.date === selectedDate)
    }
    return agendaEventsData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [selectedDate])

  // Get dates that have events
  const eventDates = useMemo(() => {
    return new Set(agendaEventsData.map((event) => event.date))
  }, [])

  // Get events for a specific date (for calendar dots)
  const getEventsForDate = (dateStr: string) => {
    return agendaEventsData.filter((event) => event.date === dateStr)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
    setSelectedDate(null)
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Agenda" subtitle="Jadwal kegiatan & acara" />

      {/* Calendar Section */}
      <div className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth("prev")}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <CardTitle className="text-lg">
                  {months[month]} {year}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateMonth("next")}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {days.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((item, index) => {
                  const hasEvents = item.date && eventDates.has(item.date)
                  const isSelected = item.date === selectedDate
                  const isToday =
                    item.day === new Date().getDate() &&
                    month === new Date().getMonth() &&
                    year === new Date().getFullYear()
                  const dayEvents = item.date ? getEventsForDate(item.date) : []

                  return (
                    <button
                      key={index}
                      type="button"
                      disabled={!item.day}
                      onClick={() => setSelectedDate(isSelected ? null : item.date)}
                      className={cn(
                        "relative aspect-square flex flex-col items-center justify-center rounded-lg text-sm transition-all",
                        !item.day && "invisible",
                        isSelected && "bg-primary text-primary-foreground",
                        isToday && !isSelected && "bg-primary/10 text-primary font-semibold",
                        !isSelected && !isToday && item.day && "hover:bg-muted",
                        "disabled:opacity-50"
                      )}
                    >
                      <span>{item.day}</span>
                      {hasEvents && (
                        <div className="flex gap-0.5 mt-0.5">
                          {dayEvents.slice(0, 3).map((event) => (
                            <div
                              key={event.id}
                              className={cn(
                                "w-1 h-1 rounded-full",
                                categoryConfig[event.category].color
                              )}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-border/50">
                {Object.entries(categoryConfig).map(([key, config]) => {
                  const Icon = config.icon
                  return (
                    <div key={key} className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-full", config.color)} />
                      <span className="text-xs text-muted-foreground">{config.label}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Selected Date Info */}
      {selectedDate && (
        <div className="px-4 mb-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold">
              Agenda {new Date(selectedDate).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedDate(null)}
              className="text-primary"
            >
              Tampilkan Semua
            </Button>
          </div>
        </div>
      )}

      {/* Events List */}
      <div className="px-4 space-y-3">
        {filteredEvents.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="py-8 text-center">
              <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">
                {selectedDate ? "Tidak ada agenda pada tanggal ini" : "Belum ada agenda"}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredEvents.map((event, index) => {
            const config = categoryConfig[event.category]
            const Icon = config.icon

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={cn(
                    "border-border/50 hover:border-primary/30 transition-all cursor-pointer",
                    event.isHighlight && "border-primary/30 bg-primary/5"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center bg-muted rounded-lg px-3 py-2 shrink-0">
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString("id-ID", { month: "short" })}
                        </span>
                        <span className="text-xl font-bold text-foreground">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>

                      {/* Event Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className={cn("text-xs text-white", config.color)}
                              >
                                <Icon className="w-3 h-3 mr-1" />
                                {config.label}
                              </Badge>
                              {event.isHighlight && (
                                <Badge variant="outline" className="text-xs text-primary border-primary">
                                  Highlight
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-semibold text-sm mt-1.5">{event.title}</h3>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                          {event.speaker && (
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <User className="w-3 h-3" />
                              <span>{event.speaker}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  )
}
