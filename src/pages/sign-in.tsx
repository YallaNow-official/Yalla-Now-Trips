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

    const onSubmit = async (data: LoginSchema) => {
        try {
            const res = await api.post('/api/Auth/token', {
                email: data.email,
                password: data.password,
            })

            toast.success('Login successful')
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

                    return toast.error(
                        'Something went wrong, please check your inputs',
                    )
                }

                return toast.error(error.message)
            }

            if (error instanceof Error) {
                return toast.error(error.message)
            }

            return toast.error('An unexpected error occurred')
        }
    }

    return (
        <div className='flex flex-col gap-6 px-8 pt-6 pb-8' dir={i18n.dir()}>
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
                                            className='absolute -translate-y-1/2 right-4 top-1/2'
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
                        <span className='text-sm font-bold text-white uppercase'>
                            {t('auth.sign_in')}
                        </span>
                    </ButtonLoading>
                </form>
            </Form>

            <div className='flex flex-col gap-3'>
                <div className='relative'>
                    <Separator className='bg-light-gray' />
                    <span className='absolute px-2 text-sm text-gray-500 -translate-x-1/2 -translate-y-1/2 bg-white -top-2/3 left-1/2'>
                        {t('auth.or')}
                    </span>
                </div>

                <Button
                    className='w-full h-auto py-3 rounded-xs border-light-gray'
                    variant={'outline'}
                >
                    <span className='text-sm font-normal text-gray-700'>
                        {t('auth.google_login')}
                    </span>
                </Button>
            </div>
        </div>
    )
}
