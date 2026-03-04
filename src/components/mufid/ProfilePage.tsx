"use client"

import { motion } from "framer-motion"
import {
  User,
  Mail,
  Phone,
  Calendar,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Award,
  BookOpen,
  Heart,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const menuItems = [
  { id: "settings", label: "Pengaturan Akun", icon: Settings, color: "text-primary" },
  { id: "notifications", label: "Pengaturan Notifikasi", icon: Bell, color: "text-amber-500" },
  { id: "privacy", label: "Privasi & Keamanan", icon: Shield, color: "text-green-500" },
  { id: "help", label: "Bantuan & FAQ", icon: HelpCircle, color: "text-blue-500" },
]

export function ProfilePage() {
  const user = useAppStore((state) => state.user)
  const logout = useAppStore((state) => state.logout)

  // User stats
  const stats = [
    { label: "Program Diikuti", value: "3", icon: BookOpen, color: "bg-primary" },
    { label: "Kajian Hadir", value: "12", icon: Award, color: "bg-amber-500" },
    { label: "Donasi", value: "8", icon: Heart, color: "bg-rose-500" },
  ]

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          {/* Avatar */}
          <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white/20">
            <span className="text-4xl font-bold text-primary">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-4 capitalize">
            {user?.name || "Pengguna"}
          </h2>
          <p className="text-white/80 text-sm mt-1">Anggota sejak September 2024</p>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-4">
              <div className="grid grid-cols-3 divide-x divide-border">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center px-2">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full mx-auto flex items-center justify-center",
                          stat.color
                        )}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-lg font-bold mt-2">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* User Info */}
      <div className="px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Informasi Pribadi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nama Lengkap</p>
                  <p className="font-medium capitalize">{user?.name || "Belum diisi"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email || "Belum diisi"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Nomor Telepon</p>
                  <p className="font-medium">{user?.phone || "Belum diisi"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tanggal Bergabung</p>
                  <p className="font-medium">1 September 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-0">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.id}>
                    {index > 0 && <Separator />}
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Icon className={cn("w-5 h-5", item.color)} />
                      </div>
                      <span className="flex-1 text-left font-medium">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Logout Button */}
      <div className="px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            variant="outline"
            className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={logout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Keluar
          </Button>
        </motion.div>
      </div>

      {/* Version */}
      <p className="text-center text-xs text-muted-foreground mt-6">
        Mufid Apps v1.0.0
      </p>
    </div>
  )
}
