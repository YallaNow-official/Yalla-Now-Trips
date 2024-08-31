import { ContactUsForm } from '@/components/forms/contact-us-form'
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

export const ContactUs = () => {
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
                                {t('common.contact_us')}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex h-full flex-col justify-center'>
                    <h1 className='text-[2rem] font-bold leading-normal text-white'>
                        {t('common.contact_us')}
                    </h1>

                    <p className='max-w-screen-sm text-lg leading-7 tracking-wide text-white'>
                        {t('contact.banner_text')}
                    </p>
                </div>
            </div>

            <img
                className='h-96 w-full object-cover'
                src='/banners/contact.png'
                alt='Contact Us'
            />

            <ContactUsForm />
        </main>
    )
}
