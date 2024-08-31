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
import { airplaneSchema, type AirplaneSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomSelect } from '@/components/custom-select'
import { useMutation, useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { useUser } from '@/components/providers/user-provider'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { handleValidationError } from '@/lib/utils'
import { ButtonLoading } from '@/components/ui/button-loading'
import { useTranslation } from 'react-i18next'
import { Nationality } from '@/types'

export const Airplane = () => {
    const { user } = useUser()
    const { t, i18n } = useTranslation()
    const form = useForm<AirplaneSchema>({
        resolver: zodResolver(airplaneSchema),
        defaultValues: {
            from: '',
            to: '',
            type: '',
            name: user != null ? `${user.firstName} ${user.lastName}` : '',
            nationality: '',
            phoneNumber: user != null ? user.phoneNumber : '',
            numberOfAdults: 0,
            numberOfKids: 0,
            numberOfJuniors: 0,
        },
    })
    const type = form.watch('type')
    const nationality = form.watch('nationality')

    const { mutate, isPending } = useMutation({
        mutationFn: (data: AirplaneSchema) => {
            return api.post('/api/Booking/AirPlanBooking', {
                ...data,
                number: data.phoneNumber,
                fromLocation: data.from,
                toLocation: data.to,
                userId: user?.id ?? '',
            })
        },
        onSuccess: () => {
            form.reset()
            toast.success('Your request has been submitted successfully')
        },
        onError: (err) => {
            if (isAxiosError(err)) {
                switch (err.status) {
                    case 400:
                        handleValidationError(err)
                        break
                    case 401:
                        toast.error('You need to login first')
                        break
                    default:
                        toast.error(
                            'Something went wrong, please try again later',
                        )
                        break
                }

                return
            }

            toast.error('Something went wrong, please try again later')
        },
    })

    const { data: nationalities } = useQuery<Nationality[]>({
        queryKey: ['nationalities'],
        queryFn: async () => {
            return (await api.get('/api/Nationalities')).data
        },
    })

    const onSubmit = (data: AirplaneSchema) => mutate(data)

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
                                {t('common.airplane')}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex flex-col justify-center h-full'>
                    <h1 className='text-[2rem] font-bold leading-normal text-white'>
                        {t('airplane.banner_title')}
                    </h1>

                    <p className='max-w-screen-sm text-lg leading-7 tracking-wide text-white'>
                        {t('airplane.banner_text')}
                    </p>
                </div>
            </div>

            <img
                className='object-cover w-full h-96'
                src='/banners/airplane.png'
                alt='Airplane'
            />

            <div className='container pt-12 space-y-6 pb-28'>
                <div className='space-y-4'>
                    <h2 className='text-[2rem] font-semibold text-gray-900'>
                        {t('common.airplane')}
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

                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.type_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <CustomSelect
                                            onChange={field.onChange}
                                            value={type}
                                            defaultValue={field.value}
                                            placeholder={'Round Trip'}
                                            options={['Round Trip', 'One-way']}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <ButtonLoading
                            type='submit'
                            className='px-8 mt-3 rounded-sm h-14 w-fit bg-primary-orange sm:col-span-2'
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
