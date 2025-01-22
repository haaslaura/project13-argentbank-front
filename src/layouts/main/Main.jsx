import './main.css'
import { Outlet } from 'react-router'
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