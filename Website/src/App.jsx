import { useEffect, useState } from 'react'
import { getSession } from './helpers/session'
import { Post } from './helpers/fetcher'
import { ROLE } from './helpers/permissions'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Home from './pages/Home'
import InicioPage from './pages/InicioPage'
import ThemeToggle from './components/theme/ThemeToggle'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const toastConfig = {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    toastStyle: {
        background: 'linear-gradient(90deg,#1e8e3e 0%, #35b36b 50%, #3182ce 100%)',
        color: 'white',
        borderRadius: '12px',
        fontWeight: '600',
        boxShadow: '0 8px 20px rgba(0,0,0,.18)',
    },
}

export default function App()
{
    const [session, setSession] = useState(() => getSession())
    const [authView, setAuthView] = useState('login')
    const [toastType, setToastType] = useState(null)
    const [theme, setTheme] = useState(() => {
        const savedTheme = window.localStorage.getItem('servicredith-theme')
        if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme
        return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        document.documentElement.style.colorScheme = theme
        window.localStorage.setItem('servicredith-theme', theme)
        const themeColor = theme === 'dark' ? '#07110d' : '#1a7a3c'
        document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor)
    }, [theme])

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark')
    }

    const handleLogin = () => {
        setSession(getSession())
        setToastType('login')
    }

    const handleRegister = () => {
        setSession(getSession())
        setToastType('register')
    }

    const handleLogout = async () => {
        await Post('/api/users/logout')
        setSession(null)
        setAuthView('login')
    }

    if (!session) {
        return (
            <>
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
                {authView === 'register'
                    ? <RegisterPage onRegister={handleRegister} onLogin={() => setAuthView('login')} />
                    : <LoginPage onLogin={handleLogin} onRegister={() => setAuthView('register')} />
                }
                <ToastContainer {...toastConfig} />
            </>
        )
    }

    const isEmployee = (session?.role || ROLE.EMPLOYEE) === ROLE.EMPLOYEE

    return (
        <>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            {isEmployee ? (
                <InicioPage
                    session={session}
                    onLogout={handleLogout}
                />
            ) : (
                <Home
                    session={session}
                    onLogout={handleLogout}
                    toastType={toastType}
                    onToastShown={() => setToastType(null)}
                />
            )}
            <ToastContainer {...toastConfig} />
        </>
    )
}
