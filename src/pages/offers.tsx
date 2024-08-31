import { CardWithDetails } from '@/components/cards/card-with-details'
import { Icons } from '@/components/icons'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { GridWrapper } from '@/components/wrappers/grid-wrapper'
import { OffersCarouselWrapper } from '@/components/wrappers/offers-carousel-wrapper'
import { api } from '@/lib/api'
import { TripOrTourHome } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const Offers = () => {
    const { t, i18n } = useTranslation()
    const { data: trips, isLoading: loadingTrips } = useQuery<TripOrTourHome[]>(
        {
            queryKey: ['trips', 'popular'],
            queryFn: async () => {
                return (await api.get('/api/Home/trips/popular')).data
            },
        },
    )

    return (
        <main className='container pt-3 pb-16' dir={i18n.dir()}>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                to='/'
                                className='text-sm font-normal text-primary-black'
                            >
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        {<Icons.CaretRight className='stroke-primary-black' />}
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-sm font-normal text-primary-black'>
                            Offers
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <section>
                <OffersCarouselWrapper showHandles size='large' />
            </section>
            <GridWrapper gridCols={4}>
                {loadingTrips ? (
                    <div className='col-span-full'>
                        <Loader2 className='mx-auto size-10 animate-spin' />
                    </div>
                ) : trips != null && trips.length > 0 ? (
                    trips.map((trip) => (
                        <Link to={`/trip/${trip.id}`} key={trip.id}>
                            <CardWithDetails
                                imageUrl={trip.imageUrl}
                                title={trip.name}
                                subTitle={trip.location}
                                // discount={trip.discount}
                            />
                        </Link>
                    ))
                ) : (
                    <p className='text-3xl font-semibold text-center col-span-full'>
                        {t('not_found.trips')}
                    </p>
                )}
            </GridWrapper>
        </main>
    )
}
