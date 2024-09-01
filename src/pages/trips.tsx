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
import { PaginatedTrips } from '@/types'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useCustomSearchParams } from '@/hooks/use-custom-search-params'
import { FilterSheet } from '@/components/filter-sheet'
import { cn } from '@/lib/utils'

export const Trips = () => {
    const [open, setOpen] = useState(false)
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
    const { data: trips, isLoading: loadingTrips } = useQuery<PaginatedTrips>({
        queryKey: [
            'trips',
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
                await api.get('/api/Trip/Filter PaginatedList', {
                    params: {
                        pageNumber: page,
                        location,
                        minRating,
                        maxRating,
                        minPrice,
                        maxPrice,
                        activities: [activity],
                        bookingTypes: [bookingType],
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
                            {t('common.trips')}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div
                className={cn(
                    'flex pt-8',
                    { 'gap-10': open },
                    { 'flex-row-reverse': i18n.dir() === 'rtl' },
                )}
            >
                <FilterSheet
                    isOpen={open}
                    setSearchParams={setSearchParams}
                    searchParams={searchParams}
                    setOpen={setOpen}
                />

                <div className='grow'>
                    <SectionHeader
                        title={t('common.trips_title')}
                        showFilter
                        filterOnClick={() => setOpen(!open)}
                    />
                    <GridWrapper gridCols={open ? 3 : 4} filterOpen={open}>
                        {loadingTrips ? (
                            <div className='col-span-full'>
                                <Loader2 className='mx-auto size-10 animate-spin' />
                            </div>
                        ) : trips != null && trips.items.length > 0 ? (
                            trips.items?.map((trip) => (
                                <Link to={`/trip/${trip.id}`} key={trip.id}>
                                    <CardWithDetails
                                        imageUrl={trip.mainImage}
                                        title={trip.title}
                                        subTitle={trip.destination}
                                        // discount={trip.discount}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p className='col-span-full text-center text-3xl font-semibold'>
                                {t('not_found.trips')}
                            </p>
                        )}
                    </GridWrapper>
                </div>
            </div>
            <PaginationWrapper
                initialPage={page}
                total={trips?.totalPages ?? 1}
                className='py-16'
            />
        </main>
    )
}
