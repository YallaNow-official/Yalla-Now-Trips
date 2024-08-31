import { Footer } from '@/components/footer/footer'
import { NavBar } from '@/components/nav/nav-bar'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}
