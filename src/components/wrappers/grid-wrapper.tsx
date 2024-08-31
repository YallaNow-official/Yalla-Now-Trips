import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

type GridWrapperProps = {
    gridCols: 3 | 4
    children: React.ReactNode
    filterOpen?: boolean
    className?: string
}

export const GridWrapper = ({
    gridCols,
    children,
    className,
    filterOpen = false,
}: GridWrapperProps) => {
    const { i18n } = useTranslation()
    return (
        <div
            dir={i18n.dir()}
            className={cn(
                'grid gap-5 pt-6',
                { 'sm:grid-cols-2 lg:grid-cols-3': gridCols === 3 },
                {
                    'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4':
                        gridCols === 4,
                },
                { 'sm:grid-cols-1 md:grid-cols-2': filterOpen },
                className,
            )}
        >
            {children}
        </div>
    )
}
