import { Icons } from '@/components/icons'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Link } from 'react-router-dom'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { transportationSchema, type TransportationSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { CarType } from '@/types'
import { CustomSelect } from '@/components/custom-select'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { useUser } from '@/components/providers/user-provider'
import { cn, handleValidationError } from '@/lib/utils'
import { ButtonLoading } from '@/components/ui/button-loading'
import { useTranslation } from 'react-i18next'
import { format, subDays } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

export const Transportation = () => {
    const { user } = useUser()
    const { t, i18n } = useTranslation()
    const form = useForm<TransportationSchema>({
        resolver: zodResolver(transportationSchema),
        defaultValues: {
            carType: '',
            from: '',
            to: '',
            time: new Date(),
            phoneNumber: '',
            numberOfAdults: 0,
            numberOfKids: 0,
            numberOfJuniors: 0,
        },
    })

    const hours = Array.from(
        { length: 12 },
        (_, i) => `${(i + 1).toString().padStart(2, '0')}`,
    )
    const minutes = Array.from({ length: 60 }, (_, i) =>
        i.toString().padStart(2, '0'),
    )
    const ampm = ['AM', 'PM']

    const time = form.watch('time')
    const carType = form.watch('carType')

    const { mutate, isPending } = useMutation({
        mutationFn: (data: TransportationSchema) => {
            return api.post('/api/Booking/TransportationBooking', {
                number: data.phoneNumber,
                pickupLocation: data.from,
                dropoffLocation: data.to,
                vehicleType: data.carType,
                pickupTime: data.time,
                name: user != null ? `${user.firstName} ${user.lastName}` : '',
                ...data,
            })
        },
        onSuccess: () => {
            form.reset()
            toast.success(t('success.request_booking'))
        },
        onError: (err) => {
            if (isAxiosError(err)) {
                switch (err.status) {
                    case 400:
                        handleValidationError(err)
                        break
                    case 401:
                        toast.error(t('error.unauthorized'))
                        break
                    case 500:
                        toast.error(t('error.internal_server_error'))
                        break
                    default:
                        toast.error(t('error.error_occurred'))
                        break
                }
                return
            }
            toast.error(t('error.error_occurred'))
        },
    })

    const { data: carTypes } = useQuery<CarType[]>({
        queryKey: ['carTypes'],
        queryFn: async () => (await api.get('/api/Data')).data,
    })

    const onSubmit = (data: TransportationSchema) => {
        mutate(data)
    }

    return (
        <main className='relative' dir={i18n.dir()}>
            <div className='container absolute h-full pt-4 pb-20 -translate-x-1/2 left-1/2 max-h-96'>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link
                                    to='/'
                                    className='text-sm font-normal text-white'
                                >
                                    {t('common.home')}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            {
                                <Icons.CaretRight
                                    dir={
                                        i18n.dir() === 'rtl' ? 'left' : 'right'
                                    }
                                />
                            }
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className='text-sm font-normal text-white'>
                                {t('common.transportation')}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex flex-col justify-center h-full'>
                    <h1 className='text-[2rem] font-bold leading-normal text-white'>
                        {t('transportation.banner_title')}
                    </h1>

                    <p className='max-w-screen-sm text-lg leading-7 tracking-wide text-white'>
                        {t('transportation.banner_text')}
                    </p>
                </div>
            </div>

            <img
                className='object-cover w-full h-96'
                src='/banners/transportation.png'
                alt='Transportation'
            />

            <div className='container pt-12 space-y-6 pb-28'>
                <div className='space-y-4'>
                    <h2 className='text-[2rem] font-semibold text-gray-900'>
                        {t('common.transportation')}
                    </h2>
                    <p className='max-w-screen-md text-gray-600 text-balance'>
                        {t('common.contact_soon')}
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='grid gap-6 sm:grid-cols-2'
                    >
                        <FormField
                            control={form.control}
                            name='from'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.from_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t(
                                                'form.placeholder_location',
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='to'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.to_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t(
                                                'form.placeholder_location',
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='phoneNumber'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.number_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t(
                                                'form.placeholder_number',
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='carType'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.car_type_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <CustomSelect
                                            onChange={field.onChange}
                                            value={carType}
                                            defaultValue={field.value}
                                            placeholder={t(
                                                'form.car_type_label',
                                            )}
                                            options={
                                                carTypes != null
                                                    ? carTypes.map(
                                                          (car) =>
                                                              car.vehicleName,
                                                      )
                                                    : []
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='time'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.time_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    type='button'
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-full rounded-xs border-light-gray',
                                                        !field.value &&
                                                            'text-muted-foreground',
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(
                                                            field.value,
                                                            'PPP',
                                                        )
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
                                                <Tabs defaultValue='date'>
                                                    <TabsList className='border-0 rounded-t-lg'>
                                                        <TabsTrigger
                                                            value='date'
                                                            className='w-full rounded-tl-lg text-sm font-medium uppercase text-[#020202] data-[state=active]:bg-primary-red data-[state=active]:text-white'
                                                        >
                                                            Calendar
                                                        </TabsTrigger>
                                                        <TabsTrigger
                                                            value='time'
                                                            className='w-full rounded-tr-lg text-sm font-medium uppercase text-[#020202] data-[state=active]:bg-primary-red data-[state=active]:text-white'
                                                        >
                                                            Time
                                                        </TabsTrigger>
                                                    </TabsList>

                                                    <TabsContent
                                                        value='date'
                                                        className='p-0 m-0'
                                                    >
                                                        <div className='flex flex-col bg-primary-red px-3.5 py-2 font-bold text-white'>
                                                            <span className='opacity-60'>
                                                                {field.value.getFullYear()}
                                                            </span>
                                                            <span>
                                                                {format(
                                                                    field.value,
                                                                    'EEE, MMMM d',
                                                                )}
                                                            </span>
                                                        </div>
                                                        <Calendar
                                                            mode='single'
                                                            selected={
                                                                field.value
                                                            }
                                                            onSelect={
                                                                field.onChange
                                                            }
                                                            disabled={(date) =>
                                                                date <
                                                                subDays(
                                                                    new Date(),
                                                                    1,
                                                                )
                                                            }
                                                            initialFocus
                                                        />
                                                    </TabsContent>
                                                    <TabsContent
                                                        value='time'
                                                        className='p-0 m-0'
                                                    >
                                                        <div className='flex flex-col bg-primary-red px-3.5 py-2 font-medium text-white'>
                                                            <span className='text-2xl text-center'>
                                                                {format(
                                                                    field.value,
                                                                    'HH:mm',
                                                                )}
                                                            </span>
                                                        </div>

                                                        <div className='flex items-center justify-center h-full px-12 py-12'>
                                                            <div className='flex items-center justify-center gap-2 p-4 space-x-4'>
                                                                <TimeUnit
                                                                    items={
                                                                        hours
                                                                    }
                                                                    initialIndex={
                                                                        (new Date().getHours() %
                                                                            12) -
                                                                        1
                                                                    }
                                                                    onChange={(
                                                                        value,
                                                                    ) => {
                                                                        const newTime =
                                                                            new Date(
                                                                                time.getFullYear(),
                                                                                time.getMonth(),
                                                                                time.getDate(),
                                                                                parseInt(
                                                                                    value,
                                                                                ),
                                                                                time.getMinutes(),
                                                                            )
                                                                        field.onChange(
                                                                            newTime,
                                                                        )
                                                                    }}
                                                                />
                                                                <span>:</span>
                                                                <TimeUnit
                                                                    items={
                                                                        minutes
                                                                    }
                                                                    initialIndex={new Date().getMinutes()}
                                                                    onChange={(
                                                                        value,
                                                                    ) => {
                                                                        const newTime =
                                                                            new Date(
                                                                                time.getFullYear(),
                                                                                time.getMonth(),
                                                                                time.getDate(),
                                                                                time.getHours(),
                                                                                parseInt(
                                                                                    value,
                                                                                ),
                                                                            )
                                                                        field.onChange(
                                                                            newTime,
                                                                        )
                                                                    }}
                                                                />
                                                                <TimeUnit
                                                                    items={ampm}
                                                                    initialIndex={
                                                                        new Date().getHours() >=
                                                                        12
                                                                            ? 1
                                                                            : 0
                                                                    }
                                                                    onChange={(
                                                                        value,
                                                                    ) => {
                                                                        const newTime =
                                                                            new Date(
                                                                                time.getFullYear(),
                                                                                time.getMonth(),
                                                                                time.getDate(),
                                                                                (time.getHours() %
                                                                                    12) +
                                                                                    (value ===
                                                                                    'PM'
                                                                                        ? 12
                                                                                        : 0),
                                                                                time.getMinutes(),
                                                                            )
                                                                        field.onChange(
                                                                            newTime,
                                                                        )
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </TabsContent>
                                                </Tabs>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='numberOfAdults'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.number_of_adults_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t('form.number_label')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='numberOfKids'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.number_of_kids_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t('form.number_label')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='numberOfJuniors'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.number_of_juniors_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t('form.number_label')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <ButtonLoading
                            type='submit'
                            className='px-8 mt-3 rounded-sm h-14 w-fit bg-primary-orange'
                            isLoading={isPending}
                        >
                            <span className='text-base font-bold uppercase tracking-[0.012em] text-white'>
                                {t('form.submit_button_text')}
                            </span>
                        </ButtonLoading>
                    </form>
                </Form>
            </div>
        </main>
    )
}

const TimeUnit = ({
    items,
    initialIndex = 0,
    onChange,
}: {
    items: string[]
    initialIndex?: number
    onChange?: (value: string) => void
}) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    const handlePrevious = () => {
        setCurrentIndex((prev) => {
            const newIndex = (prev - 1 + items.length) % items.length
            onChange?.(items[newIndex])
            return newIndex
        })
    }

    const handleNext = () => {
        setCurrentIndex((prev) => {
            const newIndex = (prev + 1) % items.length
            onChange?.(items[newIndex])
            return newIndex
        })
    }

    const getDisplayItems = () => {
        if (items.length === 2) {
            return items
        }
        const prev = (currentIndex - 1 + items.length) % items.length
        const next = (currentIndex + 1) % items.length
        return [items[prev], items[currentIndex], items[next]]
    }

    return (
        <div
            className={cn(
                'flex flex-col items-center',
                items.length === 2 && 'justify-center',
            )}
        >
            {items.length > 2 && (
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={handlePrevious}
                    className='p-0'
                >
                    <ChevronUp className='w-4 h-4' />
                </Button>
            )}
            <div
                className={cn(
                    'flex h-24 flex-col items-center overflow-hidden',
                    items.length === 2 && 'justify-center',
                )}
            >
                {getDisplayItems().map((item, index) => (
                    <Button
                        key={index}
                        className={cn(
                            `flex h-8 items-center justify-center text-lg transition-all duration-200 ease-in-out`,
                            items.indexOf(item) === currentIndex
                                ? 'font-semibold text-primary'
                                : 'text-muted-foreground',
                        )}
                        size={'icon'}
                        variant={'ghost'}
                        onClick={() => {
                            setCurrentIndex(items.indexOf(item))
                            onChange?.(item)
                        }}
                    >
                        {item}
                    </Button>
                ))}
            </div>
            {items.length > 2 && (
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={handleNext}
                    className='p-0'
                >
                    <ChevronDown className='w-4 h-4' />
                </Button>
            )}
        </div>
    )
}

// export default function Component() {
//     const [selectedTime, setSelectedTime] = useState({
//         hour: '07',
//         minute: '55',
//         ampm: 'AM',
//     })

//     const hours = Array.from(
//         { length: 12 },
//         (_, i) => `${(i + 1).toString().padStart(2, '0')}`,
//     )
//     const minutes = Array.from({ length: 60 }, (_, i) =>
//         i.toString().padStart(2, '0'),
//     )
//     const ampm = ['AM', 'PM']

//     return (
//         <div className='flex justify-center p-4 space-x-4'>
//             <TimeUnit
//                 items={hours}
//                 initialIndex={6}
//                 onChange={(value) =>
//                     setSelectedTime((prev) => ({ ...prev, hour: value }))
//                 }
//             />
//             <TimeUnit
//                 items={minutes}
//                 initialIndex={54}
//                 onChange={(value) =>
//                     setSelectedTime((prev) => ({ ...prev, minute: value }))
//                 }
//             />
//             <TimeUnit
//                 items={ampm}
//                 initialIndex={0}
//                 onChange={(value) =>
//                     setSelectedTime((prev) => ({ ...prev, ampm: value }))
//                 }
//             />
//         </div>
//     )
// }
