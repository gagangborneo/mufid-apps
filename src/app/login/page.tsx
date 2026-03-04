"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/mufid"
import { useAppStore } from "@/lib/store"

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

export default function LoginPage() {
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
    if (mounted && isLoggedIn) {
      router.replace("/dashboard")
    }
  }, [mounted, isLoggedIn, router])

  if (!mounted || isLoggedIn) {
    return <LoadingScreen />
  }

  return <LoginForm />
}