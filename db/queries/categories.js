const pool = require("../pool");
const checkEmptyRows = require("../checkEmptyRows");

async function fetchCategories() {
    const query = `SELECT * FROM categories;`;

    const { rows } = await pool.query(query);

    return rows;
}

async function fetchCategoryById(id) {
    const query = `SELECT * FROM categories WHERE id = $1;`;

    const { rows } = await pool.query(query, [id]);

    checkEmptyRows({rows, id, table: "categories"});

    return rows[0];
}

async function insertCategory(name) {
    const query = `INSERT INTO categories (name) VALUES ($1);`;

    await pool.query(query, [name]);
}

async function removeCategory(id) {
    const query = `DELETE FROM categories WHERE id = $1;`;

    await pool.query(query, [id]);
}


module.exports = { fetchCategories, fetchCategoryById, insertCategory, removeCategory };