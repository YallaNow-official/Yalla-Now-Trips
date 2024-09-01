import { api } from '@/lib/api'
import { SearchType } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
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
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCustomSearchParams } from '@/hooks/use-custom-search-params'
import { FilterSheet } from '@/components/filter-sheet'
import { useState } from 'react'
import { CardWithBooking } from '@/components/cards/card-with-booking'

export const Search = () => {
    const [open, setOpen] = useState(false)
    const { t, i18n } = useTranslation()
    const [searchParams] = useSearchParams()
    const place = searchParams.get('place')
    const bookingType = searchParams.get('bookingType')
    const checkInDate = new Date(
        isNaN(Number(searchParams.get('checkInDate')))
            ? Date.now()
            : Number(searchParams.get('checkInDate')),
    )
    const { page, setSearchParams } = useCustomSearchParams()

    const { data: trips, isLoading: loadingTrips } = useQuery<SearchType>({
        queryKey: ['trips', 'search', page, place, checkInDate],
        queryFn: async () => {
            return (
                await api.get('/api/Home/trips', {
                    params: {
                        location: place,
                        bookingType,
                        checkInDate,
                        pageNumber: page,
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

            <div className='flex gap-10 pt-8'>
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
                    <div className='flex flex-col gap-6'>
                        {loadingTrips ? (
                            <div className='col-span-full'>
                                <Loader2 className='mx-auto size-10 animate-spin' />
                            </div>
                        ) : trips != null && trips.items?.length > 0 ? (
                            trips.items?.map((trip) => (
                                <Link to={`/trip/${trip.id}`} key={trip.id}>
                                    <CardWithBooking
                                        imageUrl={trip.mainImageUrl}
                                        title={trip.title}
                                        subTitle={trip.destination}
                                        duration={trip.duration}
                                        price={trip.price}
                                        rating={trip.rating ?? 0}
                                        // discount={trip.discount}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p className='text-3xl font-semibold text-center col-span-full'>
                                {t('not_found.trips')}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <PaginationWrapper
                initialPage={page}
                // total={trips?.totalPages ?? 1}
                total={2}
                className='py-16'
            />
        </main>
    )
}
