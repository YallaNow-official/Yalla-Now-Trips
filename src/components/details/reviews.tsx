import { Icons } from '../icons'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { reviewSchema, type ReviewSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewCard } from '../cards/review-card'
import { Separator } from '../ui/separator'
import React, { useState } from 'react'
import { TourDetailsType, TripDetailsType } from '@/types'
import { ButtonLoading } from '../ui/button-loading'
import { cn } from '@/lib/utils'
import { useUser } from '../providers/user-provider'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { useTranslation } from 'react-i18next'

type ReviewsProps = {
    trip?: TripDetailsType | TourDetailsType
}

const isTrip = (
    trip?: TripDetailsType | TourDetailsType,
): trip is TripDetailsType => {
    return (trip as TripDetailsType)?.tripReviews !== undefined
}

export const Reviews = ({ trip }: ReviewsProps) => {
    const { t, i18n } = useTranslation()
    const { user } = useUser()
    const queryClient = useQueryClient()
    const [hoverRating, setHoverRating] = useState(0)
    const form = useForm<ReviewSchema>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 0,
            review: '',
        },
    })
    const userRating = form.watch('rating')

    const { mutate } = useMutation({
        mutationFn: (
            data: ReviewSchema & {
                tripId: string
                packageId: string
            },
        ) => {
            return api.post('/api/Review', {
                ...data,
                comment: data.review,
                tripId: trip?.id,
                packageId: trip?.id,
            })
        },
        onSuccess: () => {
            form.reset()
            toast.success(t('success.review_submitted'))
            queryClient.invalidateQueries({
                exact: true,
                queryKey: ['trip', trip?.id],
            })
        },
        onError: (err) => {
            if (isAxiosError(err)) {
                switch (err.status) {
                    case 400:
                        toast.error(t('error.invalid_data'))
                        break
                    case 401:
                        toast.error(t('error.unauthorized'))
                        break
                    default:
                        toast.error(t('error.something_wrong'))
                        break
                }
                return
            }

            toast.error(t('error.something_wrong'))
        },
    })

    const onSubmit = (data: ReviewSchema) => {
        if (trip == null) return

        mutate({
            ...data,
            tripId: trip.id,
            packageId: trip.id,
        })
    }

    return (
        <section className='space-y-10 pb-8'>
            <div className='space-y-6'>
                <h2 className='text-28 font-semibold text-primary-black'>
                    {t('details.customer_reviews')}
                </h2>
            </div>

            <div className='flex items-center gap-3'>
                <span className='block text-28 font-medium tracking-[-0.0375em] text-primary-black'>
                    {isTrip(trip)
                        ? (trip?.tripReviews.length ?? 0)
                        : trip?.reviews.length}{' '}
                    {t('details.reviews')}
                </span>

                <span className='flex items-center gap-1 text-2xl text-gray-600'>
                    {isTrip(trip) ? trip?.rating : (trip?.averageRating ?? 0)}{' '}
                    <Icons.Star className='fill-[#FFDB00]' />
                </span>
            </div>

            <div className='space-y-6'>
                {(isTrip(trip) ? trip?.tripReviews : trip?.reviews)?.map(
                    (review, i) => (
                        <React.Fragment key={i}>
                            <ReviewCard
                                name={review.userName}
                                rating={review.userRate}
                                review={review.comment}
                            />
                            <Separator className='bg-[#E8ECEF]' />
                        </React.Fragment>
                    ),
                )}
            </div>

            {user != null && (
                <>
                    <div
                        className='flex items-center gap-2'
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        {new Array(5).fill(0).map((_, i) => (
                            <Icons.StarLarge
                                key={i}
                                className={cn(
                                    'cursor-pointer',
                                    i < hoverRating && 'fill-[#141718]',
                                    hoverRating === 0 &&
                                        i < userRating &&
                                        'fill-[#141718]',
                                )}
                                onMouseEnter={() => setHoverRating(i + 1)}
                                onClick={() => form.setValue('rating', i + 1)}
                            />
                        ))}
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='pt-2'
                        >
                            <FormField
                                control={form.control}
                                name='review'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className='relative'>
                                                <ButtonLoading
                                                    type='submit'
                                                    variant={'ghost'}
                                                    size={'icon'}
                                                    className={cn(
                                                        'absolute top-1/2 h-auto w-auto -translate-y-1/2 rounded-full bg-[#F5F5F5] p-3',
                                                        i18n.dir() === 'ltr'
                                                            ? 'right-8'
                                                            : 'left-8 -rotate-90',
                                                    )}
                                                >
                                                    <Icons.Send className='shrink-0' />
                                                    <span className='sr-only'>
                                                        Submit Review
                                                    </span>
                                                </ButtonLoading>
                                                <Textarea
                                                    placeholder={t(
                                                        'details.write_review',
                                                    )}
                                                    className='resize-none rounded-2xl border-2 border-[#E8ECEF] px-6 py-4 text-primary-black placeholder:text-primary-black'
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </>
            )}
        </section>
    )
}
