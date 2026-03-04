"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  Users,
  UserCheck,
  UserX,
  Clock,
  Phone,
  Mail,
  Calendar,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { membersData } from "./data"

const statusConfig = {
  active: { label: "Aktif", color: "bg-green-500", textColor: "text-green-600" },
  pending: { label: "Pending", color: "bg-amber-500", textColor: "text-amber-600" },
  inactive: { label: "Nonaktif", color: "bg-gray-400", textColor: "text-gray-500" },
}

export function DataPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filteredMembers = membersData.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.program.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = !filterStatus || member.status === filterStatus

    return matchesSearch && matchesFilter
  })

  // Stats
  const stats = {
    total: membersData.length,
    active: membersData.filter((m) => m.status === "active").length,
    pending: membersData.filter((m) => m.status === "pending").length,
    inactive: membersData.filter((m) => m.status === "inactive").length,
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Stats Cards */}
      <div className="px-4 py-4 grid grid-cols-4 gap-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 mx-auto text-primary mb-1" />
              <p className="text-lg font-bold">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <UserCheck className="w-5 h-5 mx-auto text-green-500 mb-1" />
              <p className="text-lg font-bold">{stats.active}</p>
              <p className="text-xs text-muted-foreground">Aktif</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <Clock className="w-5 h-5 mx-auto text-amber-500 mb-1" />
              <p className="text-lg font-bold">{stats.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-3 text-center">
              <UserX className="w-5 h-5 mx-auto text-gray-400 mb-1" />
              <p className="text-lg font-bold">{stats.inactive}</p>
              <p className="text-xs text-muted-foreground">Nonaktif</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Search & Filter */}
      <div className="px-4 py-2 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama, email, atau program..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          <Button
            variant={filterStatus === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus(null)}
            className="shrink-0"
          >
            <Filter className="w-3 h-3 mr-1" />
            Semua
          </Button>
          <Button
            variant={filterStatus === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("active")}
            className="shrink-0"
          >
            Aktif
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("pending")}
            className="shrink-0"
          >
            Pending
          </Button>
          <Button
            variant={filterStatus === "inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStatus("inactive")}
            className="shrink-0"
          >
            Nonaktif
          </Button>
        </div>
      </div>

      {/* Members List */}
      <div className="px-4 py-2 space-y-3">
        <CardHeader className="px-0 py-2">
          <CardTitle className="text-base">
            Daftar Peserta ({filteredMembers.length})
          </CardTitle>
        </CardHeader>
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="border-border/50 hover:border-primary/30 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-lg font-semibold text-primary">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm truncate">
                        {member.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          statusConfig[member.status].color,
                          "text-white"
                        )}
                      >
                        {statusConfig[member.status].label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ID: {member.id}
                    </p>
                    <p className="text-sm text-foreground mt-1 font-medium">
                      {member.program}
                    </p>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>Terdaftar: {member.registerDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
