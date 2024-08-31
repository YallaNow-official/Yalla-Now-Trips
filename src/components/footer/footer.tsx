import WhiteLogo from '/white-logo.png'
import {
    CONTACT_INFO,
    HELP_LINKS,
    NAV_LINKS,
    SOCIAL_LINKS,
} from '@/lib/constants'
import { FooterLink } from './footer-link'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
    const { t, i18n } = useTranslation()
    return (
        <footer
            className='w-full bg-gray-900 py-16 text-white max-lg:text-center'
            dir={i18n.dir()}
        >
            <div className='container grid w-full items-center justify-center max-lg:gap-10 sm:grid-cols-2 lg:flex lg:items-start lg:justify-between'>
                <img
                    src={WhiteLogo}
                    alt='White Logo'
                    className='max-lg:mx-auto'
                />
                <div className='grid grid-cols-2 gap-x-12 gap-y-4'>
                    <span className='col-span-2 pb-2 text-2xl font-bold'>
                        {t('footer.quick_links')}
                    </span>
                    {NAV_LINKS[i18n.language as 'en' | 'ar'].map((link) => (
                        <FooterLink
                            key={link.title}
                            href={link.href}
                            title={link.title}
                        />
                    ))}
                </div>

                <div className='grid gap-y-4'>
                    <span className='pb-2 text-2xl font-bold'>
                        {t('footer.help')}
                    </span>
                    {HELP_LINKS[i18n.language as 'en' | 'ar'].map((link) => (
                        <FooterLink
                            key={link.title}
                            href={link.href}
                            title={link.title}
                        />
                    ))}
                </div>

                <div className='grid gap-y-6'>
                    <span className='text-2xl font-bold'>
                        {t('footer.follow_us')}
                    </span>
                    <div className='flex items-center gap-8 max-lg:mx-auto'>
                        {SOCIAL_LINKS.map((link) => (
                            <Link to={link.href} key={link.title}>
                                <span className='sr-only'>{link.title}</span>
                                {<link.icon />}
                            </Link>
                        ))}
                    </div>
                    <div className='space-y-4 max-lg:mx-auto'>
                        {CONTACT_INFO[i18n.language as 'en' | 'ar'].map(
                            (info) => {
                                const Icon = info.icons[0]
                                return (
                                    <div
                                        key={info.title}
                                        className='flex items-center gap-4 text-start'
                                    >
                                        {<Icon />}
                                        <div className='flex flex-col'>
                                            <span>{info.title}</span>
                                            <Link
                                                to={info.href}
                                                className='text-white'
                                            >
                                                {info.value}
                                            </Link>
                                        </div>
                                    </div>
                                )
                            },
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}
