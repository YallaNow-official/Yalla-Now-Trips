import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'

export const AuthLayout = () => {
    const pathname = useLocation().pathname
    const { t } = useTranslation()

    return (
        <div
            className={cn(
                'flex min-h-[calc(100vh-6rem)] items-center justify-center',
                pathname === '/sign-up' && 'py-10',
            )}
        >
            <main className='w-full max-w-[26.5rem] rounded-sm border border-light-gray shadow-auth-card'>
                <div className='flex w-full text-center'>
                    <Link
                        to={'/sign-in'}
                        className={cn(
                            'w-full py-4 text-xl font-semibold',
                            pathname === '/sign-in'
                                ? 'border-b-[3px] border-primary-red text-gray-900'
                                : 'border-b border-light-gray text-gray-500',
                        )}
                    >
                        {t('auth.sign_in')}
                    </Link>
                    <Link
                        to={'/sign-up'}
                        className={cn(
                            'w-full py-4 text-xl font-semibold',
                            pathname === '/sign-up'
                                ? 'border-b-[3px] border-primary-red text-gray-900'
                                : 'border-b border-light-gray text-gray-500',
                        )}
                    >
                        {t('auth.sign_up')}
                    </Link>
                </div>
                <Outlet />
            </main>
        </div>
    )
}
