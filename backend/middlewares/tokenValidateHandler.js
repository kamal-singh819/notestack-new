import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenValidateHandler = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
                if (err) return res.status(401).send({ statusCode: 401, message: " UNAUTHORIZED" });
                //else token is decoded, so store it into req.user
                req.user = decoded.user;
                next();
            });
        }
        else res.send({ statusCode: 400, message: "TOKEN MISSING" });
    } catch (error) {
        next(error);
    }
}

export default tokenValidateHandler;