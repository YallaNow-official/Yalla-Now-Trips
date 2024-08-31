import { CardTitleOverlay } from '@/components/cards/card-title-overlay'
import { CardWithDetails } from '@/components/cards/card-with-details'
import { ContactUsForm } from '@/components/forms/contact-us-form'
import { SectionHeader } from '@/components/section-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GridWrapper } from '@/components/wrappers/grid-wrapper'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { OffersCarouselWrapper } from '@/components/wrappers/offers-carousel-wrapper'
import { api } from '@/lib/api'
import { FilterValue, Inspiration, TripOrTourHome } from '@/types'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { format, subDays } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { CustomSelect } from '@/components/custom-select'

export const Home = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState<{
        place: string
        bookingType: string
        checkInDate: Date
    }>({
        place: '',
        bookingType: '',
        checkInDate: new Date(),
    })
    const { data: inspirations, isLoading: loadingInspirations } = useQuery<
        Inspiration[]
    >({
        queryKey: ['inspirations'],
        queryFn: async () => {
            return (await api.get('/api/Home/Locations_with-trip-count')).data
        },
    })

    const { data: tours, isLoading: loadingTours } = useQuery<TripOrTourHome[]>(
        {
            queryKey: ['tours', 'popular'],
            queryFn: async () => {
                return (await api.get('/api/Home/tours/popular')).data
            },
        },
    )

    const { data: trips, isLoading: loadingTrips } = useQuery<TripOrTourHome[]>(
        {
            queryKey: ['trips', 'popular'],
            queryFn: async () => {
                return (await api.get('/api/Home/trips/popular')).data
            },
        },
    )

    const { data: bookingType } = useQuery<FilterValue>({
        queryKey: ['filter-values'],
        queryFn: async () => {
            return (await api.get('/api/Trip/SearchExamples')).data
        },
    })

    const { t, i18n } = useTranslation()

    return (
        <main>
            <section
                className='hero min-h-[80vh]'
                style={{
                    backgroundImage: 'url(/home-intro.png)',
                }}
                dir={i18n.dir()}
            >
                <div className='flex-col gap-0 text-center hero-content'>
                    <div className='max-w-xl mt-32'>
                        <h1 className='text-balance pb-2 text-[2rem] font-bold text-white'>
                            {t('home.hero_title')}
                        </h1>
                        <p className='text-xl text-white text-balance'>
                            {t('home.hero_text')}
                        </p>
                    </div>
                    <div className='flex flex-col items-center w-full max-w-screen-lg gap-3 p-3 mt-5 bg-white rounded-lg shadow-home-search sm:translate-y-28 sm:flex-row'>
                        <Input
                            className='border-none bg-[#F2F2F2] lg:min-w-64'
                            placeholder={t('home.search_place_placeholder')}
                            value={search.place}
                            onChange={(e) =>
                                setSearch((prev) => ({
                                    ...prev,
                                    place: e.target.value,
                                }))
                            }
                        />

                        <CustomSelect
                            className='border-none bg-[#F2F2F2] lg:min-w-64'
                            defaultValue={search.bookingType}
                            onChange={(value) =>
                                setSearch((prev) => ({
                                    ...prev,
                                    bookingType: value,
                                }))
                            }
                            options={bookingType?.bookingTypes ?? []}
                            placeholder={t('home.booking_type_placeholder')}
                            value={search.bookingType}
                            isForm={false}
                        />

                        {/* <Input
                            className='border-none bg-[#F2F2F2] lg:min-w-64'
                            placeholder={t('home.booking_type_placeholder')}
                            value={search.bookingType}
                            onChange={(e) =>
                                setSearch((prev) => ({
                                    ...prev,
                                    bookingType: e.target.value,
                                }))
                            }
                        /> */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={'outline'}
                                    className={cn(
                                        'w-full border-none bg-[#F2F2F2] lg:min-w-64',
                                        !search.checkInDate &&
                                            'text-muted-foreground',
                                    )}
                                >
                                    {search.checkInDate ? (
                                        format(search.checkInDate, 'PPP')
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className='w-4 h-4 ml-auto opacity-50' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className='flex flex-col w-auto p-0 border-none rounded-lg'
                                align='start'
                            >
                                <div className='flex flex-col rounded-t-lg bg-primary-red px-3.5 py-2 font-bold text-white'>
                                    <span className='opacity-60'>
                                        {search.checkInDate.getFullYear()}
                                    </span>
                                    <span>
                                        {format(
                                            search.checkInDate,
                                            'EEE, MMMM d',
                                        )}
                                    </span>
                                </div>
                                <Calendar
                                    className=''
                                    mode='single'
                                    selected={search.checkInDate}
                                    onSelect={(date) => {
                                        setSearch((prev) => ({
                                            ...prev,
                                            checkInDate: date ?? new Date(),
                                        }))
                                    }}
                                    disabled={(date) =>
                                        date < subDays(new Date(), 1)
                                    }
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        <Button
                            className='rounded-sm min-w-28 max-sm:w-full'
                            variant={'primary'}
                            disabled={
                                search.place === '' ||
                                search.bookingType === '' ||
                                !search.checkInDate
                            }
                            onClick={() => {
                                navigate(
                                    `/search?place=${search.place}&bookingType=${search.bookingType}&checkInDate=${search.checkInDate.getTime()}`,
                                )
                            }}
                        >
                            <span className='font-normal text-white text-15'>
                                {t('home.search_button')}
                            </span>
                        </Button>
                    </div>
                </div>
            </section>

            <section className='container py-16'>
                <SectionHeader title={t('home.inspirations_title')} />
                <GridWrapper gridCols={3}>
                    {loadingInspirations ? (
                        <div className='col-span-full'>
                            <Loader2 className='mx-auto size-10 animate-spin' />
                        </div>
                    ) : inspirations != null && inspirations.length > 0 ? (
                        inspirations.map((inspiration, i) => (
                            <CardTitleOverlay
                                key={i}
                                imageUrl={inspiration.imageUrl}
                                title={inspiration.locationName}
                                trip={inspiration.tripCount}
                            />
                        ))
                    ) : (
                        <p className='text-3xl font-semibold text-center col-span-full'>
                            {t('not_found.trips')}
                        </p>
                    )}
                </GridWrapper>
            </section>

            <section className='container pt-9'>
                <SectionHeader title={t('home.offers_title')} link='/offers' />
                <OffersCarouselWrapper />
            </section>

            <section className='container py-16' dir={i18n.dir()}>
                <SectionHeader title={t('common.trips_title')} link='/trips' />
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
            </section>

            <section className='container pb-16' dir={i18n.dir()}>
                <SectionHeader title={t('common.tours_title')} link='/tours' />
                <GridWrapper gridCols={4}>
                    {loadingTours ? (
                        <div className='col-span-full'>
                            <Loader2 className='mx-auto size-10 animate-spin' />
                        </div>
                    ) : tours != null && tours.length > 0 ? (
                        tours.map((tour) => (
                            <Link to={`/tour/${tour.id}`} key={tour.id}>
                                <CardWithDetails
                                    imageUrl={tour.imageUrl}
                                    title={tour.name}
                                    subTitle={tour.location}
                                    // discount={tour}
                                />
                            </Link>
                        ))
                    ) : (
                        <p className='text-3xl font-semibold text-center col-span-full'>
                            {t('not_found.tours')}
                        </p>
                    )}
                </GridWrapper>
            </section>

            <section className='container relative'>
                <div
                    className='absolute flex flex-col font-semibold text-white -translate-y-1/2 left-24 top-1/2'
                    dir={i18n.dir()}
                >
                    <span className='text-28'>{t('home.banner_subtitle')}</span>
                    <span className='text-[2.5rem]'>
                        {t('home.banner_title')}
                    </span>
                </div>
                <img
                    src='/banners/home.png'
                    alt='Yalla now mobile application'
                    className='max-h-96 min-h-80 w-full rounded-lg object-cover object-[85%]'
                />
            </section>

            <ContactUsForm />
        </main>
    )
}
