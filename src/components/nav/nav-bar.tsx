import MainLogo from '/main-logo.png'
import { NAV_LINKS } from '@/lib/constants'
import { NavItem } from './nav-item'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { NavMob } from './nav-mob'
import { useUser } from '../providers/user-provider'
import { UserDropDown } from './user-dropdown'
import { useTranslation } from 'react-i18next'
import { Langdropdown } from './lang-dropdown'

export const NavBar = () => {
    const { user, logout, isLoggingOut } = useUser()
    const { t, i18n } = useTranslation()

    return (
        <nav
            className='sticky top-0 z-50 flex items-center justify-center w-full h-24 bg-background shadow-nav'
            dir={i18n.dir()}
        >
            <ul className='container flex items-center justify-between w-full gap-4 xl:gap-8'>
                <li>
                    <Link to='/'>
                        <img src={MainLogo} alt='Main logo' />
                    </Link>
                </li>

                <ul className='items-center justify-center hidden gap-4 xl:flex xl:gap-8'>
                    {NAV_LINKS[i18n.language as 'en' | 'ar'].map((link) => (
                        <NavItem
                            key={link.href}
                            className='hidden xl:block'
                            {...link}
                        />
                    ))}
                </ul>

                <ul className='flex items-center justify-center gap-4'>
                    <li>
                        <Langdropdown />
                    </li>

                    {user == null ? (
                        <li>
                            <Link
                                to='/sign-in'
                                className={buttonVariants({
                                    variant: 'primary',
                                })}
                            >
                                {t('auth.sign_in_small')}
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <UserDropDown
                                user={user}
                                logout={logout}
                                isLoading={isLoggingOut}
                            />
                        </li>
                    )}

                    <li className='xl:hidden'>
                        <NavMob />
                    </li>
                </ul>
            </ul>
        </nav>
    )
}
