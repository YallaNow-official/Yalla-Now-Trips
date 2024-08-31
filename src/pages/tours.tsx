import { CardWithDetails } from '@/components/cards/card-with-details'
import { SectionHeader } from '@/components/section-header'
import { Icons } from '@/components/icons'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { PaginationWrapper } from '@/components/wrappers/pagination-wrapper'
import { Link } from 'react-router-dom'
import { GridWrapper } from '@/components/wrappers/grid-wrapper'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { PaginatedTours } from '@/types'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCustomSearchParams } from '@/hooks/use-custom-search-params'
import { useState } from 'react'
import { FilterSheet } from '@/components/filter-sheet'
import { cn } from '@/lib/utils'

export const Tours = () => {
    const [open, setOpen] = useState(true)
    const { t, i18n } = useTranslation()
    const {
        page,
        location,
        minRating,
        maxRating,
        minPrice,
        maxPrice,
        activity,
        bookingType,
        categories,
        setSearchParams,
        searchParams,
    } = useCustomSearchParams()
    const { data: tours, isLoading: loadingTours } = useQuery<PaginatedTours>({
        queryKey: [
            'tours',
            page,
            location,
            minRating,
            maxRating,
            minPrice,
            maxPrice,
            activity,
            bookingType,
            categories,
        ],
        queryFn: async () => {
            return (
                await api.get('/api/Package/Paginanted', {
                    params: {
                        pageNumber: page,
                        location,
                        minRating,
                        maxRating,
                        minPrice,
                        maxPrice,
                        Activities: activity,
                        BookingType: bookingType,
                        categories,
                    },
                })
            ).data
        },
    })

    return (
        <main className='container py-5'>
            <Breadcrumb dir={i18n.dir()}>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                to='/'
                                className='text-sm font-normal text-primary-black'
                            >
                                {t('common.home')}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        {
                            <Icons.CaretRight
                                className='stroke-primary-black'
                                dir={i18n.dir() === 'rtl' ? 'left' : 'right'}
                            />
                        }
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-sm font-normal text-primary-black'>
                            {t('common.tours')}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className={cn('flex pt-8', { 'gap-10': open })}>
                <FilterSheet
                    isOpen={open}
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    setOpen={setOpen}
                />
                <div className='grow'>
                    <SectionHeader
                        title={t('common.tours_title')}
                        showFilter
                        filterOnClick={() => setOpen(!open)}
                    />
                    <GridWrapper gridCols={open ? 3 : 4} filterOpen={open}>
                        {loadingTours ? (
                            <div className='col-span-full'>
                                <Loader2 className='mx-auto size-10 animate-spin' />
                            </div>
                        ) : tours != null && tours.items?.length > 0 ? (
                            tours.items?.map((tour) => (
                                <Link to={`/tour/${tour.id}`} key={tour.id}>
                                    <CardWithDetails
                                        imageUrl={tour.mainImageUrl}
                                        title={tour.title}
                                        subTitle={tour.destination}
                                        // discount={tour.discount}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p className='text-3xl font-semibold text-center col-span-full'>
                                {t('not_found.tours')}
                            </p>
                        )}
                    </GridWrapper>
                </div>
            </div>

            <PaginationWrapper
                initialPage={page}
                total={tours?.totalPages ?? 1}
                className='py-16'
            />
        </main>
    )
}
