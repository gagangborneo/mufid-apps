"use client"

import { motion } from "framer-motion"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { newsData } from "./data"

export function NewsSection() {
  return (
    <section className="py-6 px-4 pb-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground">
          Berita Terkini
        </h2>
        <Button variant="ghost" size="sm" className="text-primary">
          Lihat Semua <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      <div className="space-y-3">
        {newsData.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer">
              <div className="flex">
                <div
                  className={cn(
                    "w-24 sm:w-32 h-24 sm:h-28 shrink-0",
                    news.image
                  )}
                />
                <CardContent className="flex-1 p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary/10 text-primary"
                    >
                      {news.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {news.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                    {news.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2 hidden sm:block">
                    {news.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{news.date}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
