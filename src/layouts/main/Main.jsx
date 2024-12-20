import { Outlet } from 'react-router'
import './main.css'
import { useSelector } from 'react-redux'

const Main = () => {

    const isDark = useSelector((state) => state.theme.isDark)

    return (
        <main className={isDark ? 'bg-dark' : ''}>
            <Outlet />
        </main>
    )
}

export default Main