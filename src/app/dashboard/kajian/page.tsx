"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Clock,
  MapPin,
  User,
  BookOpen,
  Users,
  Video,
  Star,
  Monitor,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/mufid/PageHeader"
import { kajianSessionsData } from "@/components/mufid/data"

const categoryConfig = {
  rutin: { label: "Rutin", color: "bg-red-500", icon: BookOpen },
  khusus: { label: "Khusus", color: "bg-amber-500", icon: Star },
  online: { label: "Online", color: "bg-blue-500", icon: Video },
}

const levelConfig = {
  pemula: { label: "Pemula", color: "bg-green-100 text-green-700" },
  menengah: { label: "Menengah", color: "bg-amber-100 text-amber-700" },
  lanjutan: { label: "Lanjutan", color: "bg-red-100 text-red-700" },
}

export default function KajianPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [filterLevel, setFilterLevel] = useState<string | null>(null)

  const filteredSessions = useMemo(() => {
    return kajianSessionsData.filter((session) => {
      const matchesSearch =
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (session.kitab?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)

      const matchesCategory = !filterCategory || session.category === filterCategory
      const matchesLevel = !filterLevel || session.level === filterLevel

      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [searchQuery, filterCategory, filterLevel])

  // Stats
  const stats = {
    total: kajianSessionsData.length,
    rutin: kajianSessionsData.filter((k) => k.category === "rutin").length,
    online: kajianSessionsData.filter((k) => k.category === "online").length,
    khusus: kajianSessionsData.filter((k) => k.category === "khusus").length,
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Kajian" subtitle="Daftar kajian rutin & khusus" />

      {/* Stats Cards */}
      <div className="px-4 py-4 grid grid-cols-4 gap-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <BookOpen className="w-5 h-5 mx-auto text-primary mb-1" />
              <p className="text-lg font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <BookOpen className="w-5 h-5 mx-auto text-red-500 mb-1" />
              <p className="text-lg font-bold">{stats.rutin}</p>
              <p className="text-xs text-muted-foreground">Rutin</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <Monitor className="w-5 h-5 mx-auto text-blue-500 mb-1" />
              <p className="text-lg font-bold">{stats.online}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <Star className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <p className="text-lg font-bold">{stats.khusus}</p>
              <p className="text-xs text-muted-foreground">Khusus</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search & Filter */}
      <div className="px-4 py-2 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari kajian, ustadz, atau kitab..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Kategori</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <Button
              variant={filterCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(null)}
              className="shrink-0"
            >
              <Filter className="w-3 h-3 mr-1" />
              Semua
            </Button>
            {Object.entries(categoryConfig).map(([key, config]) => {
              const Icon = config.icon
              return (
                <Button
                  key={key}
                  variant={filterCategory === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(filterCategory === key ? null : key)}
                  className="shrink-0"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {config.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Level Filter */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Tingkat</p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <Button
              variant={filterLevel === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterLevel(null)}
              className="shrink-0"
            >
              Semua Level
            </Button>
            {Object.entries(levelConfig).map(([key, config]) => (
              <Button
                key={key}
                variant={filterLevel === key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterLevel(filterLevel === key ? null : key)}
                className="shrink-0"
              >
                {config.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="px-4 py-2 space-y-3">
        <p className="text-sm text-muted-foreground">
          Menampilkan {filteredSessions.length} kajian
        </p>

        {filteredSessions.map((session, index) => {
          const config = categoryConfig[session.category]
          const levelConf = levelConfig[session.level]
          const Icon = config.icon
          const progress = session.capacity && session.registered
            ? (session.registered / session.capacity) * 100
            : 0

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border/50 hover:border-primary/30 transition-all overflow-hidden">
                {/* Gradient Header */}
                <div className={cn("h-2 w-full", session.image)} />

                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="secondary"
                        className={cn("text-xs text-white", config.color)}
                      >
                        <Icon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", levelConf.color)}
                      >
                        {levelConf.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-base mb-1">{session.title}</h3>

                  {/* Kitab */}
                  {session.kitab && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                      <BookOpen className="w-3 h-3" />
                      <span>Kitab: {session.kitab}</span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {session.description}
                  </p>

                  {/* Speaker */}
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{session.speaker}</p>
                    </div>
                  </div>

                  {/* Schedule Info */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{session.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{session.schedule}</span>
                  </div>

                  {/* Progress Bar */}
                  {session.capacity && session.registered && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{session.registered} terdaftar</span>
                        <span>Kuota {session.capacity}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    size="sm"
                  >
                    Daftar Kajian
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}

        {filteredSessions.length === 0 && (
          <Card className="border-border/50">
            <CardContent className="py-8 text-center">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">
                Tidak ada kajian yang ditemukan
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
