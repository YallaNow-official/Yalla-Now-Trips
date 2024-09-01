import { CustomSelect } from '@/components/custom-select'
import { Button } from '@/components/ui/button'
import { ButtonLoading } from '@/components/ui/button-loading'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { api } from '@/lib/api'
import { registerSchema, type RegisterSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGoogleLogin } from '@react-oauth/google'
import { isAxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const SignUp = () => {
    const { t, i18n } = useTranslation()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const navigate = useNavigate()
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            username: '',
        },
    })

    const register = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                await api.post('/api/Google/GoogleSignUp', {
                    externalAuthDto: {
                        provider: 'Google',
                        idToken: tokenResponse.access_token,
                    },
                    gender: 'male',
                    phoneNumber: 'phone',
                    password: 'password',
                })
                toast.success(t('success.register'))
                navigate('/sign-in')
            } catch (error) {
                if (isAxiosError(error)) {
                    switch (error.status) {
                        case 400:
                            toast.error(
                                error.response?.data ||
                                    t('error.something_wrong'),
                            )
                            break
                        case 500:
                            toast.error(t('error.internal_server_error'))
                            break
                    }

                    return
                }

                toast.error(t('error.unexpected_error'))
            }
        },
        onError: (error) => {
            toast.error(error.error_description || t('error.something_wrong'))
        },
    })

    const onSubmit = async (data: RegisterSchema) => {
        try {
            await api.post('/api/Auth/RegisterNewUser', data)

            toast.success(t('success.register'))
            navigate('/sign-in')
        } catch (error) {
            if (isAxiosError(error)) {
                const { response } = error
                if (response?.data) {
                    if (typeof response.data === 'string') {
                        return response.data
                            .split(',')
                            .filter((error: string) => error !== '')
                            .map((error: string) => toast.error(error))
                    }

                    return toast.error(
                        'Something went wrong, please check your inputs',
                    )
                }

                return toast.error(error.message)
            }

            if (error instanceof Error) {
                return toast.error(error.message)
            }

            return toast.error(t('error.unexpected_error'))
        }
    }

    return (
        <div className='flex flex-col gap-6 px-8 pb-8 pt-6' dir={i18n.dir()}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'
                >
                    <FormField
                        control={form.control}
                        name='firstName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-normal text-gray-900'>
                                    {t('auth.first_name')}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='rounded-xs border-light-gray'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='lastName'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-normal text-gray-900'>
                                    {t('auth.last_name')}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='rounded-xs border-light-gray'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='username'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-normal text-gray-900'>
                                    {t('auth.username')}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='rounded-xs border-light-gray'
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
                                <FormLabel className='text-sm font-normal text-gray-900'>
                                    {t('auth.email')}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type='email'
                                        className='rounded-xs border-light-gray'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-normal text-gray-900'>
                                    {t('auth.password')}
                                </FormLabel>

                                <FormControl>
                                    <div className='relative'>
                                        <Input
                                            type={
                                                isPasswordVisible
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            className='rounded-xs border-light-gray'
                                            {...field}
                                        />
                                        <button
                                            type='button'
                                            className='absolute right-4 top-1/2 -translate-y-1/2'
                                            onClick={() =>
                                                setIsPasswordVisible(
                                                    (prev) => !prev,
                                                )
                                            }
                                        >
                                            {isPasswordVisible ? (
                                                <EyeOff />
                                            ) : (
                                                <Eye />
                                            )}
                                        </button>
                                    </div>
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
                                <FormLabel className='text-sm font-normal text-gray-900'>
                                    {t('auth.phone_number')}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className='rounded-xs border-light-gray'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-sm font-normal text-gray-900'>
                                    {t('auth.gender')}
                                </FormLabel>
                                <FormControl>
                                    <CustomSelect
                                        defaultValue={field.value}
                                        onChange={(value) => {
                                            field.onChange(value)
                                        }}
                                        options={['Male', 'Female']}
                                        placeholder={t('auth.gender')}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <ButtonLoading
                        type='submit'
                        className='w-full rounded-xs'
                        variant={'primary'}
                        isLoading={form.formState.isSubmitting}
                    >
                        <span className='text-sm font-bold uppercase text-white'>
                            {t('auth.sign_up')}
                        </span>
                    </ButtonLoading>
                </form>
            </Form>

            <div className='flex flex-col gap-3'>
                <div className='relative'>
                    <Separator className='bg-light-gray' />
                    <span className='absolute -top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500'>
                        or
                    </span>
                </div>

                <Button
                    className='relative h-auto w-full rounded-xs border-light-gray py-3'
                    variant={'outline'}
                    onClick={() => register()}
                >
                    <img src='Google.svg' className='absolute left-4' />
                    <span className='text-sm font-normal text-gray-700'>
                        {t('auth.google_signup')}
                    </span>
                </Button>
            </div>
        </div>
    )
}
