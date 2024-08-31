import { Link } from 'react-router-dom'

type FooterLinkProps = {
    href: string
    title: string
}

export const FooterLink = ({ href, title }: FooterLinkProps) => {
    return (
        <Link to={href} className='font-medium tracking-[0.02em] text-white'>
            {title}
        </Link>
    )
}
