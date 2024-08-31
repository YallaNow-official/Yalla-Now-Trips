import { Link } from 'react-router-dom'
import { Icons } from '../icons'
import { buttonVariants } from '../ui/button'
import { useTranslation } from 'react-i18next'
import { formatPrice } from '@/lib/utils'

type CardWithBookingProps = {
    imageUrl: string
    title: string
    rating: number
    subTitle: string
    price: number
    duration: number
}

export const CardWithBooking = ({
    imageUrl,
    title,
    rating,
    subTitle,
    price,
    duration,
}: CardWithBookingProps) => {
    const { t, i18n } = useTranslation()

    return (
        <div
            className='flex flex-col rounded-[0.3125rem] border border-[#E0E0E0] 2lg:flex-row'
            dir={i18n.dir()}
        >
            <img
                src={imageUrl}
                alt='card'
                className='aspect-[1.23/1] h-full w-full min-w-[19rem] rounded-lg object-cover sm:max-w-80'
            />
            <div className='flex flex-col w-full px-6 py-4 grow lg:px-8 lg:py-6'>
                <span className='pb-2.5 text-xl font-semibold text-primary-black'>
                    {title}
                </span>
                <div className='flex items-center pb-2'>
                    {new Array(rating ?? 0).fill(0).map((_, i) => (
                        <Icons.Star key={i} />
                    ))}
                    <span className='pl-1.5 text-sm font-semibold text-gray-900'>
                        {rating} {t('details.star_rating')}
                    </span>
                </div>
                <div className='relative text-sm line-clamp-2'>
                    <span className='text-gray-900'>{subTitle}</span>
                    <Link
                        to={`/tour/id`}
                        className='absolute bottom-0 right-0 px-1 bg-white text-primary-red'
                    >
                        Read more...
                    </Link>
                </div>
                <div className='flex gap-4 pt-4 pb-3 lg:gap-8'>
                    <div className='flex items-center gap-2 lg:gap-5'>
                        <Icons.Location className='size-6' />
                        <span className='text-sm font-medium text-dark-gray'>
                            {subTitle}
                        </span>
                    </div>
                    <div className='flex items-center gap-2 lg:gap-5'>
                        <Icons.Duration className='size-6' />
                        <span className='text-sm font-medium text-dark-gray'>
                            {t('details.duration')}
                            {': '}
                            {duration} {t('details.days')}
                        </span>
                    </div>
                </div>
                <div className='flex flex-col justify-between sm:flex-row md:flex-col lg:flex-row lg:items-center'>
                    <div className='flex items-center gap-1 py-2'>
                        <span className='text-2xl font-semibold text-primary-red'>
                            {formatPrice(price ?? 0)}
                        </span>
                        {/* <span className='text-lg text-gray-500 line-through'>
                            $1999
                        </span>
                        <div className='ml-2 bg-secondary-orange px-2.5 py-1 text-sm font-semibold text-white'>
                            21% OFF
                        </div> */}
                    </div>
                    <Link
                        to={'/booking/${id}'}
                        className={buttonVariants({
                            variant: 'primary',
                            className: 'rounded-[0.1875rem] px-8',
                            size: 'lg',
                        })}
                    >
                        <span className='font-bold uppercase tracking-[0.012em]'>
                            {t('details.book_now')}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
