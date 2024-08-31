import { cn } from '@/lib/utils'
import { Link, useLocation, type LinkProps } from 'react-router-dom'

type NavItemProps = {
    href: string
    title: string
    className?: string
} & Partial<LinkProps>

export const NavItem = ({ href, title, className, ...props }: NavItemProps) => {
    const pathname = useLocation().pathname

    return (
        <li>
            <Link
                {...props}
                to={href}
                className={cn(
                    'font-medium tracking-[0.02em] text-primary-black duration-200 hover:text-primary-red',
                    pathname === href && 'text-primary-red',
                    className,
                )}
            >
                {title}
            </Link>
        </li>
    )
}
