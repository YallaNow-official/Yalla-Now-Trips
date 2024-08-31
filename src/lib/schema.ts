import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    firstName: z.string().min(1, {
        message: 'First name is required',
    }),
    lastName: z.string().min(1, {
        message: 'Last name is required',
    }),
    username: z.string().min(1, {
        message: 'Username is required',
    }),
    phoneNumber: z.string().min(1, {
        message: 'Phone number is required',
    }),
    gender: z.enum(['Male', 'Female']),
    email: z.string().email(),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const contactSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    city: z.string(),
    message: z.string(),
})

export type ContactSchema = z.infer<typeof contactSchema>

export const hotelSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    city: z.string(),
    area: z.string(),
    nationality: z.string(),
    numberOfAdults: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfKids: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfJuniors: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
})

export type HotelSchema = z.infer<typeof hotelSchema>

export const airplaneSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    from: z.string(),
    to: z.string(),
    nationality: z.string(),
    numberOfAdults: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfKids: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfJuniors: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),

    type: z.string(),
})

export type AirplaneSchema = z.infer<typeof airplaneSchema>

export const transportationSchema = z.object({
    phoneNumber: z.string(),
    from: z.string(),
    to: z.string(),
    carType: z.string(),
    time: z.date(),
    numberOfAdults: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfKids: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfJuniors: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
})

export type TransportationSchema = z.infer<typeof transportationSchema>

export const bookingSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    email: z.string().email(),
    location: z.string(),
    nationality: z.string(),
    numberOfAdults: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfKids: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfJuniors: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
})

export type BookingSchema = z.infer<typeof bookingSchema>

export const tripPlannerSchema = z.object({
    name: z.string(),
    phoneNumber: z.string(),
    country: z.string(),
    city: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    budget: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseFloat(v) : v)),
    numberOfAdults: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfKids: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    numberOfJuniors: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseInt(v) : v)),
    activityPreferences: z.array(z.string()),
    preferredCategories: z.array(z.string()),
})

export type TripPlannerSchema = z.infer<typeof tripPlannerSchema>

export const reviewSchema = z.object({
    rating: z
        .number()
        .or(z.string())
        .transform((v) => (typeof v === 'string' ? parseFloat(v) : v))
        .refine((v) => v >= 1 && v <= 5, {
            message: 'Rating must be between 1 and 5',
        }),
    review: z.string().min(1),
})

export type ReviewSchema = z.infer<typeof reviewSchema>
