"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Clock,
  Eye,
  Bookmark,
  TrendingUp,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/mufid/PageHeader"

// Category tags configuration
const categories = [
  { id: "all", label: "Semua", color: "bg-primary" },
  { id: "kajian", label: "Kajian", color: "bg-red-500" },
  { id: "event", label: "Event", color: "bg-amber-500" },
  { id: "pengumuman", label: "Pengumuman", color: "bg-blue-500" },
  { id: "artikel", label: "Artikel", color: "bg-rose-500" },
  { id: "tips", label: "Tips Islami", color: "bg-green-500" },
  { id: "wawasan", label: "Wawasan", color: "bg-purple-500" },
]

// Sample information/blog data with Islamic images
const informationData = [
  {
    id: "INF001",
    title: "Keutamaan Membaca Al-Quran Setiap Hari",
    excerpt: "Membaca Al-Quran setiap hari memiliki keutamaan yang besar dalam Islam. Rasulullah SAW bersabda bahwa orang yang mahir membaca Al-Quran akan bersama para malaikat yang mulia.",
    content: "",
    category: "artikel",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
    author: "Ustadz Ahmad Sulaiman",
    date: "18 September 2024",
    readTime: "5 menit",
    views: 1250,
    tags: ["Al-Quran", "Ibadah", "Keutamaan"],
    featured: true,
  },
  {
    id: "INF002",
    title: "Jadwal Kajian Ramadhan 1446 H Telah Diumumkan",
    excerpt: "Yayasan Mufid mengumumkan jadwal lengkap kajian selama bulan Ramadhan 1446 H. Berbagai tema menarik akan dibahas oleh para ustadz terkemuka.",
    content: "",
    category: "pengumuman",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
    author: "Admin Mufid",
    date: "17 September 2024",
    readTime: "3 menit",
    views: 890,
    tags: ["Ramadhan", "Kajian", "Jadwal"],
    featured: true,
  },
  {
    id: "INF003",
    title: "Tips Persiapan Sholat Tarawih di Bulan Ramadhan",
    excerpt: "Menyambut bulan Ramadhan, berikut tips persiapan untuk sholat tarawih agar kita dapat melaksanakan ibadah dengan khusyuk dan penuh semangat.",
    content: "",
    category: "tips",
    image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=800&q=80",
    author: "Ustadz Ibrahim Hasan",
    date: "16 September 2024",
    readTime: "4 menit",
    views: 2100,
    tags: ["Ramadhan", "Sholat", "Tips"],
    featured: false,
  },
  {
    id: "INF004",
    title: "Sejarah dan Keutamaan Masjid Al-Aqsa",
    excerpt: "Masjid Al-Aqsa merupakan salah satu masjid tertua di dunia dan menjadi kiblat pertama umat Islam. Ketahui sejarah dan keutamaan masjid yang mulia ini.",
    content: "",
    category: "wawasan",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&q=80",
    author: "Ustadz Dr. Muhammad Fauzi",
    date: "15 September 2024",
    readTime: "7 menit",
    views: 1850,
    tags: ["Sejarah", "Masjid Al-Aqsa", "Palestina"],
    featured: true,
  },
  {
    id: "INF005",
    title: "Peringatan Maulid Nabi Muhammad SAW 1446 H",
    excerpt: "Mari bergabung dalam peringatan Maulid Nabi Muhammad SAW 1446 H yang akan diselenggarakan pada tanggal 15 September 2024 di Lapangan Utama Yayasan Mufid.",
    content: "",
    category: "event",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80",
    author: "Panitia Maulid",
    date: "14 September 2024",
    readTime: "2 menit",
    views: 3200,
    tags: ["Maulid Nabi", "Event", "Peringatan"],
    featured: false,
  },
  {
    id: "INF006",
    title: "Panduan Lengkap Puasa Sunnah di Bulan Muharram",
    excerpt: "Bulan Muharram memiliki keutamaan yang besar. Ketahui panduan lengkap puasa sunnah, terutama pada hari Asyura untuk mendapatkan pahala yang besar.",
    content: "",
    category: "kajian",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    author: "Ustadz Ahmad Sulaiman",
    date: "13 September 2024",
    readTime: "6 menit",
    views: 980,
    tags: ["Puasa", "Muharram", "Asyura"],
    featured: false,
  },
  {
    id: "INF007",
    title: "Adab Membaca Kitab Kuning di Pesantren",
    excerpt: "Mempelajari ilmu agama melalui kitab kuning membutuhkan adab yang baik. Berikut panduan adab yang perlu diketahui bagi santri dan pencari ilmu.",
    content: "",
    category: "kajian",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80",
    author: "Ustadz Muhammad Rizki",
    date: "12 September 2024",
    readTime: "5 menit",
    views: 760,
    tags: ["Kitab Kuning", "Pesantren", "Adab"],
    featured: false,
  },
  {
    id: "INF008",
    title: "Pembagian Zakat Fitrah: Panduan Lengkap",
    excerpt: "Menjelang Idul Fitri, ketahui panduan lengkap pembagian zakat fitrah, mulai dari niat, ukuran, waktu, dan siapa saja yang berhak menerimanya.",
    content: "",
    category: "wawasan",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&q=80",
    author: "Ustadz Dr. Ahmad Fauzi",
    date: "11 September 2024",
    readTime: "8 menit",
    views: 2450,
    tags: ["Zakat", "Ramadhan", "Idul Fitri"],
    featured: false,
  },
  {
    id: "INF009",
    title: "Keutamaan Sedekah di Bulan Ramadhan",
    excerpt: "Rasulullah SAW adalah orang yang paling dermawan, terlebih di bulan Ramadhan. Ketahui keutamaan bersedekah di bulan yang penuh berkah ini.",
    content: "",
    category: "artikel",
    image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80",
    author: "Ustadzah Fatimah",
    date: "10 September 2024",
    readTime: "4 menit",
    views: 1340,
    tags: ["Sedekah", "Ramadhan", "Keutamaan"],
    featured: false,
  },
  {
    id: "INF010",
    title: "Tips Memilih Guru Ngaji yang Tepat untuk Anak",
    excerpt: "Memilih guru ngaji yang tepat sangat penting untuk perkembangan spiritual anak. Berikut tips memilih guru ngaji yang baik dan berkualitas.",
    content: "",
    category: "tips",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    author: "Ustadzah Fatimah Az-Zahra",
    date: "9 September 2024",
    readTime: "5 menit",
    views: 890,
    tags: ["TPA", "Anak", "Pendidikan"],
    featured: false,
  },
  {
    id: "INF011",
    title: "Laporan Keuangan Yayasan Mufid Q3 2024",
    excerpt: "Berikut laporan keuangan Yayasan Mufid untuk kuartal ketiga tahun 2024. Transparansi adalah komitmen kami kepada seluruh donatur dan jamaah.",
    content: "",
    category: "pengumuman",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    author: "Bendahara Yayasan",
    date: "8 September 2024",
    readTime: "3 menit",
    views: 450,
    tags: ["Laporan", "Keuangan", "Transparansi"],
    featured: false,
  },
  {
    id: "INF012",
    title: "Arsitektur Masjid: Warisan Kejayaan Islam",
    excerpt: "Masjid-masjid di seluruh dunia memiliki arsitektur yang indah dan penuh makna. Mari mengenal lebih dekat keindahan arsitektur masjid dari berbagai era.",
    content: "",
    category: "wawasan",
    image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&q=80",
    author: "Tim Redaksi",
    date: "7 September 2024",
    readTime: "6 menit",
    views: 1120,
    tags: ["Arsitektur", "Masjid", "Sejarah"],
    featured: false,
  },
]

// Featured articles for hero section
const featuredArticles = informationData.filter((item) => item.featured)

export default function InformasiPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [visibleCount, setVisibleCount] = useState(6)

  const filteredInfo = useMemo(() => {
    return informationData.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const displayedInfo = filteredInfo.slice(0, visibleCount)

  const getCategoryConfig = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || categories[0]
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Informasi" subtitle="Kanal informasi & artikel Islami" />

      {/* Search Bar */}
      <div className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari artikel, penulis, atau topik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </motion.div>
      </div>

      {/* Category Tags */}
      <div className="px-4 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 overflow-x-auto no-scrollbar pb-2"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category.id)
                setVisibleCount(6)
              }}
              className={cn(
                "shrink-0",
                selectedCategory === category.id && category.color
              )}
            >
              {category.label}
            </Button>
          ))}
        </motion.div>
      </div>

      {/* Featured Articles */}
      {selectedCategory === "all" && !searchQuery && featuredArticles.length > 0 && (
        <div className="px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Artikel Pilihan</h2>
            </div>
            <div className="relative overflow-hidden rounded-xl">
              {featuredArticles[0] && (
                <Card className="border-0 overflow-hidden cursor-pointer group">
                  <div className="relative h-48 sm:h-64">
                    <img
                      src={featuredArticles[0].image}
                      alt={featuredArticles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <Badge
                        className={cn(
                          "text-white mb-2",
                          getCategoryConfig(featuredArticles[0].category).color
                        )}
                      >
                        {getCategoryConfig(featuredArticles[0].category).label}
                      </Badge>
                      <h3 className="text-white font-bold text-lg sm:text-xl line-clamp-2">
                        {featuredArticles[0].title}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-white/80 text-xs">
                        <span>{featuredArticles[0].author}</span>
                        <span>•</span>
                        <span>{featuredArticles[0].date}</span>
                        <span>•</span>
                        <span>{featuredArticles[0].readTime}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Articles List */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">
            {selectedCategory === "all" ? "Semua Artikel" : getCategoryConfig(selectedCategory).label}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredInfo.length} artikel
          </span>
        </div>

        {displayedInfo.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">
                Tidak ada artikel yang ditemukan
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {displayedInfo.map((item, index) => {
              const categoryConfig = getCategoryConfig(item.category)
              const isFeatured = item.id === featuredArticles[0]?.id && selectedCategory === "all" && !searchQuery

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={isFeatured ? "hidden" : ""}
                >
                  <Card className="border-border/50 hover:border-primary/30 transition-all overflow-hidden cursor-pointer group">
                    <div className="flex flex-col sm:flex-row">
                      {/* Image */}
                      <div className="relative w-full sm:w-40 h-40 sm:h-auto shrink-0 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Category Badge - Mobile */}
                        <Badge
                          className={cn(
                            "absolute top-2 left-2 text-white sm:hidden",
                            categoryConfig.color
                          )}
                        >
                          {categoryConfig.label}
                        </Badge>
                      </div>

                      {/* Content */}
                      <CardContent className="flex-1 p-4">
                        {/* Category Badge - Desktop */}
                        <div className="hidden sm:flex items-center gap-2 mb-2">
                          <Badge
                            className={cn("text-white", categoryConfig.color)}
                          >
                            {categoryConfig.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {item.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {item.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs bg-muted/50"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-semibold text-primary">
                                {item.author.charAt(0)}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {item.author}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              <span>{item.views.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{item.date}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredInfo.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center"
          >
            <Button
              variant="outline"
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8"
            >
              Muat Lebih Banyak
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2024 Yayasan Mufid • Menyebarkan kebaikan melalui informasi
        </p>
      </div>
    </div>
  )
}
