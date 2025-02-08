
function sortArrayByKey(arr, key, order = 'asc') {
    if (!Array.isArray(arr) || arr.length === 0) {
        return []
    }

    // Determine if the key is numeric or date to handle sorting accordingly
    const isNumericKey = typeof arr[0][key] === 'number'
    const isDateKey =
        !isNumericKey &&
        new Date(arr[0][key]) !== 'Invalid Date' &&
        !isNaN(new Date(arr[0][key]))

    return arr.sort((a, b) => {
        let comparison = 0

        if (isNumericKey) {
            comparison = a[key] - b[key]
        } else if (isDateKey) {
            comparison = new Date(a[key]) - new Date(b[key])
        } else {
            if (a[key] < b[key]) comparison = -1
            if (a[key] > b[key]) comparison = 1
        }

        return order === 'desc' ? -comparison : comparison
    })
}


const filterProducts = (products, filters) => {
    console.log({ filters })
    const { limit = 10, page = 1, sortOrder, sortBy } = filters
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const category = filters.categories ? filters.categories?.split(",")[0] : null

    let filtered = products.filter((product) => {
        const matchesName = !filters.name || product.name.toLowerCase().includes(filters.name.toLowerCase());
        const matchesCategory =
            !category || product.categories.some((c) => c._id == category);
        const matchesMinPrice = !filters.minPrice || product.price >= Number(filters.minPrice);
        const matchesMaxPrice = !filters.maxPrice || product.price <= Number(filters.maxPrice);
        const matchesColor = !filters.colors || product.colors?.join(",").toLowerCase() === filters.colors.toLowerCase();
        return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice && matchesColor;
    });

    // Sorting
    if (sortBy && sortOrder) {
        console.log({ sortBy, sortOrder })
        if (sortOrder === 'desc') {
            filtered = sortArrayByKey(filtered, sortBy, 'desc')
        } else {
            filtered = sortArrayByKey(filtered, sortBy, 'asc')
        }
    }

    console.log({
        count: filtered.length,
        page: page,
        products: filtered.slice(startIndex, endIndex),
        totalPages: filtered.length / limit + 1
    })

    // findcategories(filtered)
    return {
        count: filtered.length,
        page: page,
        products: filtered.slice(startIndex, endIndex),
        totalPages: filtered.length / limit + 1
    }



};


const findcategories = (products) => {

    const categories = Array.from(
        new Set(products.flatMap((product) => product.categories.map((c) =>
        ({
            _id: c._id,
            name: c.name
        })
        )))
    );

    const uniqueCategories = [];
    const seenIds = new Set();

    categories.forEach((category) => {
        if (!seenIds.has(category._id.toString())) {
            seenIds.add(category._id.toString());
            uniqueCategories.push(category);
        }
    });

    console.log(uniqueCategories)
    return uniqueCategories;
}

export default filterProducts