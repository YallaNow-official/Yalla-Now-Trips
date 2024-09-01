import { Icons } from '@/components/icons'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'

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
import { bookingSchema, type BookingSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Nationality, TripDetailsType } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { NotFound } from './not-found'
import { formatPrice, handleValidationError } from '@/lib/utils'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { useUser } from '@/components/providers/user-provider'
import { ButtonLoading } from '@/components/ui/button-loading'
import { useTranslation } from 'react-i18next'
import { CustomSelect } from '@/components/custom-select'

export const BookingCheckout = () => {
    const { id } = useParams<{ id: string }>()
    const { t, i18n } = useTranslation()
    const [params] = useSearchParams()
    const type = params.get('type') ?? 'trip'
    const { user } = useUser()
    const navigate = useNavigate()
    const { data: trip, isLoading } = useQuery<TripDetailsType>({
        queryKey: ['trip', id],
        queryFn: async () => {
            if (type === 'trip')
                return (
                    await api.get('/api/Trip/GetByID', {
                        params: {
                            id,
                        },
                    })
                ).data

            return (await api.get(`/api/Package/${id}`)).data
        },
        enabled: id != null,
    })

    const form = useForm<BookingSchema>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            location: '',
            email: user?.email ?? '',
            name: user == null ? '' : `${user.firstName} ${user.lastName}`,
            nationality: '',
            phoneNumber: user?.phoneNumber ?? '',
            numberOfAdults: 0,
            numberOfKids: 0,
            numberOfJuniors: 0,
        },
    })

    const nationality = form.watch('nationality')

    const { data: nationalities } = useQuery<Nationality[]>({
        queryKey: ['nationalities'],
        queryFn: async () => {
            return (await api.get('/api/Nationalities')).data
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: BookingSchema) => {
            return api.post('/api/Booking/TripBooking', {
                ...data,
                number: data.phoneNumber,
                tripId: trip?.id,
                packageId: trip?.id,
                subTotal: trip?.price,
                discount: 0,
            })
        },
        onSuccess: () => {
            form.reset()
            toast.success(t('success.booking'))
            navigate('/', {
                replace: true,
            })
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
                    case 404:
                        toast.error(t('error.trip_not_found'))
                        break
                    default:
                        toast.error(t('error.error_occurred'))
                }
            } else {
                toast.error(t('error.error_occurred'))
            }
        },
    })

    const onSubmit = (data: BookingSchema) => mutate(data)

    if (id == null) {
        return <NotFound />
    }

    if (trip == null && !isLoading) return <NotFound />

    return (
        <main className='container pt-3 pb-24' dir={i18n.dir()}>
            <Breadcrumb className='pb-8'>
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
                                to='/trips'
                                className='text-sm font-normal text-primary-black'
                            >
                                {t('common.trips')}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='space-y-8'>
                <h1 className='font-semibold text-28 text-primary-black'>
                    {t('booking.title')}
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid items-start gap-14 sm:grid-cols-2 lg:grid-cols-3'>
                            <div className='lg:col-span-2'>
                                <div className='grid gap-6 lg:grid-cols-2'>
                                    <FormField
                                        control={form.control}
                                        name='name'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-gray-900'>
                                                    {t('form.name_label')}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className='rounded-xs border-light-gray'
                                                        placeholder={t(
                                                            'form.placeholder_name',
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
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-gray-900'>
                                                    {t('form.email_label')}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='email'
                                                        className='rounded-xs border-light-gray'
                                                        placeholder={t(
                                                            'form.placeholder_email',
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
                                        name='nationality'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-gray-900'>
                                                    {t(
                                                        'form.nationality_label',
                                                    )}
                                                </FormLabel>
                                                <FormControl>
                                                    <CustomSelect
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        value={nationality}
                                                        defaultValue={
                                                            field.value
                                                        }
                                                        placeholder={t(
                                                            'form.placeholder_nationality',
                                                        )}
                                                        options={
                                                            nationalities?.map(
                                                                (n) => n.name,
                                                            ) ?? []
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name='location'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-gray-900'>
                                                    {t(
                                                        'form.placeholder_location',
                                                    )}
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
                                        name='numberOfAdults'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-gray-900'>
                                                    {t(
                                                        'form.number_of_adults_label',
                                                    )}
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
                                        name='numberOfKids'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-gray-900'>
                                                    {t(
                                                        'form.number_of_kids_label',
                                                    )}
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
                                        name='numberOfJuniors'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-gray-900'>
                                                    {t(
                                                        'form.number_of_juniors_label',
                                                    )}
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
                                </div>
                            </div>

                            <div className='p-6 border rounded-sm border-light-gray'>
                                <h2 className='pb-5 text-lg font-medium text-primary-black'>
                                    {t('booking.summary')}
                                </h2>

                                <div className='flex flex-col gap-3'>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-gray-600'>
                                            {t('booking.sub_total')}
                                        </span>
                                        <span className='font-medium text-primary-black'>
                                            {formatPrice(trip?.price ?? 0)}
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between text-sm'>
                                        <span className='text-gray-600'>
                                            {t('booking.discount')}
                                        </span>
                                        <span className='font-medium text-primary-black'>
                                            {formatPrice(0)}
                                        </span>
                                    </div>
                                </div>

                                <Separator className='my-4' />

                                <div className='flex items-center justify-between pb-6 text-base'>
                                    <span className='text-primary-black'>
                                        {t('booking.total')}
                                    </span>
                                    <span className='font-semibold leading-6 text-primary-black'>
                                        {formatPrice(trip?.price ?? 0)}
                                    </span>
                                </div>

                                <ButtonLoading
                                    className='w-full h-auto'
                                    variant={'primary'}
                                    isLoading={isPending}
                                >
                                    <span className='font-bold uppercase leading-[3.5rem] tracking-[0.012em] text-white'>
                                        {t('booking.book')}
                                    </span>
                                </ButtonLoading>
                            </div>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    )
}
