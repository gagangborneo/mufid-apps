"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/lib/store"
import {
  Dashboard,
  DataPage,
  RiwayatPage,
  ProfilePage,
  BottomNav,
} from "@/components/mufid"

function DashboardContent() {
  const activeTab = useAppStore((state) => state.activeTab)

  switch (activeTab) {
    case "beranda":
      return <Dashboard />
    case "data":
      return (
        <div className="min-h-screen bg-background">
          <DataPage />
          <BottomNav />
        </div>
      )
    case "riwayat":
      return (
        <div className="min-h-screen bg-background">
          <RiwayatPage />
          <BottomNav />
        </div>
      )
    case "profile":
      return (
        <div className="min-h-screen bg-background">
          <ProfilePage />
          <BottomNav />
        </div>
      )
    default:
      return <Dashboard />
  }
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const isLoggedIn = useAppStore((state) => state.isLoggedIn)
  const router = useRouter()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true)
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (mounted && !isLoggedIn) {
      router.replace("/login")
    }
  }, [mounted, isLoggedIn, router])

  if (!mounted || !isLoggedIn) {
    return <LoadingScreen />
  }

  return <DashboardContent />
}