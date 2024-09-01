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
import { hotelSchema, type HotelSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomSelect } from '@/components/custom-select'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useUser } from '@/components/providers/user-provider'
import { ButtonLoading } from '@/components/ui/button-loading'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { handleValidationError } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { City, Nationality } from '@/types'

export const Hotels = () => {
    const { t, i18n } = useTranslation()
    const { user } = useUser()
    const form = useForm<HotelSchema>({
        resolver: zodResolver(hotelSchema),
        defaultValues: {
            area: '',
            city: '',
            name: user != null ? `${user.firstName} ${user.lastName}` : '',
            nationality: '',
            phoneNumber: user?.phoneNumber ?? '',
            numberOfAdults: 0,
            numberOfKids: 0,
            numberOfJuniors: 0,
        },
    })
    const city = form.watch('city')
    const nationality = form.watch('nationality')

    const { mutate, isPending } = useMutation({
        mutationFn: (data: HotelSchema) => {
            return api.post('/api/Booking/HotelBooking', {
                ...data,
                userId: user?.id ?? '',
                number: data.phoneNumber,
            })
        },
        onSuccess: () => {
            form.reset()
            toast.success(t('success.hotel'))
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
                    default:
                        toast.error(t('error.something_wrong'))
                        break
                }

                return
            }

            toast.error(t('error.something_wrong'))
        },
    })

    const { data: nationalities } = useQuery<Nationality[]>({
        queryKey: ['nationalities'],
        queryFn: async () => {
            return (await api.get('/api/Nationalities')).data
        },
    })

    const { data: cities } = useQuery<City[]>({
        queryKey: ['cities'],
        queryFn: async () => {
            return (await api.get('/api/Location')).data
        },
    })

    const onSubmit = (data: HotelSchema) => mutate(data)

    return (
        <main className='relative' dir={i18n.dir()}>
            <div className='container absolute left-1/2 h-full max-h-96 -translate-x-1/2 pb-20 pt-4'>
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
                                {t('common.hotels')}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex h-full flex-col justify-center'>
                    <h1 className='text-[2rem] font-bold leading-normal text-white'>
                        {t('hotels.banner_title')}
                    </h1>

                    <p className='max-w-screen-sm text-lg leading-7 tracking-wide text-white'>
                        {t('hotels.banner_text')}
                    </p>
                </div>
            </div>

            <img
                className='h-96 w-full object-cover'
                src='/banners/hotel.png'
                alt='Hotels'
            />

            <div className='container space-y-6 pb-28 pt-12'>
                <div className='space-y-4'>
                    <h2 className='text-[2rem] font-semibold text-gray-900'>
                        {t('hotels.title')}
                    </h2>
                    <p className='max-w-screen-md text-balance text-gray-600'>
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
                            name='city'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.city_label')}
                                    </FormLabel>
                                    <CustomSelect
                                        onChange={field.onChange}
                                        value={city}
                                        defaultValue={field.value}
                                        placeholder={t('form.placeholder_city')}
                                        options={
                                            cities?.map(
                                                (c) =>
                                                    c.locationName[
                                                        i18n.language as
                                                            | 'ar'
                                                            | 'en'
                                                    ],
                                            ) ?? []
                                        }
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='area'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.area_name_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t(
                                                'form.placeholder_area_name',
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
                                        {t('form.nationality_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <CustomSelect
                                            onChange={field.onChange}
                                            value={nationality}
                                            defaultValue={field.value}
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
                            name='numberOfAdults'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.number_of_adults_label')}
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
                                        {t('form.number_of_kids_label')}
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
                                        {t('form.number_of_juniors_label')}
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
                        <ButtonLoading
                            type='submit'
                            className='mt-3 h-14 w-fit rounded-sm bg-primary-orange px-8'
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
