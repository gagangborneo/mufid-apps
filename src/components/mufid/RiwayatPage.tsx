"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CreditCard,
  Bell,
  CalendarCheck,
  HandHeart,
  Ticket,
  Gift,
  Receipt,
  CheckCircle,
  Clock,
  XCircle,
  ChevronRight,
  MapPin,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { transactionsData, notificationsData, eventRegistrationsData } from "./data"

const transactionTypeConfig = {
  donation: { label: "Donasi", icon: HandHeart, color: "text-green-500" },
  registration: { label: "Pendaftaran", icon: Receipt, color: "text-blue-500" },
  event: { label: "Event", icon: Ticket, color: "text-purple-500" },
  payment: { label: "Pembayaran", icon: CreditCard, color: "text-amber-500" },
}

const transactionStatusConfig = {
  success: { label: "Berhasil", color: "bg-green-500", textColor: "text-green-600" },
  pending: { label: "Tertunda", color: "bg-amber-500", textColor: "text-amber-600" },
  failed: { label: "Gagal", color: "bg-red-500", textColor: "text-red-600" },
}

const notificationTypeConfig = {
  info: { color: "bg-blue-500", icon: Bell },
  warning: { color: "bg-amber-500", icon: Bell },
  success: { color: "bg-green-500", icon: CheckCircle },
}

const eventStatusConfig = {
  registered: { label: "Terdaftar", color: "bg-blue-500" },
  attended: { label: "Hadir", color: "bg-green-500" },
  cancelled: { label: "Dibatalkan", color: "bg-red-500" },
}

export function RiwayatPage() {
  const [activeTab, setActiveTab] = useState("transactions")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions" className="text-xs sm:text-sm">
                <CreditCard className="w-4 h-4 mr-1 sm:mr-2" />
                Transaksi
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm">
                <Bell className="w-4 h-4 mr-1 sm:mr-2" />
                Notifikasi
              </TabsTrigger>
              <TabsTrigger value="events" className="text-xs sm:text-sm">
                <CalendarCheck className="w-4 h-4 mr-1 sm:mr-2" />
                Event
              </TabsTrigger>
            </TabsList>

            {/* Transactions Tab */}
            <TabsContent value="transactions" className="mt-4 space-y-3">
              <CardHeader className="px-0 py-2">
                <CardTitle className="text-base">Riwayat Transaksi</CardTitle>
              </CardHeader>
              {transactionsData.map((transaction, index) => {
                const typeConfig = transactionTypeConfig[transaction.type]
                const statusConfig = transactionStatusConfig[transaction.status]
                const Icon = typeConfig.icon

                return (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-border/50 hover:border-primary/30 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center bg-muted",
                              typeConfig.color
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm">
                                {transaction.title}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "text-xs text-white",
                                  statusConfig.color
                                )}
                              >
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {transaction.id} • {transaction.date}
                            </p>
                            <p className="text-sm font-semibold mt-1 text-foreground">
                              {formatCurrency(transaction.amount)}
                            </p>
                            {transaction.description && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {transaction.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-4 space-y-3">
              <CardHeader className="px-0 py-2">
                <CardTitle className="text-base">Notifikasi</CardTitle>
              </CardHeader>
              {notificationsData.map((notification, index) => {
                const typeConfig = notificationTypeConfig[notification.type]
                const Icon = typeConfig.icon

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={cn(
                        "border-border/50 hover:border-primary/30 transition-all",
                        !notification.read && "border-primary/30 bg-primary/5"
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              typeConfig.color
                            )}
                          >
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm">
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <span className="w-2 h-2 rounded-full bg-primary" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.date}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-4 space-y-3">
              <CardHeader className="px-0 py-2">
                <CardTitle className="text-base">Registrasi Event</CardTitle>
              </CardHeader>
              {eventRegistrationsData.map((event, index) => {
                const statusConfig = eventStatusConfig[event.status]

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-border/50 hover:border-primary/30 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Gift className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm">
                                {event.eventName}
                              </h3>
                              <Badge
                                variant="secondary"
                                className={cn(
                                  "text-xs text-white",
                                  statusConfig.color
                                )}
                              >
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CalendarCheck className="w-3 h-3" />
                                <span>Tanggal: {event.eventDate}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                <span>Daftar: {event.registerDate}</span>
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
