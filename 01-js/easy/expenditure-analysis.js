/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  // const obj = {};

  // transactions.forEach((transaction) => {
  //   const { category, price } = transaction;

  //   if (obj.hasOwnProperty(category)) {
  //     obj[category] += price;
  //   } else {
  //     obj[category] = price;
  //   }
  // });

  // const result = Object.keys(obj).map((obj) => {
  //   return { category, totalSpent: obj[category] };
  // });
  // return result;
  // }

  const categoryObj = {};

  transactions.forEach((transaction) => {
    const { category, price } = transaction;

    if (categoryObj.hasOwnProperty(category)) {
      categoryObj[category] += price;
    } else {
      categoryObj[category] = price;
    }
  });

  const result = Object.keys(categoryObj).map((category) => {
    return { category, totalSpent: categoryObj[category] };
  });
  return result;
}

module.exports = calculateTotalSpentByCategory;
