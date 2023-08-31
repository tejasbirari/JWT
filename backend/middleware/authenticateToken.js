require('dotenv').config();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    const refreshToken = req.cookies;

    console.log(refreshToken);

    if (!authorizationHeader) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

    const [bearer, accessToken] = authorizationHeader.split(' ');

    if (bearer !== 'Bearer' || !accessToken) {
        return res.status(401).json({ message: 'Access denied. Invalid token format.' });
    }

    try {
        // if token is not expired 
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Access denied. Invalid token.' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        // if token is expired, generate new token using refreshToken
        if(!refreshToken){
            return res.status(401).json({ message: 'Access denied. Token missing.' });
        }
        console.log(error);
    }

    
};

module.exports = { authenticateToken };
