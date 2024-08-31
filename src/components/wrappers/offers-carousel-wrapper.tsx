import { useQuery } from '@tanstack/react-query'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { api as axios } from '@/lib/api'
import { Offer } from '@/types'
import { useTranslation } from 'react-i18next'

type OffersCarouselWrapperProps = {
    showHandles?: boolean
    className?: string
    size?: 'small' | 'large'
}

export const OffersCarouselWrapper = ({
    showHandles = false,
    className,
    size = 'small',
}: OffersCarouselWrapperProps) => {
    const { i18n } = useTranslation()
    const [api, setApi] = useState<CarouselApi>()
    const [currentSlide, setCurrentSlide] = useState(0)
    const { data: offers } = useQuery<Offer[]>({
        queryKey: ['offers'],
        queryFn: async () => {
            return (await axios.get('/api/Offers')).data
        },
    })

    useEffect(() => {
        if (!api) return

        const handleSlideChange = () => {
            setCurrentSlide(api.selectedScrollSnap())
        }

        api.on('select', handleSlideChange)

        return () => {
            api.off('select', handleSlideChange)
        }
    }, [api])

    return (
        <Carousel
            setApi={setApi}
            className='mt-6'
            opts={{
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                {offers?.map((offer) => (
                    <CarouselItem key={offer.id} className='relative'>
                        <img
                            src={offer.imageUrl}
                            alt={offer.name}
                            className={cn(
                                'w-full object-cover',
                                size === 'small'
                                    ? 'max-h-96 min-h-96'
                                    : 'max-h-[32.5rem] min-h-[32.5rem]',
                                className,
                            )}
                        />
                        <div
                            className={cn(
                                'absolute left-10 flex flex-col gap-1.5 md:left-32',
                                size === 'small'
                                    ? 'top-[20%] md:top-[40%]'
                                    : 'top-[37%]',
                                showHandles && 'left-14',
                            )}
                            dir={i18n.dir()}
                        >
                            <span className='text-3xl font-semibold text-gray-900 md:text-5xl'>
                                {offer.name}
                            </span>
                            <span className='w-4/5 pb-8 text-base text-gray-700 text-balance md:text-lg'>
                                {offer.description}
                            </span>
                            <Button
                                className='px-8 rounded-sm h-11 w-fit'
                                variant={'primary'}
                            >
                                <span className='text-base font-bold text-white uppercase'>
                                    Book now
                                </span>
                            </Button>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className='absolute flex items-center justify-center w-full gap-3 bottom-12'>
                {offers?.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => api?.scrollTo(i)}
                        className={cn(
                            'size-2.5 rounded-full bg-[#ADB7BC] duration-200 hover:bg-primary-red',
                            i === currentSlide && 'bg-primary-red',
                        )}
                    />
                ))}
            </div>
            {showHandles && (
                <>
                    <CarouselPrevious className='bg-white left-1 md:left-6' />
                    <CarouselNext className='bg-white right-1 md:right-6' />
                </>
            )}
        </Carousel>
    )
}
