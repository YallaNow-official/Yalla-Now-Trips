import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FormControl } from './ui/form'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

type CustomSelectProps = {
    onChange: (value: string) => void
    value: string
    defaultValue: string
    options: string[]
    placeholder: string
    isForm?: boolean
    className?: string
}

export const CustomSelect = ({
    onChange,
    value,
    defaultValue,
    options,
    placeholder,
    className,
    isForm = true,
}: CustomSelectProps) => {
    const { i18n } = useTranslation()
    return (
        <Select
            onValueChange={onChange}
            defaultValue={defaultValue}
            dir={i18n.dir()}
        >
            {isForm ? (
                <FormControl>
                    <SelectTrigger
                        className={cn(
                            'rounded-xs border-light-gray',
                            value === ''
                                ? 'text-muted-foreground'
                                : 'text-inherit',
                            className,
                        )}
                    >
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                </FormControl>
            ) : (
                <SelectTrigger
                    className={cn(
                        'rounded-xs border-light-gray',
                        value === '' ? 'text-muted-foreground' : 'text-inherit',
                        className,
                    )}
                >
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
            )}
            <SelectContent>
                {options.map((option, i) => (
                    <SelectItem key={i} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
