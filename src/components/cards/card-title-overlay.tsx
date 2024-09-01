import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type CardTitleOverlayProps = {
    title: string
    imageUrl: string
    trip?: number
}

export const CardTitleOverlay = ({
    title,
    imageUrl,
    trip,
}: CardTitleOverlayProps) => {
    const { t } = useTranslation()
    return (
        <Link to={`/trips?location=${title}`}>
            <div className='relative flex flex-col gap-3 rounded-lg'>
                <div className='absolute inset-0 rounded-lg bg-card-overlay' />
                {trip && (
                    <div className='absolute right-4 top-4 z-10 flex items-center justify-center rounded-lg bg-primary-red px-2.5 py-[0.3125rem]'>
                        <span className='text-xs font-semibold text-white'>
                            {trip} {t('common.trips')}
                        </span>
                    </div>
                )}
                <img
                    src={imageUrl}
                    alt={title}
                    className='aspect-[1.43/1] rounded-lg object-cover'
                />
                <span className='absolute text-2xl font-bold leading-none text-white bottom-8 left-5 text-primary-black'>
                    {title}
                </span>
            </div>
        </Link>
    )
}
