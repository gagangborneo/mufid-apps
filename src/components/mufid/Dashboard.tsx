"use client"

import { Header } from "./Header"
import { HeroSlider } from "./HeroSlider"
import { MenuSection } from "./MenuSection"
import { ProgramSection } from "./ProgramSection"
import { NewsSection } from "./NewsSection"
import { BottomNav } from "./BottomNav"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background islamic-pattern">
      <Header />
      <HeroSlider />
      <MenuSection />
      <ProgramSection />
      <NewsSection />
      <BottomNav />
    </div>
  )
}
