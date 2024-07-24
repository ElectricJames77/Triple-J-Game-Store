import { PropTypes } from 'prop-types'
import NavBar from './NavBar'

const Layout = ({ children }) => {

    return (
        <div className="min-h-screen">
            <NavBar/>
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