"use client"

import { motion } from "framer-motion"
import { Home, Database, Clock, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"

const navItems = [
  { id: "beranda", label: "Beranda", icon: Home },
  { id: "data", label: "Data", icon: Database },
  { id: "riwayat", label: "Riwayat", icon: Clock },
  { id: "profile", label: "Profil", icon: User },
]

export function BottomNav() {
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 z-50 safe-area-bottom">
      <div className="flex justify-around items-center py-2 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "relative p-1",
                  isActive && "bg-primary/10 rounded-lg"
                )}
              >
                <Icon className="w-5 h-5" />
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
