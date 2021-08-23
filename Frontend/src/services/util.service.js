const looseIncludes = (elements, queries, search) => {
    return elements.filter(element => {
        const queriesExist = queries.every(query => {
            return element[query]
        })

        if (queriesExist) {
            return queries.some(
                query => element[query].trim().toLowerCase().includes(search.trim().toLowerCase()))
        } else {
            return false
        }
    })
}

module.exports = {
    looseIncludes
};