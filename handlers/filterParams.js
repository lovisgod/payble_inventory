const filterParams = (params) => {
    const filters = {};
    // loop through each key-value pair in params
    // and add it to filters if the value is defined, not null, and not an empty string
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && value !== '') {
            filters[key] = value;
        }
    }
    return filters;
}


module.exports = {
    filterParams
}