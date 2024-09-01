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
import { Tour, TourDetailsType } from '@/types'
import { cn, formatPrice } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

export const TourDetails = () => {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>()
    const { id } = useParams<{ id: string }>()
    const { t, i18n } = useTranslation()

    const { data: tour, isLoading } = useQuery<TourDetailsType>({
        queryKey: ['trip', id],
        queryFn: async () => {
            return (await api.get(`/api/Package/${id}`)).data
        },
        enabled: id != null,
    })

    const { data: similarTours } = useQuery<Tour[]>({
        queryKey: ['tours', 'similar'],
        queryFn: async () => {
            const res = await api.get('/api/Package/Filter')
            return res.data
                .filter((t: Tour) => t.id !== tour?.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 4)
        },
    })

    if (id == null) {
        return <NotFound />
    }

    if (tour == null && !isLoading) return <NotFound />

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
                        {
                            <Icons.CaretRight
                                className='stroke-primary-black'
                                dir={i18n.dir() === 'rtl' ? 'left' : 'right'}
                            />
                        }
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link
                                to='/tours'
                                className='text-sm font-normal text-primary-black'
                            >
                                {t('common.tours')}
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
                            {t('details.tour')}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <section className='grid gap-11 lg:grid-cols-2'>
                <div className='flex flex-col gap-6' dir='ltr'>
                    <Carousel setApi={setCarouselApi}>
                        <CarouselContent>
                            {tour?.imageUrls.map((img, i) => (
                                <CarouselItem key={i}>
                                    <img
                                        src={img}
                                        alt={`Image ${i + 1}`}
                                        className='aspect-[1.55/1] h-full max-h-[25rem] w-full object-cover'
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='bg-white left-6' />
                        <CarouselNext className='bg-white right-6' />
                    </Carousel>

                    <div className='flex items-center gap-6'>
                        {tour?.imageUrls.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`Image ${i + 1}`}
                                className='aspect-[1.55/1] max-h-24 w-full cursor-pointer object-cover'
                                onClick={() => carouselApi?.scrollTo(i)}
                            />
                        ))}
                    </div>
                </div>

                <div className='space-y-4'>
                    <div className='flex items-center'>
                        {new Array(tour?.averageRating ?? 0)
                            .fill(0)
                            .map((_, i) => (
                                <Icons.Star key={i} />
                            ))}
                        <span className='pl-1.5 text-sm font-semibold text-gray-900'>
                            {tour?.averageRating ?? 0}{' '}
                            {t('details.star_rating')}
                        </span>
                    </div>

                    <h2 className='font-semibold leading-none text-28 text-primary-black'>
                        {tour?.title}
                    </h2>
                    <p>{tour?.description}</p>
                    <Separator className='bg-[#E8ECEF]' />

                    <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                            <Icons.Location />
                            <span className='text-base font-medium text-dark-gray'>
                                {tour?.destination}
                            </span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <Icons.Duration />
                            <span className='text-base font-medium text-dark-gray'>
                                {t('details.duration')}
                                {': '}
                                {tour?.timeline.reduce((acc, curr) => {
                                    return acc + curr.duration
                                }, 0)}{' '}
                                {t('details.days')}
                            </span>
                        </div>
                    </div>

                    <Separator className='bg-[#E8ECEF]' />

                    <div className='flex items-center gap-1 py-2'>
                        <span className='text-2xl font-semibold text-primary-red'>
                            {formatPrice(tour?.price ?? 0)}
                        </span>
                        {/* <span className='text-lg text-gray-500 line-through'>
                            $1999
                        </span>
                        <div className='ml-2 bg-secondary-orange px-2.5 py-1 text-sm font-semibold text-white'>
                            21% OFF
                        </div> */}
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
                    <Overview trip={tour} />
                </TabsContent>
                <TabsContent value='reviews' dir={i18n.dir()}>
                    <Reviews trip={tour} />
                </TabsContent>
            </Tabs>

            <section className='pb-16'>
                <SectionHeader title={t('details.similar_tours')} />
                <GridWrapper gridCols={4}>
                    {similarTours?.map((tour) => (
                        <Link to={`/tour/${tour.id}`} key={tour.id}>
                            <CardWithDetails
                                imageUrl={tour.mainImageUrl}
                                title={tour.title}
                                subTitle={tour.destination}
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
