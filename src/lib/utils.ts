import { isAxiosError } from 'axios'
import { type ClassValue, clsx } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'EGP',
    })
}

export function handleValidationError(error: unknown) {
    if (isAxiosError(error))
        Object.entries(error.response?.data.errors).forEach(([, value]) => {
            if (Array.isArray(value))
                value.forEach((message: string) => {
                    toast.error(message)
                })
        })
}
