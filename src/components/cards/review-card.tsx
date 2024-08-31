import { User } from 'lucide-react'
import { Icons } from '../icons'
import { cn } from '@/lib/utils'

type ReviewCardProps = {
    img?: string
    name: string
    review: string
    rating: number
}

export const ReviewCard = ({ img, name, review, rating }: ReviewCardProps) => {
    return (
        <div className='flex items-start gap-10'>
            <div>
                {img != null ? (
                    <img
                        src={img}
                        alt={name}
                        className='size-16 rounded-full'
                    />
                ) : (
                    <div className='flex size-16 items-center justify-center rounded-full border'>
                        <User size={32} />
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='text-18 font-semibold text-primary-black'>
                    {name}
                </h3>
                <div className='flex items-center gap-1'>
                    {new Array(5).fill(0).map((_, i) => (
                        <Icons.Star
                            key={i}
                            className={cn(
                                i < Math.round(rating)
                                    ? 'fill-[#141718]'
                                    : 'fill-none stroke-[#6C7275]',
                            )}
                        />
                    ))}
                </div>
                <p className='text-16 text-primary-black'>{review}</p>
            </div>
        </div>
    )
}
