import { Link, useParams } from 'react-router-dom'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Icons } from '@/components/icons'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Overview } from '@/components/details/overview'
import { Reviews } from '@/components/details/reviews'
import { SectionHeader } from '@/components/section-header'
import { CardWithDetails } from '@/components/cards/card-with-details'
import { GridWrapper } from '@/components/wrappers/grid-wrapper'
import { NotFound } from './not-found'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Trip, TripDetailsType } from '@/types'
import { cn, formatPrice } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export const TripDetails = () => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>()
    const { id } = useParams<{ id: string }>()
    const { t, i18n } = useTranslation()

    const { data: trip, isLoading } = useQuery<TripDetailsType>({
        queryKey: ['trip', id],
        queryFn: async () => {
            return (
                await api.get('/api/Trip/GetByID', {
                    params: {
                        id,
                    },
                })
            ).data
        },
        enabled: id != null,
    })

    const { data: similarTrips } = useQuery<Trip[]>({
        queryKey: ['trips', 'similar'],
        queryFn: async () => {
            const res = await api.get('/api/Trip/Filter')
            return res.data
                .filter((t: Trip) => t.id !== trip?.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 4)
        },
    })

    if (id == null) {
        return <NotFound />
    }

    if (trip == null && !isLoading) return <NotFound />

    return (
        <main className='container py-2' dir={i18n.dir()}>
            <Breadcrumb className='pb-14'>
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
                        {<Icons.CaretRight className='stroke-primary-black' />}
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                to='/trips'
                                className='text-sm font-normal text-primary-black'
                            >
                                {t('common.trips')}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                        {<Icons.CaretRight className='stroke-primary-black' />}
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbPage className='text-sm font-normal text-primary-black'>
                            {t('details.trip')}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <section className='grid gap-11 lg:grid-cols-2'>
                <div className='flex flex-col gap-6' dir='ltr'>
                    <Carousel setApi={setCarouselApi}>
                        <CarouselContent>
                            {isLoading ? (
                                <div className='flex w-full items-center justify-center'>
                                    <Loader2 className='mx-auto size-10 animate-spin' />
                                </div>
                            ) : (
                                trip != null &&
                                trip.imageUrls.map((url, i) => (
                                    <CarouselItem key={i}>
                                        <img
                                            src={url}
                                            alt={`Image ${i + 1}`}
                                            className='aspect-[1.55/1] h-full max-h-[25rem] w-full object-cover'
                                        />
                                    </CarouselItem>
                                ))
                            )}
                        </CarouselContent>
                        <CarouselPrevious className='left-6 bg-white' />
                        <CarouselNext className='right-6 bg-white' />
                    </Carousel>

                    <div className='flex items-center gap-6'>
                        {trip?.imageUrls.map((url, i) => (
                            <img
                                key={i}
                                src={url}
                                alt={`Image ${i + 1}`}
                                className='aspect-[1.55/1] max-h-40 w-full cursor-pointer object-cover lg:max-h-24'
                                onClick={() => carouselApi?.scrollTo(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className='space-y-4'>
                    <div className='flex items-center'>
                        {new Array(trip?.rating ?? 0).fill(0).map((_, i) => (
                            <Icons.Star key={i} />
                        ))}
                        <span className='pl-1.5 text-sm font-semibold text-gray-900'>
                            {trip?.rating} {t('details.star_rating')}
                        </span>
                    </div>

                    <h2 className='text-28 font-semibold leading-none text-primary-black'>
                        {trip?.title}
                    </h2>
                    <p>{trip?.description}</p>
                    <Separator className='bg-[#E8ECEF]' />

                    <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                            <Icons.Location />
                            <span className='text-base font-medium text-dark-gray'>
                                {trip?.destination}
                            </span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Icons.Duration />
                            <span className='text-base font-medium text-dark-gray'>
                                {t('details.duration')}
                                {': '}
                                {trip?.duration} {t('details.days')}
                            </span>
                        </div>
                    </div>

                    <Separator className='bg-[#E8ECEF]' />

                    <div className='flex items-center gap-1 py-2'>
                        <span className='text-2xl font-semibold text-primary-red'>
                            {formatPrice(trip?.price ?? 0)}
                        </span>
                        {/* {discount && (
                            <>
                                <span className='text-lg text-gray-500 line-through'>
                                    $1999
                                </span>
                                <div className='ml-2 bg-secondary-orange px-2.5 py-1 text-sm font-semibold text-white'>
                                    21% OFF
                                </div>
                            </>
                        )} */}
                    </div>

                    <Separator className='bg-[#E8ECEF]' />

                    <Link
                        to={`/booking/${id}`}
                        className={buttonVariants({
                            variant: 'primary',
                            className: 'h-auto w-full rounded-[0.1875rem] py-0',
                        })}
                    >
                        <span className='font-bold leading-[3.5rem] tracking-[0.012em]'>
                            {t('details.book_now')}
                        </span>
                    </Link>
                </div>
            </section>

            <Tabs defaultValue='overview' className='pt-16'>
                <TabsList
                    className={cn(
                        'bg-white',
                        i18n.dir() === 'rtl'
                            ? 'flex-row-reverse'
                            : 'justify-start',
                    )}
                >
                    <TabsTrigger value='overview' className='bg-white'>
                        <div className='absolute -bottom-1 left-0 right-0 h-[3px] group-data-[state=active]:bg-primary-red' />
                        {t('details.overview')}
                    </TabsTrigger>
                    <TabsTrigger value='reviews' className='bg-white'>
                        <div className='absolute -bottom-1 left-0 right-0 h-[3px] group-data-[state=active]:bg-primary-red' />
                        {t('details.guest_reviews')}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='overview' dir={i18n.dir()}>
                    <Overview trip={trip} />
                </TabsContent>
                <TabsContent value='reviews' dir={i18n.dir()}>
                    <Reviews trip={trip} />
                </TabsContent>
            </Tabs>

            <section className='pb-16'>
                <SectionHeader title='Similar Trips' />
                <GridWrapper gridCols={4}>
                    {similarTrips?.map((trip) => (
                        <Link to={`/trip/${trip.id}`} key={trip.id}>
                            <CardWithDetails
                                imageUrl={trip.imageUrl}
                                title={trip.title}
                                subTitle={trip.destination}
                                // discount={
                                //     Math.random() > 0.5
                                //         ? Math.floor(Math.random() * 30)
                                //         : undefined
                                // }
                            />
                        </Link>
                    ))}
                </GridWrapper>
            </section>
        </main>
    )
}
