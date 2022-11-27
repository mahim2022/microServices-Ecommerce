var orderTotal = (products) => {
	var total = 0;
	products.forEach((cur) => {
		total += cur.price;
	});
	return total;
};

module.exports = { orderTotal };
