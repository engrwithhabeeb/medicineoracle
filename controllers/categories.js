const { fetchCategories, fetchCategoryById, insertCategory, removeCategory } = require("../db/queries/categories");

async function getCategories(req, res, next) {
    try {
        const categories = await fetchCategories();

        res.json(categories);
    } catch (error) {
        next(error);
    }
}

async function getCategoryById(req, res, next) {
    try {
        const { id } = req.params;

        const category = await fetchCategoryById(id);

        res.json(category);
    } catch (error) {
        next(error);
    }
}

async function addCategory(req, res, next) {
    try {
        const { name } = req.body;

        await insertCategory(name);
        res.status(302).redirect("/categories");
    } catch (error) {
        next(error);
    }
}

async function deleteCategory(req, res, next) {
    try {
        const { id } = req.params;

        await removeCategory(id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

module.exports = { getCategories, getCategoryById, addCategory, deleteCategory };