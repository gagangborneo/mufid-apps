import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
}

interface AppState {
  isLoggedIn: boolean
  user: User | null
  activeTab: string
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setActiveTab: (tab: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      activeTab: 'beranda',
      login: async (email: string, password: string) => {
        // Simulate login - in production this would call an API
        if (email && password) {
          set({
            isLoggedIn: true,
            user: {
              id: '1',
              name: email.split('@')[0],
              email,
              phone: '081234567890',
            },
          })
          return true
        }
        return false
      },
      logout: () => {
        set({ isLoggedIn: false, user: null, activeTab: 'beranda' })
      },
      setActiveTab: (tab: string) => {
        set({ activeTab: tab })
      },
    }),
    {
      name: 'mufid-app-storage',
    }
  )
)
