import { Link } from 'react-router-dom'
import { Icons } from './icons'
import { useTranslation } from 'react-i18next'
import { Button } from './ui/button'

type SectionHeaderProps = {
    title: string
    link?: string
    showFilter?: boolean
    filterOnClick?: () => void
}

export const SectionHeader = ({
    title,
    link,
    showFilter = false,
    filterOnClick,
}: SectionHeaderProps) => {
    const { t, i18n } = useTranslation()

    return (
        <div
            className='flex items-center justify-between w-full'
            dir={i18n.dir()}
        >
            <div className='flex items-center gap-8'>
                <h2 className='font-semibold text-28 text-primary-black'>
                    {title}
                </h2>
                {showFilter && (
                    <Button
                        className='text-sm text-primary-black'
                        onClick={filterOnClick}
                        size={'icon'}
                        variant={'ghost'}
                    >
                        <Icons.Filter />
                    </Button>
                )}
            </div>

            {link != null && (
                <Link
                    to={link}
                    className='flex items-center gap-2 text-sm text-orange-500'
                >
                    {t('common.see_all')}
                    <Icons.ArrowRight
                        className={
                            i18n.dir() === 'rtl' ? 'rotate-180 transform' : ''
                        }
                    />
                </Link>
            )}
        </div>
    )
}
