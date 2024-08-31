import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from '@/components/ui/select'
import { useTranslation } from 'react-i18next'

export const Langdropdown = () => {
    const { i18n } = useTranslation()
    return (
        <Select
            defaultValue={i18n.language}
            onValueChange={(value) => {
                i18n.changeLanguage(value)
                window.location.reload()
            }}
        >
            <SelectTrigger className='w-16'>
                <SelectValue placeholder='Select language' />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value='en'>EN</SelectItem>
                    <SelectItem value='ar'>AR</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
