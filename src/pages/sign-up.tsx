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
        <div className='flex flex-col gap-6 px-8 pt-6 pb-8' dir={i18n.dir()}>
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
                        <span className='text-sm font-bold text-white uppercase'>
                            {t('auth.sign_up')}
                        </span>
                    </ButtonLoading>
                </form>
            </Form>

            <div className='flex flex-col gap-3'>
                <div className='relative'>
                    <Separator className='bg-light-gray' />
                    <span className='absolute px-2 text-sm text-gray-500 -translate-x-1/2 -translate-y-1/2 bg-white -top-2/3 left-1/2'>
                        or
                    </span>
                </div>

                <Button
                    className='relative w-full h-auto py-3 rounded-xs border-light-gray'
                    variant={'outline'}
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
