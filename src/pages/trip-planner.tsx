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
import { tripPlannerSchema, type TripPlannerSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useTranslation } from 'react-i18next'
import { cn, handleValidationError } from '@/lib/utils'
import { ButtonLoading } from '@/components/ui/button-loading'
import { format, subDays } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useUser } from '@/components/providers/user-provider'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { CustomSelect } from '@/components/custom-select'
import { City, FilterValue } from '@/types'
import { differenceInDays } from 'date-fns'

const ActivityPreferences = [
    'Beaches',
    'Food',
    'Museums',
    'Sports',
    'Night life',
    'Outdoor activities',
    'Shopping',
    'Relaxation',
    'Family activities',
]

export const TripPlanner = () => {
    const { t, i18n } = useTranslation()
    const { user } = useUser()
    const [otherActivity, setOtherActivity] = useState<string | null>(null)
    const form = useForm<TripPlannerSchema>({
        resolver: zodResolver(tripPlannerSchema),
        defaultValues: {
            city: '',
            startDate: new Date(),
            endDate: new Date(),
            country: '',
            name: user != null ? `${user.firstName} ${user.lastName}` : '',
            phoneNumber: user?.phoneNumber ?? '',
            activityPreferences: [],
            preferredCategories: [],
            budget: 0,
            numberOfAdults: 0,
            numberOfKids: 0,
            numberOfJuniors: 0,
        },
    })

    const city = form.watch('city')

    const { mutate, isPending } = useMutation({
        mutationFn: (data: TripPlannerSchema) => {
            return api.post('/api/Customizations', {
                ...data,
                selectedPreferences: [
                    ...data.activityPreferences,
                    ...(otherActivity != null ? [otherActivity] : []),
                ],
                number: data.phoneNumber,
                userId: user?.id ?? '',
                area: data.country,
                nationality: '',
                durationInDays: differenceInDays(data.endDate, data.startDate),
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
                    case 404:
                        toast.error(
                            err.response?.data ?? t('error.something_wrong'),
                        )
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

    const { data: cities } = useQuery<City[]>({
        queryKey: ['cities'],
        queryFn: async () => {
            return (await api.get('/api/Location')).data
        },
    })

    const { data: preferredCategories } = useQuery<FilterValue>({
        queryKey: ['filter-values'],
        queryFn: async () => {
            return (await api.get('/api/Trip/SearchExamples')).data
        },
    })

    const onSubmit = (data: TripPlannerSchema) => mutate(data)

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
                                {t('trip_planner.title')}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='flex flex-col justify-center h-full'>
                    <h1 className='text-[2rem] font-bold leading-normal text-white'>
                        {t('trip_planner.title')}
                    </h1>

                    <p className='max-w-screen-sm text-lg leading-7 tracking-wide text-white'>
                        {t('trip_planner.banner_text')}
                    </p>
                </div>
            </div>

            <img
                className='object-cover w-full h-96'
                src='/banners/trip-planner.png'
                alt='Hotels'
            />

            <div className='container pt-12 space-y-6 pb-28'>
                <div className='space-y-4'>
                    <h2 className='text-[2rem] font-semibold text-gray-900'>
                        {t('trip_planner.title')}
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
                            name='country'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.country_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t(
                                                'form.placeholder_country',
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
                                    <FormControl>
                                        <CustomSelect
                                            onChange={field.onChange}
                                            value={city}
                                            defaultValue={field.value}
                                            placeholder={t(
                                                'form.placeholder_city',
                                            )}
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='startDate'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.start_date_label')}
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
                                                <div className='flex flex-col rounded-t-lg bg-primary-red px-3.5 py-2 font-bold text-white'>
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
                                                    className=''
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date <
                                                        subDays(new Date(), 1)
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='endDate'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.end_date_label')}
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
                                                <div className='flex flex-col rounded-t-lg bg-primary-red px-3.5 py-2 font-bold text-white'>
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
                                                    className=''
                                                    mode='single'
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date <
                                                        subDays(new Date(), 1)
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='budget'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.budget_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className='rounded-xs border-light-gray'
                                            placeholder={t(
                                                'form.placeholder_budget',
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
                            name='activityPreferences'
                            render={({ field }) => (
                                <FormItem className='sm:col-span-2'>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.activity_preferences_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <>
                                            <ToggleGroup
                                                type='multiple'
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                className={cn(
                                                    'flex-wrap justify-start gap-4',
                                                    i18n.dir() === 'rtl' &&
                                                        'justify-end',
                                                )}
                                            >
                                                {ActivityPreferences.map(
                                                    (activity) => (
                                                        <ToggleGroupItem
                                                            key={activity}
                                                            value={activity}
                                                            className={cn(
                                                                'h-fit w-fit rounded-xs bg-[#F2F4F5] px-2.5 py-1 text-xs font-medium text-[#141718] hover:bg-[#60D669] hover:text-white data-[state=on]:bg-[#60D669] data-[state=on]:text-white',
                                                            )}
                                                            aria-label={
                                                                activity
                                                            }
                                                        >
                                                            {activity}
                                                        </ToggleGroupItem>
                                                    ),
                                                )}
                                            </ToggleGroup>
                                            <Input
                                                className='rounded-xs border-light-gray'
                                                placeholder={t(
                                                    'form.placeholder_other',
                                                )}
                                                value={
                                                    otherActivity ?? undefined
                                                }
                                                onChange={(e) =>
                                                    setOtherActivity(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='preferredCategories'
                            render={({ field }) => (
                                <FormItem className='sm:col-span-2'>
                                    <FormLabel className='text-sm font-medium text-gray-900'>
                                        {t('form.preferred_categories_label')}
                                    </FormLabel>
                                    <FormControl>
                                        <ToggleGroup
                                            type='multiple'
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            className={cn(
                                                'flex-wrap justify-start gap-4',
                                                i18n.dir() === 'rtl' &&
                                                    'justify-end',
                                            )}
                                        >
                                            {preferredCategories?.tripCategories.map(
                                                (category) => (
                                                    <ToggleGroupItem
                                                        key={category}
                                                        value={category}
                                                        className={cn(
                                                            'h-fit w-fit rounded-xs bg-[#F2F4F5] px-2.5 py-1 text-xs font-medium text-[#141718] hover:bg-[#60D669] hover:text-white data-[state=on]:bg-[#60D669] data-[state=on]:text-white',
                                                        )}
                                                        aria-label={category}
                                                    >
                                                        {category}
                                                    </ToggleGroupItem>
                                                ),
                                            )}
                                        </ToggleGroup>
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
