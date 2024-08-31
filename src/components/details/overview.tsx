import {
    Timeline,
    TourDetailsType,
    TourTimeline,
    TripDetailsType,
} from '@/types'
import { Icons } from '../icons'
import { Separator } from '../ui/separator'
import { useTranslation } from 'react-i18next'

type OverviewProps = {
    trip?: TripDetailsType | TourDetailsType
}

const isTrip = (
    trip: TripDetailsType | TourDetailsType,
): trip is TripDetailsType => {
    return (trip as TripDetailsType)?.tripReviews !== undefined
}

export const Overview = ({ trip }: OverviewProps) => {
    const { t, i18n } = useTranslation()

    return (
        <section>
            <h2 className='text-28 font-semibold text-primary-black'>
                {t('details.overview')}
            </h2>
            <p className='text-xl text-gray-900'>{trip?.description}</p>

            <h2 className='pt-6 text-28 font-semibold text-primary-black'>
                {t('details.program')}
            </h2>
            {trip?.timeline?.map((timeline, i) => {
                if (isTrip(trip)) {
                    const _timeline = timeline as Timeline
                    return (
                        <div key={i} className='pt-6'>
                            <>
                                <h3 className='text-2xl font-semibold text-gray-900'>
                                    {t('details.day')} {_timeline?.day}
                                </h3>
                                <ul className='list-disc pl-5'>
                                    {_timeline.activities[
                                        i18n.language as 'en' | 'ar'
                                    ]?.map((activity, i) => (
                                        <li
                                            key={i}
                                            className='text-xl text-gray-900'
                                        >
                                            {activity}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        </div>
                    )
                }

                const _timeline = timeline as TourTimeline
                return (
                    <div key={i} className='pt-6'>
                        <>
                            <h3 className='text-2xl font-semibold text-gray-900'>
                                {_timeline?.title}
                            </h3>
                            <ul className='list-disc pl-5'>
                                <li key={i} className='text-xl text-gray-900'>
                                    {_timeline?.description}
                                </li>
                            </ul>
                        </>
                    </div>
                )
            })}

            <h2 className='pt-8 text-28 font-semibold text-primary-black'>
                {t('details.take_with_you')}
            </h2>

            <div className='flex flex-col gap-3.5 pt-6'>
                {trip?.guides?.map((guide, i) => (
                    <div key={i} className='flex items-center gap-3'>
                        <Icons.Plus />
                        <span className='text-xl text-primary-black'>
                            {typeof guide === 'string' ? guide : guide.content}
                        </span>
                    </div>
                ))}
            </div>

            <h2 className='pt-8 text-28 font-semibold text-primary-black'>
                {t('details.include')}
            </h2>

            <div className='flex flex-col gap-3.5 pt-6'>
                {trip?.inclusions?.split(',').map((inclusion, i) => (
                    <div key={i} className='flex items-center gap-3'>
                        <Icons.Check />
                        <span className='text-xl text-primary-black'>
                            {inclusion}
                        </span>
                    </div>
                ))}
            </div>

            <h2 className='pt-8 text-28 font-semibold text-primary-black'>
                {t('details.not_include')}
            </h2>

            <div className='flex flex-col gap-3.5 pt-6'>
                {trip?.nonInclusions?.split(',').map((nonInclusion, i) => (
                    <div key={i} className='flex items-center gap-3'>
                        <Icons.X />
                        <span className='text-xl text-primary-black'>
                            {nonInclusion}
                        </span>
                    </div>
                ))}
            </div>

            <Separator className='my-8' />
        </section>
    )
}
