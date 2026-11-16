const { getCategories, getCategoryById, deleteCategory, addCategory } = require("../controllers/categories");
const { Router } = require("express");
const { validateParamId } = require("../middlewares/validators/global");
const { validateCategoryCreate } = require("../middlewares/validators/categories");

const router = Router();



router.route("/")
.get(getCategories)
.post(validateCategoryCreate, addCategory);

router.route("/:id")
.get(validateParamId, getCategoryById)
.delete(validateParamId, deleteCategory);


module.exports = router;