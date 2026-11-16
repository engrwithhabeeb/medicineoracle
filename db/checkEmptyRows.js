function checkEmptyRows({rows, table, id}) {
    if(!Array.isArray(rows) || !rows) {
        const err = new Error("Invalid rows data structure provided to checkEmptyRows.");   
        throw err;
    }

    if(id === undefined || id === null || id === "")  {
        const err = new Error("An identification value must be supplied to checkEmptyRows.");
        throw err;
    }
    if(!table || typeof table !== "string") {
        const err = new Error("A database table name of string type must be provided to checkEmptyRows");
        throw err;
    }

    if(rows.length === 0) {
        const error = new Error(`Resource from ${table} with ID: ${id}, does not exist.`);
        error.code = "ROW_NOT_FOUND";
        throw error;
    }
}

module.exports = checkEmptyRows;