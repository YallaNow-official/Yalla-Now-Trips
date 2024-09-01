import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { UserProvider } from './components/providers/user-provider.tsx'
import './lib/i18n.ts'
import { ScrollToTop } from './components/scroll-to-top.tsx'

const Main = () => {
    const queryClient = new QueryClient()

    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <ScrollToTop />
                    <UserProvider>
                        <App />
                        <Toaster />
                    </UserProvider>
                </Router>
            </QueryClientProvider>
        </StrictMode>
    )
}

createRoot(document.getElementById('root')!).render(<Main />)
