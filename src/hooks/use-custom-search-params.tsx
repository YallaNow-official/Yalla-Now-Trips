import { useSearchParams } from 'react-router-dom'

export const useCustomSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = isNaN(Number(searchParams.get('page')))
        ? 1
        : Number(searchParams.get('page'))
    const location = searchParams.get('location') ?? undefined
    const minRating = isNaN(Number(searchParams.get('minRating')))
        ? undefined
        : Number(searchParams.get('minRating'))
    const maxRating = isNaN(Number(searchParams.get('maxRating')))
        ? undefined
        : Number(searchParams.get('maxRating'))
    const minPrice = isNaN(Number(searchParams.get('minPrice')))
        ? undefined
        : Number(searchParams.get('minPrice'))
    const maxPrice = isNaN(Number(searchParams.get('maxPrice')))
        ? undefined
        : Number(searchParams.get('maxPrice'))
    const activity = searchParams.get('activities') ?? undefined
    const bookingType = searchParams.get('bookingType') ?? undefined
    const categories = searchParams.get('categories')?.split(',')

    return {
        page: page === 0 ? 1 : page,
        location,
        minRating: minRating === 0 ? undefined : minRating,
        maxRating: maxRating === 0 ? undefined : maxRating,
        minPrice: minPrice === 0 ? undefined : minPrice,
        maxPrice: maxPrice === 0 ? undefined : maxPrice,
        activity,
        bookingType,
        categories,
        setSearchParams,
        searchParams,
    }
}
