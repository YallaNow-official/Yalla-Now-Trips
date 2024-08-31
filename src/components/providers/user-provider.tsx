import { api } from '@/lib/api'
import { User } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import React, { createContext } from 'react'
import { toast } from 'sonner'

type UserContextType = {
    user?: User | null
    logout: () => void
    isLoggingOut: boolean
    isFetchingUser: boolean
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        data: user,
        isLoading: isFetchingUser,
        // refetch,
    } = useQuery<User | null>({
        queryKey: ['current-user'],
        queryFn: async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                return null
            }

            const res = await api.get('/api/UserProfile/User')
            return res.data as User
        },
        retry: (failureCount, err) => {
            if (isAxiosError(err) && err.status === 401) {
                localStorage.removeItem('token')
                return false
            }
            return failureCount < 3
        },
    })

    const { mutate, isPending: isLoggingOut } = useMutation({
        mutationFn: async () => api.post('/api/Auth/logout'),
        onSuccess: () => {
            localStorage.removeItem('token')
            window.location.reload()
        },
        onError: (err) => {
            toast.error(err.message || 'An unexpected error occurred')
        },
    })

    return (
        <UserContext.Provider
            value={{ user, logout: mutate, isLoggingOut, isFetchingUser }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = React.useContext(UserContext)

    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}
