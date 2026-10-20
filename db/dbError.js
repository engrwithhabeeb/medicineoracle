const DB_ERROR_REGISTRY = {
    "23505": {
        status: 409,
        type: "DuplicateEntryError",
        message: (err) => `A record with this unique identifier already exists in the '${err.table}' system.`
    },

    "23503": {
        status: 400,
        type: "DependencyViolationError",
        message: (err) => `Cannot modify or remove this item because active entries in another table depend on this '${err.table}' record.`
    },

    "22P02": {
        status: 400,
        type: "InvalidFormatError",
        message: (err) => `The data type format provided is incompatible with the columns defined in the '${err.table}' schema.`
    },

    "ECONNREFUSED": {
        status: 503,
        type: "DatabaseOfflineError",
        message: () => "The central database server is temporarily unreachable. Please try again shortly."
    }
};

module.exports = DB_ERROR_REGISTRY;