import { PropTypes } from 'prop-types'

const Layout = ({ children }) => {

    return (
        <div className="min-h-screen">
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