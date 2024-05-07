import categoryModel from '../models/categoryModel.js';

const getAllCategoriesController = async (req, res, next) => {
    try {
        const allCategories = await categoryModel.find({});
        return res.send({ statusCode: 200, message: "FETCHED", data: allCategories });
    } catch (error) {
        next(error);
    }
}

const addCategoryController = async (req, res, next) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) return res.send({ statusCode: 400, message: "MISSING" });
        const alreadyExist = await categoryModel.find({ categoryName });
        if (alreadyExist.length) return res.send({ statusCode: 400, message: "EXISTS" });
        const category = new categoryModel({ categoryName, adminId: req.user.id });
        await category.save();
        return res.send({ statusCode: 200, message: "ADDED", data: category });
    } catch (error) {
        next(error);
    }
}

export { getAllCategoriesController, addCategoryController };