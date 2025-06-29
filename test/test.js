const groupVariants = (variants) => {
    const grouped = {};

    variants.forEach(({ color, size, quantity }) => {
        if (!grouped[color]) {
            grouped[color] = { color, size: [], quantity };
        }
        grouped[color].size.push(size);
    });

    return Object.values(grouped);
};

// Example Usage:
const input = [
    { "color": "Red", "size": "M", "quantity": 10 },
    { "color": "Blue", "size": "L", "quantity": 5 },
    { "color": "Red", "size": "L", "quantity": 8 }
];

console.log(groupVariants(input));
