import { useEffect, useState } from "react"

const AuthHook = () => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {

        if (!token) {
            setLoading(false);
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            setLoading(false);
        }

    }, []);

    return {isLoggedIn};
}

export default AuthHook;