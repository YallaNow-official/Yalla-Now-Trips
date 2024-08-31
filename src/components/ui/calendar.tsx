import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(
                'shadow-calendar rounded-b-lg rounded-t-none bg-white',
                className,
            )}
            classNames={{
                months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                month: 'space-y-4',
                caption:
                    'flex justify-center py-2 relative items-center bg-[#F4F4F4] px-4',
                caption_label: 'text-primary-red font-bold',
                nav: 'space-x-1 flex items-center',
                nav_button: cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                ),
                nav_button_previous:
                    'absolute left-1 border-none text-primary-red opacity-100',
                nav_button_next:
                    'absolute right-1 border-none text-primary-red opacity-100',
                table: 'w-full border-collapse space-y-1',
                head_row: 'flex',
                head_cell:
                    'text-secondary-orange rounded-md w-9 font-normal text-[0.9375rem]',
                row: 'flex w-full mt-2',
                cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                day: cn(
                    buttonVariants({ variant: 'ghost' }),
                    'h-auto rounded-[1px] px-[5px] py-0.5 font-normal aria-selected:opacity-100',
                ),
                day_range_end: 'day-range-end',
                day_selected:
                    'bg-[#BDBDBD] text-[#020202] hover:bg-[#BDBDBD] focus:bg-[#BDBDBD]',
                day_outside:
                    'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                day_disabled: 'text-muted-foreground opacity-50',
                day_range_middle:
                    'aria-selected:bg-accent aria-selected:text-accent-foreground',
                day_hidden: 'invisible',
                tbody: 'px-4 pb-4 block',
                head: 'px-4 pt-4 block',
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => (
                    <ChevronLeft className='h-4 w-4' {...props} />
                ),
                IconRight: ({ ...props }) => (
                    <ChevronRight className='h-4 w-4' {...props} />
                ),
            }}
            {...props}
        />
    )
}
Calendar.displayName = 'Calendar'

export { Calendar }
