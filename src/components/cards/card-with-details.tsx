import { useTranslation } from 'react-i18next'

type CardWithDetailsProps = {
    title: string
    subTitle: string
    imageUrl: string
    discount?: number
}

export const CardWithDetails = ({
    title,
    subTitle,
    imageUrl,
    discount,
}: CardWithDetailsProps) => {
    const { i18n } = useTranslation()

    return (
        <div className='relative flex flex-col gap-3'>
            {discount != null && (
                <div className='absolute right-4 top-4 flex items-center justify-center rounded-xs bg-secondary-orange px-2.5 py-[0.3125rem]'>
                    <span className='text-xs font-semibold text-white'>
                        {discount}% Off
                    </span>
                </div>
            )}
            <img
                src={imageUrl}
                alt={title}
                className='flex aspect-square items-center justify-center rounded-lg object-cover'
            />
            <div className='flex flex-col gap-1' dir={i18n.dir()}>
                <span className='text-xl font-semibold leading-none text-primary-black'>
                    {title}
                </span>
                <span className='leading-none text-dark-gray'>{subTitle}</span>
            </div>
        </div>
    )
}
