// Data Types for Mufid Apps

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role?: string
  joinDate?: string
}

export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  description: string
  gradient: string
}

export interface MenuItem {
  id: string
  label: string
  icon: string
  color: string
}

export interface Program {
  id: number
  title: string
  description: string
  level: string
  schedule: string
  icon: string
  color: string
  registered?: number
  capacity?: number
}

export interface News {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  readTime: string
}

export interface Member {
  id: string
  name: string
  email: string
  phone: string
  program: string
  registerDate: string
  status: 'active' | 'pending' | 'inactive'
  avatar?: string
}

export interface Transaction {
  id: string
  type: 'donation' | 'registration' | 'event' | 'payment'
  title: string
  amount: number
  date: string
  status: 'success' | 'pending' | 'failed'
  description?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success'
  date: string
  read: boolean
}

export interface EventRegistration {
  id: string
  eventName: string
  eventDate: string
  registerDate: string
  status: 'registered' | 'attended' | 'cancelled'
  location: string
}

export interface AgendaEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: 'kajian' | 'event' | 'pengajian' | 'rapat' | 'lainnya'
  speaker?: string
  isHighlight?: boolean
}

export interface KajianSession {
  id: string
  title: string
  description: string
  speaker: string
  schedule: string
  time: string
  location: string
  category: 'rutin' | 'khusus' | 'online'
  kitab?: string
  level: 'pemula' | 'menengah' | 'lanjutan'
  registered?: number
  capacity?: number
  image?: string
}
