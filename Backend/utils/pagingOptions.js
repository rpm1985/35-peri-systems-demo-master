const pagingOptions = (page, pageSize) => {
    return {
        skip: (page - 1) * pageSize,
        limit: pageSize * 1
    }
}

const calcMaxPages = (mongooseObject, query, pageSize) => {
     mongooseObject.countDocuments((query, count) => {
        return Math.ceil(count / pageSize)
    })
}



const getMaxPages = async (mongooseObject, query, pageSize) => {
    return calcMaxPages(mongooseObject, query, pageSize);
}


module.exports = {
    pagingOptions,
    getMaxPages
}