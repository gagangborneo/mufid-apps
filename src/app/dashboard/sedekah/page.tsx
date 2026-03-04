"use client"

import { motion } from "framer-motion"
import {
  Heart,
  Copy,
  Check,
  Building2,
  Phone,
  MessageCircle,
  Wallet,
  Users,
  BookOpen,
  Home,
  HandHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/mufid/PageHeader"
import { useState } from "react"

const bankAccounts = [
  {
    id: "bsi",
    bank: "Bank Syariah Indonesia (BSI)",
    accountNumber: "7123456789",
    accountName: "Yayasan Mufid",
    logo: "bg-green-600",
  },
  {
    id: "bca",
    bank: "Bank Central Asia (BCA)",
    accountNumber: "1234567890",
    accountName: "Yayasan Mufid",
    logo: "bg-blue-600",
  },
  {
    id: "mandiri",
    bank: "Bank Mandiri",
    accountNumber: "1300012345678",
    accountName: "Yayasan Mufid",
    logo: "bg-yellow-500",
  },
]

const donationCategories = [
  {
    id: "operasional",
    title: "Operasional Dakwah",
    description: "Mendukung kegiatan kajian rutin, pengajian, dan operasional masjid",
    icon: BookOpen,
    color: "bg-red-500",
  },
  {
    id: "pendidikan",
    title: "Pendidikan Islam",
    description: "Beasiswa santri, pengadaan kitab, dan fasilitas pendidikan",
    icon: Users,
    color: "bg-amber-500",
  },
  {
    id: "pembangunan",
    title: "Pembangunan & Renovasi",
    description: "Pembangunan fasilitas masjid, aula, dan tempat wudu",
    icon: Home,
    color: "bg-rose-500",
  },
  {
    id: "sosial",
    title: "Bantuan Sosial",
    description: "Santunan yatim piatu, bakti sosial, dan bantuan dhuafa",
    icon: Heart,
    color: "bg-pink-500",
  },
]

const impactStats = [
  { label: "Santri Terbina", value: "500+", icon: Users },
  { label: "Kajian/Bulan", value: "20+", icon: BookOpen },
  { label: "Donatur Aktif", value: "1,200+", icon: Heart },
  { label: "Tahun Berdiri", value: "2015", icon: Sparkles },
]

const contactInfo = [
  {
    id: "wa",
    label: "WhatsApp Konfirmasi",
    value: "0812-3456-7890",
    icon: MessageCircle,
    link: "https://wa.me/6281234567890",
  },
  {
    id: "phone",
    label: "Telepon Kantor",
    value: "021-1234567",
    icon: Phone,
    link: "tel:0211234567",
  },
]

export default function SedekahPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Sedekah" subtitle="Support dakwah dengan infaq terbaik" />

      {/* Hero Section */}
      <div className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 overflow-hidden">
            <CardContent className="p-6 text-center relative">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />

              <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <HandHeart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </h2>
                <p className="text-white/90 text-sm mb-4">
                  &ldquo;Perumpamaan orang-orang yang menginfakkan hartanya di jalan Allah
                  adalah seperti sebutir benih yang menumbuhkan tujuh tangkai,
                  pada tiap-tiap tangkai ada seratus biji.&rdquo;
                </p>
                <p className="text-white/70 text-xs">QS. Al-Baqarah: 261</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Impact Stats */}
      <div className="px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="grid grid-cols-4 divide-x divide-border">
                {impactStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center px-2">
                      <Icon className="w-5 h-5 mx-auto text-primary mb-1" />
                      <p className="text-lg font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bank Accounts */}
      <div className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Rekening Donasi
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Transfer ke rekening berikut untuk berdonasi
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {bankAccounts.map((account, index) => (
                <div key={account.id}>
                  {index > 0 && <Separator className="my-3" />}
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                        account.logo
                      )}
                    >
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">{account.bank}</p>
                      <p className="font-bold text-lg tracking-wide font-mono">
                        {account.accountNumber}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        a.n. {account.accountName}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(account.accountNumber, account.id)}
                      className="shrink-0"
                    >
                      {copiedId === account.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1 text-green-500" />
                          Tersalin
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Salin
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* QRIS Section */}
      <div className="px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                QRIS (Scan untuk Bayar)
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Scan QRIS dengan aplikasi e-wallet atau mobile banking
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-white rounded-xl border-2 border-border/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-2">
                      <div className="grid grid-cols-5 gap-1">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-2 h-2 rounded-sm",
                              Math.random() > 0.5 ? "bg-gray-800" : "bg-white"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  Yayasan Mufid • Berlaku untuk semua e-wallet & m-Banking
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Donation Categories */}
      <div className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CardHeader className="px-0 py-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Alokasi Donasi
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Donasi Anda akan disalurkan untuk program-program berikut
            </p>
          </CardHeader>
          <div className="space-y-3">
            {donationCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <Card className="border-border/50 hover:border-primary/30 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                            category.color
                          )}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{category.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Contact for Confirmation */}
      <div className="px-4 py-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-border/50 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Konfirmasi Donasi
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Konfirmasi setelah transfer untuk memudahkan pencatatan
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {contactInfo.map((contact) => {
                const Icon = contact.icon
                return (
                  <a
                    key={contact.id}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border/50 hover:border-primary/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{contact.label}</p>
                      <p className="font-semibold">{contact.value}</p>
                    </div>
                  </a>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-6 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-8 h-8 text-green-500 mb-1" />
                  <p className="text-xs text-muted-foreground">Terdaftar</p>
                  <p className="text-xs font-medium">Kemenag RI</p>
                </div>
                <div className="flex flex-col items-center">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 mb-1">
                    ✓ Terverifikasi
                  </Badge>
                  <p className="text-xs text-muted-foreground">NPWP</p>
                  <p className="text-xs font-medium">Aktif</p>
                </div>
                <div className="flex flex-col items-center">
                  <Heart className="w-8 h-8 text-primary mb-1" />
                  <p className="text-xs text-muted-foreground">Amil Zakat</p>
                  <p className="text-xs font-medium">Bersertifikat</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer Message */}
      <div className="px-4 py-4 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-muted-foreground italic"
        >
          &ldquo;Semoga Allah SWT membalas kebaikan Anda dengan pahala yang berlipat ganda&rdquo;
        </motion.p>
        <p className="text-xs text-muted-foreground mt-2">
          © 2024 Yayasan Mufid • Semua donasi tercatat dan dilaporkan
        </p>
      </div>
    </div>
  )
}
