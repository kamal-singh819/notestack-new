// applied on admin panel
const accessMiddleware = (permissions) => {
    return (req, res, next) => {
        try {
            if (permissions.includes(req.user.role)) next();
            else return res.status(401).send({ statusCode: 401, message: "UNAUTHORIZED" });
        } catch (error) {
            next(error);
        }
    }
}

export default accessMiddleware;