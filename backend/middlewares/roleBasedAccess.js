import usersModel from "../models/usersModel.js";
const accessMiddleware = (permissions) => {
    return async (req, res, next) => {
        try {
            const user = await usersModel.findById(req.user.id);
            if (permissions.includes(user.role)) next();
            else return res.status(401).send({ statusCode: 401, message: "UNAUTHORIZED" });
        } catch (error) {
            next(error);
        }
    }
}

export default accessMiddleware;