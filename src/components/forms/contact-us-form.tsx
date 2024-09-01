import { CONTACT_INFO, SOCIAL_LINKS } from '@/lib/constants'
import { Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { contactSchema, type ContactSchema } from '@/lib/schema'
import { Textarea } from '@/components/ui/textarea'
import { useTranslation } from 'react-i18next'
import { cn, handleValidationError } from '@/lib/utils'
import { useUser } from '../providers/user-provider'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import { ButtonLoading } from '../ui/button-loading'

export const ContactUsForm = () => {
    const { t, i18n } = useTranslation()
    const { user } = useUser()
    const form = useForm<ContactSchema>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            city: '',
            email: user?.email || '',
            message: '',
            name: user != null ? `${user.firstName} ${user.lastName}` : '',
            phoneNumber: user?.phoneNumber || '',
        },
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (data: ContactSchema) => {
            return api.post('/api/Booking/ContactUs', {
                ...data,
                userId: user?.id ?? '',
            })
        },
        onSuccess: () => {
            form.reset()
            toast.success(t('success.contact'))
        },
        onError: (err) => {
            if (isAxiosError(err)) {
                switch (err.status) {
                    case 400:
                        handleValidationError(err)
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

    const onSubmit = (data: ContactSchema) => mutate(data)

    return (
        <div
            className='container flex flex-col py-28 max-md:gap-y-10 md:flex-row lg:gap-16'
            dir={i18n.dir()}
        >
            <div className='w-full max-w-sm space-y-3'>
                <div
                    className={cn(
                        'border-primary-red px-2',
                        i18n.dir() === 'rtl' ? 'border-r-4' : 'border-l-4',
                    )}
                >
                    <span className='text-sm text-primary-black'>
                        {t('contact.contact_label')}
                    </span>
                </div>

                <div className='space-y-11'>
                    <h2
                        className={cn(
                            'text-4xl font-semibold text-primary-black md:whitespace-nowrap',
                            i18n.dir() === 'rtl' ? 'pl-10' : 'pr-10',
                        )}
                    >
                        {t('contact.get_in_touch')}
                    </h2>

                    <div className='space-y-5'>
                        {[...CONTACT_INFO[i18n.language as 'en' | 'ar']]
                            .reverse()
                            .map((info) => {
                                const Icon = info.icons[1]
                                return (
                                    <div
                                        key={info.href}
                                        className='flex items-center gap-3.5'
                                    >
                                        <Icon />
                                        <div className='flex flex-col text-sm text-primary-black'>
                                            <span className='font-medium'>
                                                {info.title}
                                            </span>
                                            <Link to={info.href}>
                                                {info.value}
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>

                    <div className='flex items-center gap-8'>
                        {SOCIAL_LINKS.map((link) => (
                            <Link to={link.href} key={link.title}>
                                <span className='sr-only'>{link.title}</span>
                                {<link.icon />}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='grid w-full gap-x-7 gap-y-8 lg:grid-cols-2'
                >
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        className='h-[3.75rem] rounded-lg border-[#4E5683] text-xl text-primary-black placeholder-primary-black'
                                        placeholder={t(
                                            'contact.your_name_placeholder',
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
                                <FormControl>
                                    <Input
                                        type='email'
                                        className='h-[3.75rem] rounded-lg border-[#4E5683] text-xl text-primary-black placeholder-primary-black'
                                        placeholder={t(
                                            'contact.email_placeholder',
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
                                <FormControl>
                                    <Input
                                        className='h-[3.75rem] rounded-lg border-[#4E5683] text-xl text-primary-black placeholder-primary-black'
                                        placeholder={t(
                                            'contact.phone_placeholder',
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
                                <FormControl>
                                    <Input
                                        className='h-[3.75rem] rounded-lg border-[#4E5683] text-xl text-primary-black placeholder-primary-black'
                                        placeholder={t(
                                            'contact.city_placeholder',
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
                        name='message'
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2'>
                                <FormControl>
                                    <Textarea
                                        className='min-h-40 rounded-lg border-[#4E5683] text-xl text-primary-black placeholder-primary-black'
                                        placeholder={t(
                                            'contact.message_placeholder',
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
                        variant={'primary'}
                        className='px-8 py-4 rounded-sm h-fit w-fit'
                        isLoading={isPending}
                    >
                        <span className='text-base font-semibold text-white'>
                            {t('contact.submit_button')}
                        </span>
                    </ButtonLoading>
                </form>
            </Form>
        </div>
    )
}
