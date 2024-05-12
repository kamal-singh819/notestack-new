import articlesModel from "../models/articlesModel.js";

const publishArticle = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) return res.send({ statusCode: 400, message: "MISSING" });
        const newArticle = new articlesModel({ title, content, adminId: req.user.id });
        await newArticle.save();
        return res.send({ statusCode: 200, message: "CREATED" });
    } catch (error) {
        next(error);
    }
}

const getAllArticlesTitle = async (req, res, next) => {
    try {
        const articles = await articlesModel.find({}, { _id: 1, title: 1 });
        return res.send({ statusCode: 200, data: articles, message: 'FETCHED' });
    } catch (error) {
        next(error);
    }
}

const getSingleArticle = async (req, res, next) => {
    try {
        const { articleId } = req.query;
        const article = await articlesModel.findOne({ _id: articleId });
        return res.send({ statusCode: 200, data: article, message: "FETCHED" });
    } catch (error) {
        next(error);
    }
}

export { publishArticle, getAllArticlesTitle, getSingleArticle };