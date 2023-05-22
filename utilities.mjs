export function getRandomNumber(maxNumber) {
	return Math.floor(Math.random() * maxNumber);
}

export function getRandomGroceryItem() {
	const groceries = ['milk', 'coriander', 'cucumber', 'eggplant', 'egg', 'doughnut', 'ice cream', 'lettuce', 'yogurt', 'spinach', 'cauliflower', 'pork', 'hamburger', 'steak', 'apple', 'orange', 'pear', 'apricot', 'beans', 'spaghetti', 'pizza']
	return groceries[getRandomNumber(groceries.length - 1)]
}

export function getRadioValue() {
	var radioButtonGroup = document.getElementsByName('operationResult');

	for (i = 0; i < radioButtonGroup.length; i++) {
		if (radioButtonGroup[i].checked)
			return radioButtonGroup[i].value;
	}
}

export function isSuccess() {
	return getRadioValue() === 'SUCCEED';
}

export function getCurrentGroceryItemFromApi(callback, timeToComplete = 1000) {
	console.log(`getCurrentGroceryItemFromApi`)
	setTimeout(() => {
		const groceryItem = getRandomGroceryItem();
		callback(groceryItem)
	}, timeToComplete)
}

export function getDataFromApi(succeeds, callback, timeout) {
	if (succeeds) {
		getCurrentGroceryItemFromApi(callback, timeout);
	} else {
		throw Error('error occurred');
	}
}

export function updateGroceryCart(groceryItem) {
	const groceryCart = document.getElementById('groceryCart');
	groceryCart.innerText = groceryItem;

	behaviorSubject.next(groceryItem);
	subject.next(groceryItem)
}