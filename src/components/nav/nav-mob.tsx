import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NAV_LINKS } from '@/lib/constants'
import { NavItem } from './nav-item'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { useTranslation } from 'react-i18next'

export const NavMob = () => {
    const { i18n } = useTranslation()
    const [open, setOpen] = useState(false)
    const matches = useMediaQuery('(min-width: 1280px)')

    useEffect(() => {
        if (matches && open) {
            setOpen(false)
        }
    }, [matches, open])

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button size={'icon'} variant={'outline'}>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent
                dir={i18n.dir()}
                side={i18n.dir() === 'rtl' ? 'right' : 'left'}
            >
                <ScrollArea className='h-full'>
                    <ul className='container flex w-full flex-col items-center justify-center gap-6'>
                        {NAV_LINKS[i18n.language as 'en' | 'ar'].map((link) => (
                            <NavItem
                                key={link.href}
                                {...link}
                                onClick={() => setOpen(false)}
                            />
                        ))}
                    </ul>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
