import { Icons } from '@/components/icons'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const AboutUs = () => {
    const { t, i18n } = useTranslation()

    return (
        <main className='relative' dir={i18n.dir()}>
            <div className='container absolute left-1/2 h-full max-h-96 -translate-x-1/2 pb-20 pt-4'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link
                                    to='/'
                                    className='text-sm font-normal text-white'
                                >
                                    {t('common.home')}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            {
                                <Icons.CaretRight
                                    dir={
                                        i18n.dir() === 'rtl' ? 'left' : 'right'
                                    }
                                />
                            }
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-sm font-normal text-white'>
                                {t('common.about_us')}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex h-full flex-col justify-center'>
                    <h1 className='text-[2rem] font-bold leading-normal text-white'>
                        {t('common.about_us')}
                    </h1>

                    <p className='max-w-screen-sm text-lg leading-7 tracking-wide text-white'>
                        {t('about.banner_text')}
                    </p>
                </div>
            </div>

            <img
                className='h-96 w-full object-cover'
                src='/banners/about.png'
                alt='About us'
            />

            <div className='container flex flex-col items-center space-y-6 pb-28 pt-12 lg:flex-row'>
                <div className='space-y-4 lg:mt-24'>
                    <h2 className='text-balance text-[2rem] font-semibold text-primary-black'>
                        {t('common.yalla_now')}
                    </h2>
                    <p className='max-w-screen-md text-balance font-medium text-primary-black'>
                        <span>{t('about.about_text.first')}</span>
                        <br />
                        <br />
                        <span>{t('about.about_text.second')}</span>
                        <br />
                        <br />
                        <span>{t('about.about_text.third')}</span>
                        <br />
                        <br />
                        <span>{t('about.about_text.fourth')}</span>
                    </p>
                </div>
                <img
                    src='/about-img.png'
                    alt='About us img'
                    className='h-full w-full'
                />
            </div>
        </main>
    )
}
