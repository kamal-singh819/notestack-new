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
        return res.send({ statusCode: 200, message: "ADDED" });
    } catch (error) {
        next(error);
    }
}

const updateCategoryController = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { categoryName } = req.body;
        if (!categoryName || !id) return res.send({ statusCode: 400, message: "MISSING" });
        const alreadyExist = await categoryModel.find({ categoryName });
        if (alreadyExist.length) return res.send({ statusCode: 400, message: "EXISTS" });
        await categoryModel.findByIdAndUpdate(id, { categoryName });
        return res.send({ statusCode: 200, message: "UPDATED" });
    } catch (error) {
        next(error);
    }
}

const deleteCategoryController = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id) return res.send({ statusCode: 400, message: "MISSING" });
        await categoryModel.findByIdAndDelete(id);
        return res.send({ statusCode: 200, message: "DELETED" });
    } catch (error) {
        next(error);
    }
}

export { getAllCategoriesController, addCategoryController, updateCategoryController, deleteCategoryController };