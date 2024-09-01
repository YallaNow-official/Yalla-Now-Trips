import { Button } from '@/components/ui/button'
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
import { loginSchema, type LoginSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { api } from '@/lib/api'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import { ButtonLoading } from '@/components/ui/button-loading'
import { useTranslation } from 'react-i18next'
import { useGoogleLogin } from '@react-oauth/google'
import { cn } from '@/lib/utils'

export const SignIn = () => {
    const { t, i18n } = useTranslation()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await api.post('/api/Google/ExternalLogin', {
                    provider: 'Google',
                    idToken: tokenResponse.access_token,
                })
                const { token } = res.data
                localStorage.setItem('token', token)
                window.location.reload()
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

    const onSubmit = async (data: LoginSchema) => {
        try {
            const res = await api.post('/api/Auth/token', {
                email: data.email,
                password: data.password,
            })

            toast.success(t('success.login'))
            const { token } = res.data
            localStorage.setItem('token', token)
            window.location.reload()
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

                    return toast.error(t('error.something_wrong'))
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
                                <div className='flex items-center justify-between'>
                                    <FormLabel className='text-sm font-normal text-gray-900'>
                                        {t('auth.password')}
                                    </FormLabel>

                                    <Link
                                        to={'/forgot-password'}
                                        className='text-sm font-medium text-primary-red'
                                    >
                                        {t('auth.forgot_password')}
                                    </Link>
                                </div>
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
                                            className={cn(
                                                'absolute top-1/2 -translate-y-1/2',
                                                i18n.dir() === 'ltr'
                                                    ? 'right-4'
                                                    : 'left-4',
                                            )}
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

                    <ButtonLoading
                        type='submit'
                        className='w-full rounded-xs'
                        variant={'primary'}
                        isLoading={form.formState.isSubmitting}
                    >
                        <span className='text-sm font-bold uppercase text-white'>
                            {t('auth.sign_in')}
                        </span>
                    </ButtonLoading>
                </form>
            </Form>

            <div className='flex flex-col gap-3'>
                <div className='relative'>
                    <Separator className='bg-light-gray' />
                    <span className='absolute -top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500'>
                        {t('auth.or')}
                    </span>
                </div>

                <Button
                    className='relative h-auto w-full rounded-xs border-light-gray py-3'
                    variant={'outline'}
                    onClick={() => login()}
                >
                    <img src='Google.svg' className='absolute left-4' />
                    <span className='text-sm font-normal text-gray-700'>
                        {t('auth.google_login')}
                    </span>
                </Button>
            </div>
        </div>
    )
}
