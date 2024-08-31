import { Routes, Route } from 'react-router-dom'
import { RootLayout } from './layout/root-layout'
import { Home } from './pages/home'
import { SignIn } from './pages/sign-in'
import { SignUp } from './pages/sign-up'
import { AuthLayout } from './layout/auth-layout'
import { ContactUs } from './pages/contact-us'
import { Hotels } from './pages/hotels'
import { Airplane } from './pages/airplane'
import { Transportation } from './pages/transportation'
import { AboutUs } from './pages/about-us'
import { Offers } from './pages/offers'
import { Trips } from './pages/trips'
import { Tours } from './pages/tours'
import { NotFound } from './pages/not-found'
import { TourDetails } from './pages/tour-details'
import { TripDetails } from './pages/trip-details'
import { TripPlanner } from './pages/trip-planner'
import { BookingCheckout } from './pages/booking-checkout'
import { AuthNotRequired } from './components/auth-redirects/auth-not-required'
import { AuthRequired } from './components/auth-redirects/auth-required'
import { Search } from './pages/search'

function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route element={<AuthNotRequired />}>
                    <Route element={<AuthLayout />}>
                        <Route path='/sign-in' element={<SignIn />} />
                        <Route path='/sign-up' element={<SignUp />} />
                    </Route>
                </Route>
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/offers' element={<Offers />} />
                <Route path='/tours' element={<Tours />} />
                <Route path='/trips' element={<Trips />} />
                <Route path='/tour/:id' element={<TourDetails />} />
                <Route path='/trip/:id' element={<TripDetails />} />
                <Route path='/trip-planner' element={<TripPlanner />} />
                <Route path='/hotels' element={<Hotels />} />
                <Route path='/transportation' element={<Transportation />} />
                <Route path='/airplane' element={<Airplane />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route element={<AuthRequired />}>
                    <Route path='/booking/:id' element={<BookingCheckout />} />
                </Route>

                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App
