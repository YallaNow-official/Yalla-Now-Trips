import { buttonVariants } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const NotFound = () => {
    const { t, i18n } = useTranslation()

    return (
        <div
            className='grid h-screen px-4 bg-white place-content-center'
            dir={i18n.dir()}
        >
            <div className='text-center'>
                <h1 className='font-black text-gray-200 text-9xl'>404</h1>

                <p className='mt-4 text-gray-500'>{t('not_found.text')}</p>

                <Link
                    to='/'
                    className={buttonVariants({
                        variant: 'primary',
                        className: 'mt-8',
                        size: 'lg',
                    })}
                >
                    {t('not_found.back_to_home')}
                </Link>
            </div>
        </div>
    )
}
