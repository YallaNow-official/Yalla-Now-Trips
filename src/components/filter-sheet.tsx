import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { api } from '@/lib/api'
import { cn, formatPrice } from '@/lib/utils'
import { FilterValue } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { Separator } from './ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Icons } from './icons'
import MultiRangeSlider from 'multi-range-slider-react'
import { Input } from './ui/input'
import { useMediaQuery } from '@mantine/hooks'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { ScrollArea } from './ui/scroll-area'
import { useTranslation } from 'react-i18next'

type FilterSheetProps = {
    isOpen: boolean
    setOpen: (open: boolean) => void
    setSearchParams: ReturnType<typeof useSearchParams>['1']
    searchParams: ReturnType<typeof useSearchParams>['0']
}

export const FilterSheet = ({
    isOpen,
    setOpen,
    setSearchParams,
    searchParams,
}: FilterSheetProps) => {
    const { t, i18n } = useTranslation()
    const match = useMediaQuery('(min-width: 640px)')
    const { data } = useQuery<FilterValue>({
        queryKey: ['filter-values'],
        queryFn: async () => {
            return (await api.get('/api/Trip/SearchExamples')).data
        },
    })

    const renderContent = () => {
        return (
            <div
                className={cn(
                    'flex min-h-screen max-w-[15rem] flex-col gap-6 overflow-hidden text-gray-900',
                    isOpen ? 'w-full shrink-0' : 'w-0',
                )}
                dir={i18n.dir()}
            >
                <div className='flex flex-col gap-3'>
                    <span className='pb-1 font-medium uppercase'>
                        {t('filter.country')}
                    </span>
                    <RadioGroup
                        defaultValue={searchParams.get('location') ?? 'all'}
                        onValueChange={(value) => {
                            if (value === 'all') {
                                searchParams.delete('location')
                                setSearchParams(searchParams)
                                return
                            }
                            searchParams.set('location', value)
                            setSearchParams(searchParams)
                        }}
                        dir={i18n.dir()}
                    >
                        <div className='flex items-center gap-2'>
                            <RadioGroupItem value='all' id='all' />
                            <Label htmlFor='all'>
                                {t('filter.all_countries')}
                            </Label>
                        </div>
                        {data?.locations.map((country) => (
                            <div
                                key={country}
                                className='flex items-center gap-2'
                            >
                                <RadioGroupItem value={country} id={country} />
                                <Label htmlFor={country}>{country}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <Separator className='bg-[#E4E7E9]' />

                <div className='flex flex-col gap-2'>
                    <span className='pb-2 font-medium uppercase'>
                        {t('filter.rating')}
                    </span>
                    <span className='text-sm font-normal text-[#4F4F4F]'>
                        {t('filter.rating_subtitle')}
                    </span>
                    <ToggleGroup
                        type='single'
                        className='grid grid-cols-5 gap-0 border rounded-sm'
                        onValueChange={(value) => {
                            if (value === '') {
                                searchParams.delete('minRating')
                                setSearchParams(searchParams)
                                return
                            }
                            searchParams.set('minRating', value)
                            setSearchParams(searchParams)
                        }}
                        dir={i18n.dir()}
                    >
                        {new Array(5).fill(null).map((_, index) => (
                            <ToggleGroupItem
                                key={index}
                                value={`${index + 1}`}
                                className='flex items-center justify-center gap-1 rounded-none border-l text-sm font-normal text-[#4F4F4F] first:border-l-0'
                            >
                                {index + 1} <Icons.Star />
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </div>

                <Separator className='bg-[#E4E7E9]' />

                <div className='flex flex-col gap-4'>
                    <span className='font-medium uppercase'>
                        {t('filter.price_range')}
                    </span>
                    <MultiRangeSlider
                        className='border-none px-4 py-0 shadow-none [&_.bar-left]:rounded-none [&_.bar-left]:p-0 [&_.bar-left]:shadow-none [&_.bar-right]:rounded-none [&_.bar-right]:p-0 [&_.bar-right]:shadow-none [&_.thumb]:before:top-0.5 [&_.thumb]:before:size-3 [&_.thumb]:before:border-2 [&_.thumb]:before:border-primary-red [&_.thumb]:before:bg-white [&_.thumb]:before:shadow-none'
                        ruler={false}
                        barInnerColor='#b20404'
                        barLeftColor='#E4E7E9'
                        barRightColor='#E4E7E9'
                        label={false}
                        min={Math.min(...(data?.prices.minPrice ?? [0]))}
                        max={Math.max(...(data?.prices.maxPrice ?? [0]))}
                        minValue={
                            Number(searchParams.get('minPrice')) ||
                            Math.min(...(data?.prices.minPrice ?? [0]))
                        }
                        maxValue={
                            Number(searchParams.get('maxPrice')) ||
                            Math.max(...(data?.prices.maxPrice ?? [0]))
                        }
                        onChange={(e) => {
                            searchParams.set('minPrice', e.minValue.toString())
                            searchParams.set('maxPrice', e.maxValue.toString())
                            setSearchParams(searchParams)
                        }}
                    />
                    <div className='grid grid-cols-2 gap-3'>
                        <Input
                            type='number'
                            inputMode='numeric'
                            placeholder={t('filter.min_price')}
                            value={searchParams.get('minPrice') ?? undefined}
                            onChange={(e) => {
                                searchParams.set('minPrice', e.target.value)
                                setSearchParams(searchParams)
                            }}
                        />
                        <Input
                            type='number'
                            inputMode='numeric'
                            placeholder={t('filter.max_price')}
                            value={searchParams.get('maxPrice') ?? undefined}
                            onChange={(e) => {
                                searchParams.set('maxPrice', e.target.value)
                                setSearchParams(searchParams)
                            }}
                        />
                    </div>
                    <RadioGroup
                        defaultValue={'all'}
                        onValueChange={(value) => {
                            if (value === 'all') {
                                searchParams.delete('minPrice')
                                searchParams.delete('maxPrice')
                                setSearchParams(searchParams)
                                return
                            }
                            searchParams.set('minPrice', value.split(',')[0])
                            searchParams.set('maxPrice', value.split(',')[1])
                            setSearchParams(searchParams)
                        }}
                        dir={i18n.dir()}
                    >
                        <div className='flex items-center gap-2'>
                            <RadioGroupItem value='all' id='all-price' />
                            <Label htmlFor='all-price'>
                                {t('filter.all_prices')}
                            </Label>
                        </div>
                        {data?.prices.minPrice.map((price, i) => (
                            <div
                                key={price}
                                className='flex items-center gap-2'
                            >
                                <RadioGroupItem
                                    value={`${price},${data?.prices.maxPrice[i]}`}
                                    id={price.toString()}
                                />
                                <Label htmlFor={price.toString()}>
                                    {formatPrice(price)} to{' '}
                                    {formatPrice(data?.prices.maxPrice[i])}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <Separator className='bg-[#E4E7E9]' />

                <div className='flex flex-col gap-3'>
                    <span className='pb-1 font-medium uppercase'>
                        {t('filter.booking_type')}
                    </span>
                    <RadioGroup
                        defaultValue={searchParams.get('bookingType') ?? 'all'}
                        onValueChange={(value) => {
                            if (value === 'all') {
                                searchParams.delete('bookingType')
                                setSearchParams(searchParams)
                                return
                            }
                            searchParams.set('bookingType', value)
                            setSearchParams(searchParams)
                        }}
                        dir={i18n.dir()}
                    >
                        <div className='flex items-center gap-2'>
                            <RadioGroupItem value='all' id='all-types' />
                            <Label htmlFor='all-types'>
                                {t('filter.all_types')}
                            </Label>
                        </div>
                        {data?.bookingTypes.map((type) => (
                            <div key={type} className='flex items-center gap-2'>
                                <RadioGroupItem value={type} id={type} />
                                <Label htmlFor={type}>{type}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <Separator className='bg-[#E4E7E9]' />

                <div className='flex flex-col gap-3'>
                    <span className='pb-1 font-medium uppercase'>
                        {t('filter.activities')}
                    </span>
                    <RadioGroup
                        defaultValue={searchParams.get('activities') ?? 'all'}
                        onValueChange={(value) => {
                            if (value === 'all') {
                                searchParams.delete('activities')
                                setSearchParams(searchParams)
                                return
                            }
                            searchParams.set('activities', value)
                            setSearchParams(searchParams)
                        }}
                        dir={i18n.dir()}
                    >
                        <div className='flex items-center gap-2'>
                            <RadioGroupItem value='all' id='all-activities' />
                            <Label htmlFor='all-activities'>
                                {t('filter.all_activities')}
                            </Label>
                        </div>
                        {data?.activities.map((type) => (
                            <div key={type} className='flex items-center gap-2'>
                                <RadioGroupItem value={type} id={type} />
                                <Label htmlFor={type}>{type}</Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                <Separator className='bg-[#E4E7E9]' />
            </div>
        )
    }

    if (match == null) return null

    if (match) return <>{renderContent()}</>

    return (
        <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetContent side={'left'}>
                <ScrollArea className='pb-10 h-dvh'>
                    {renderContent()}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
