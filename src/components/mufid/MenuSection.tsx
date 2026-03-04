"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  Heart,
  Info,
  HandHeart,
  MoreHorizontal,
  Building2,
  BookText,
  Users,
  Sparkles,
  Briefcase,
  MessageCircleHeart,
  DollarSign,
  GraduationCap,
  Plane,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { menuItems } from "./data"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const iconMap = {
  BookOpen,
  Calendar,
  Heart,
  Info,
  HandHeart,
  MoreHorizontal,
}

// Routes for menu items
const menuRoutes: Record<string, string> = {
  kajian: "/dashboard/kajian",
  agenda: "/dashboard/agenda",
  "biro-jodoh": "#",
  informasi: "/dashboard/informasi",
  sedekah: "/dashboard/sedekah",
  lainnya: "#",
}

// Lainnya menu items
const lainnyaItems = [
  {
    id: "profil-yayasan",
    label: "Profil Yayasan",
    icon: Building2,
    color: "bg-red-500",
  },
  {
    id: "tajwid-mufid",
    label: "Tajwid Mufid",
    icon: BookText,
    color: "bg-rose-500",
  },
  {
    id: "muslimah",
    label: "Muslimah",
    icon: Users,
    color: "bg-pink-500",
  },
  {
    id: "muallaf-center",
    label: "Muallaf Center",
    icon: Sparkles,
    color: "bg-amber-500",
  },
  {
    id: "usaha",
    label: "Usaha",
    icon: Briefcase,
    color: "bg-orange-500",
  },
  {
    id: "konsultasi",
    label: "Konsultasi Keluarga & Muamalah",
    icon: MessageCircleHeart,
    color: "bg-teal-500",
  },
  {
    id: "donasi-wakaf",
    label: "Donasi & Wakaf",
    icon: DollarSign,
    color: "bg-green-500",
  },
  {
    id: "sekolah-mufid",
    label: "Sekolah Mufid",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    id: "haji-umrah",
    label: "Bimbingan Haji & Umrah",
    icon: Plane,
    color: "bg-indigo-500",
  },
]

export function MenuSection() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleMenuClick = (itemId: string) => {
    if (itemId === "lainnya") {
      setIsSheetOpen(true)
    }
  }

  return (
    <>
      <section className="px-4 py-6">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
          {menuItems.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const href = menuRoutes[item.id] || "#"
            const isLainnya = item.id === "lainnya"

            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center",
                    item.color
                  )}
                >
                  {Icon && <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />}
                </div>
                <span className="text-xs sm:text-sm font-medium text-center">
                  {item.label}
                </span>
              </motion.div>
            )

            if (isLainnya) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMenuClick(item.id)}
                  className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  {content}
                </button>
              )
            }

            return (
              <Link
                key={item.id}
                href={href}
                className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
              >
                {content}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Bottom Sheet for Lainnya */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl px-4 pb-6 pt-2 max-h-[80vh] overflow-y-auto"
        >
          <SheetHeader className="pb-4">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto" />
            <SheetTitle className="text-center text-lg font-bold mt-4">
              Menu Lainnya
            </SheetTitle>
          </SheetHeader>

          <div className="grid grid-cols-3 gap-4">
            {lainnyaItems.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSheetOpen(false)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center",
                      item.color
                    )}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-center leading-tight">
                    {item.label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Close Button */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSheetOpen(false)}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <X className="w-4 h-4" />
              Tutup
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
