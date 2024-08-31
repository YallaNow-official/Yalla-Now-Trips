import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { usePagination } from '@mantine/hooks'
import { buttonVariants } from '../ui/button'

type PaginationWrapperProps = {
    total: number
    initialPage: number
    className?: string
}

export const PaginationWrapper = ({
    initialPage,
    total,
    className,
}: PaginationWrapperProps) => {
    const pagination = usePagination({ total, initialPage })

    if (total <= 1) return <div className={'pt-16'} />

    return (
        <Pagination className={className}>
            <PaginationContent>
                <PaginationItem className='pr-6'>
                    <PaginationPrevious
                        to={`?page=${pagination.active - 1}`}
                        onClick={() =>
                            pagination.setPage(pagination.active - 1)
                        }
                        tabIndex={pagination.active === 1 ? -1 : 0}
                        className={buttonVariants({
                            size: 'icon',
                            className: cn(
                                'flex items-center justify-center rounded-full p-0 text-dark-brown hover:bg-dark-brown hover:text-white',
                                pagination.active === 1 &&
                                    'pointer-events-none text-[#BCBCBC]',
                            ),
                            variant: 'ghost',
                        })}
                    />
                </PaginationItem>
                {pagination.range.map((page) => (
                    <PaginationItem>
                        {page === 'dots' ? (
                            <PaginationEllipsis />
                        ) : (
                            <PaginationLink
                                to={`?page=${page}`}
                                onClick={() => pagination.setPage(page)}
                                isActive={pagination.active === page}
                                size={'icon'}
                                className={cn(
                                    'flex items-center justify-center rounded-full border border-dark-brown text-xl font-semibold hover:bg-dark-brown hover:text-white',
                                    pagination.active === page
                                        ? 'bg-dark-brown text-white'
                                        : 'text-dark-brown',
                                )}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                <PaginationItem className='pl-6'>
                    <PaginationNext
                        to={`?page=${pagination.active + 1}`}
                        onClick={() =>
                            pagination.setPage(pagination.active + 1)
                        }
                        tabIndex={pagination.active === total ? -1 : 0}
                        className={buttonVariants({
                            size: 'icon',
                            className: cn(
                                'flex items-center justify-center rounded-full p-0 text-dark-brown hover:bg-dark-brown hover:text-white',
                                pagination.active === total &&
                                    'pointer-events-none text-[#BCBCBC]',
                            ),
                            variant: 'ghost',
                        })}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
