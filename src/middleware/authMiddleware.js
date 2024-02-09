const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorizationMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized - token not provided',
                token
            });
        }

        token = token.split(" ");

        if (token.length > 1) {
            token = token[1];
        } else token = token[0];
            
        jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthorized - token wrong'
                });
            }

            req.user = decoded;
            const userRole = req.user ? req.user.role : 'guest';

            if (allowedRoles.includes(userRole)) {
                next();
            } else {
                res.status(401).json({ message: 'forbidden' });
            }
        });
    }
}

module.exports = authorizationMiddleware;
