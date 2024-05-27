import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import admin from '../services/firebaseAdmin.js';

const tokenValidateHandler = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
                if (err) {
                    admin.auth().verifyIdToken(token)
                        .then((decodedToken) => {
                            req.user = decodedToken;
                            next();
                        })
                        .catch(firebaseError => {
                            console.log(firebaseError)
                            return res.status(401).send({ statusCode: 401, message: "UNAUTHORIZED" });
                        })
                }
                else {
                    //else token is decoded, so store it into req.user
                    req.user = decoded.user;
                    next();
                }

            });
        }
        else res.status(400).send({ statusCode: 400, message: "TOKEN MISSING" });
    } catch (error) {
        next(error);
    }
}

export default tokenValidateHandler;