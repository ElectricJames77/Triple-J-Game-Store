const jwt = require('jsonwebtoken');

function authenticationAuthorization(...roles) {
    return (req, res, next) => {
        const authHeader = req.header("Authorization");
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) return res.status(401).json({message: "Authentication failed"});
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({message: "Token is not valid"});
            if (!roles.includes(user.role)) return res.status(403).json({message: "You are not authorized"});
            req.user = user;
            next();
        });
    };
}

module.exports = {authenticationAuthorization};