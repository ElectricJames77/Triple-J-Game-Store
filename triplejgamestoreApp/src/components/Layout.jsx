import { PropTypes } from 'prop-types'
import NavBar from './NavBar'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
    const location = useLocation()
    const path = location.pathname
    const notHome = path !== '/';

    return (
        <div className="min-h-screen">
            {notHome && <NavBar/>}
            <div className='container mx-auto mt-10'>
                {children}
            </div>
        </div>
    )
}
Layout.propTypes = {
    children: PropTypes.node
}
export default Layout