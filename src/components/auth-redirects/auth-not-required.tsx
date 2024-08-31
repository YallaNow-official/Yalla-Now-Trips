import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../providers/user-provider'
import { Loader2 } from 'lucide-react'

export const AuthNotRequired = () => {
    const { user, isFetchingUser } = useUser()

    if (user == null && isFetchingUser) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <Loader2 className='size-20 animate-spin' />
            </div>
        )
    }

    if (user != null) return <Navigate to='/' />

    return <Outlet />
}
