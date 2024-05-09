// applied on admin panel
const isAdminMiddleware = (req, res, next) => {
    if (!req.user) return res.status(401).send({ statusCode: 401, message: "UNAUTHORIZED" });
    //check if user's role is admin
    if (req.user.isAdmin) next();
    else return res.status(403).json({ message: 'Forbidden: Access restricted to admins only' });
}

export default isAdminMiddleware;