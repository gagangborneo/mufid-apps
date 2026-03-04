"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppStore } from "@/lib/store"

export function Header() {
  const user = useAppStore((state) => state.user)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center overflow-hidden border border-border/50">
            <img
              src="https://mufid.or.id/wp-content/themes/yayasan-mufid/assets/images/mufid-logo.svg"
              alt="Mufid Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Assalamu&apos;alaikum</p>
            <p className="text-xs text-muted-foreground capitalize">
              {user?.name || "Pengguna"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
