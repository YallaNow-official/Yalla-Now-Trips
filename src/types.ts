export type Inspiration = {
    imageUrl: string
    tripCount: number
    locationName: string
}

export type TripOrTourHome = {
    id: string
    imageUrl: string
    location: string
    name: string
    price: number
}

export type User = {
    id: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    username: string
}

export type Trip = {
    id: string
    title: string
    destination: string
    price: number
    rating: number
    activities: string[]
    imageUrl: string
}

export type TripDetailsType = {
    id: string
    rating: number
    title: string
    description: string
    destination: string
    price: number
    duration: number
    category: string
    mainImageUrl: string
    imageUrls: string[]
    timeline: Timeline[]
    guides: Guide[]
    inclusions: string
    nonInclusions: string
    averageRating: number
    tripReviews: TripReview[]
}

export type Guide = {
    type: string
    content: string
}

export type Timeline = {
    day: number
    activities: Activities
}

export type Activities = {
    en: string[]
    ar: string[]
    fr: string[]
}

export type TripReview = {
    userName: string
    userRate: number
    comment: string
}
export type Tour = {
    id: string
    title: string
    description: string
    destination: string
    price: number
    mainImageUrl: string
    category: string
}

export interface TourDetailsType {
    id: string
    mainImageUrl: string
    imageUrls: string[]
    price: number
    destination: string
    title: string
    description: string
    category: string
    inclusions: string
    nonInclusions: string
    averageRating: null
    guides: string[]
    timeline: TourTimeline[]
    reviews: TripReview[]
}

export type TourTimeline = {
    date: Date
    title: string
    description: string
    location: string
    duration: number
}

export type CarType = {
    id: string
    vehicleModel: string
    vehicleName: string
    vehicleId: string
}

export type Offer = {
    id: number
    name: string
    imageUrl: string
    description: string
}

export type FilterValue = {
    locations: string[]
    ratings: Ratings
    prices: Prices
    tripCategories: string[]
    activities: string[]
    bookingTypes: string[]
    localizationKeys: string[]
}

export type Prices = {
    minPrice: number[]
    maxPrice: number[]
}

export type Ratings = {
    minRating: number[]
    maxRating: number[]
}

export type City = {
    id: string
    locationName: LocationName
    imageUrl: null
}

export type LocationName = {
    en: string
    ar: string
    fr: string
}

export type Nationality = {
    id: number
    name: string
}

export type PaginatedTours = {
    items: Tour[]
    pageNumber: number
    pageSize: number
    totalCount: number
    totalPages: number
}

export type PaginatedTrips = {
    items: (Omit<Trip, 'imageUrl'> & {
        mainImage: string
    })[]
    pageNumber: number
    pageSize: number
    totalCount: number
    totalPages: number
}

export type SearchType = {
    items: {
        id: string
        title: string
        mainImageUrl: string
        price: number
        destination: string
        duration: number
        rating: number
    }[]
    pageNumber: number
    pageSize: number
    totalCount: number
    totalPages: number
}
