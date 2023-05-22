const { Observable, fromEvent, timer, Subject, BehaviorSubject, merge, interval, EMPTY } = rxjs
const { map, switchMap, scan, takeWhile, takeUntil, startWith, repeat } = rxjs.operators;

//#region Callbacks

/*
	Callbacks

	A callback function is a function passed into another function as an argument,
	which is then invoked inside the outer function to complete some kind of routine or action.
*/


// Example: Callback

let executeCallbackExampleButton = document.getElementById('executeCallbackExample');

executeCallbackExampleButton.addEventListener('click', (event) => {
	checkStatusAndDoWork(callbackFunction);
});

function checkStatusAndDoWork(callback) {
	if (isSuccess()) {
		callback();
	} else {
		console.log('Error');
	}
}

function callbackFunction() {
	console.log(`callbackFunction Called`);
}



// Example: Callback Hell

let callbackHellButton = document.getElementById('callbackHell');

callbackHellButton.addEventListener('click', (event) => {
	getDataFromApiWithCallbacks(callback1, callback2);
});

function callback1(callback) {
	console.log(`In callback1`)
	callback('callback1 parameter');
}

function callback2(callback) {
	console.log(`In callback2`)
	doMoreWork(callback);
}

function doMoreWork(callback) {
	console.log(`In doMoreWork`)
	callback('doMoreWork parameter');
}

function getDataFromApiWithCallbacks(callback1, callback2) {
	getCurrentGroceryItemFromApi(
		(groceryItem) => {

			console.log(`Retrieved grocery item: ${groceryItem}`)
			updateGroceryCart(groceryItem);

			callback1(
				(anotherParameter) => {
					console.log(`callback1 called with ${anotherParameter}`)

					callback2(
						(yetAnotherParameter) => {
							console.log(`callback2 called with ${yetAnotherParameter}`)
						}
					)
				}
			)
		},
		100
	)
}


// Example: Parallel Work

let executeParallelWorkWithCallbacksButton = document.getElementById('executeParallelWorkWithCallbacks');

executeParallelWorkWithCallbacksButton.addEventListener('click', (event) => {
	let callback1 = (result) => { updateGroceryCart(result); console.log(`PARALLEL CALLBACK: callback1: ${result}`) };
	let callback2 = (result) => { updateGroceryCart(result); console.log(`PARALLEL CALLBACK: callback2: ${result}`) };
	let callback3 = (result) => { updateGroceryCart(result); console.log(`PARALLEL CALLBACK: callback3: ${result}`) };

	try {
		getDataFromApi(true, callback1, 1000);
		getDataFromApi(true, callback2, 500);
		getDataFromApi(true, callback3, 250);
	} catch (error) {
		console.log(`PARALLEL CALLBACK: `, error.message)
	} finally {
		console.log(`PARALLEL CALLBACK: In finally block that runs every time regardless of outcome`)
	}
});


// Callbacks used like promises
let executeCallbackLikePromisesButton = document.getElementById('executeCallbackLikePromises');

executeCallbackLikePromisesButton.addEventListener('click', (event) => {
	executeCallbackLikePromises(
		(successMessage) => {
			console.log(`PARALLEL CALLBACK: Success callback: ${successMessage}`);
		},
		(errorMessage) => {
			console.log(`PARALLEL CALLBACK: Error callback: ${errorMessage}`);
		},
		_ => {
			console.log(`PARALLEL CALLBACK: Finally callback`);
		}
	)
});

function executeCallbackLikePromises(success, error, finallyCallback) {
	const succeeded = isSuccess();
	if (succeeded) {
		success('We succeeded');
	} else {
		error('We failed');
	}
	finallyCallback();
}

//#endregion Callbacks


//#region promises
/*
	Basic Promises

	promise
		.then()
		.catch()
		.finally()

	The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

*/

let promise = new Promise((resolve, reject) => {
	let a = 1 + 1 + 1
	if (a == 2) {
		resolve('Success');
	} else {
		reject('Failed');
	}
});


// Execute Promise
promise
	.then((message) => {
		console.log(`in success then callback: ${message}`);
	})
	.catch((error) => {
		console.log(`in error catch callback  ${error}`)
	})
	.finally(_ => {
		console.log(`Finally runs every time regardless of outcome`)
	});

let result = await promise.then(
	(message) => {
		console.log(`in success then callback: ${message}`);
	},
	(error) => {
		console.log(`error`)
	});

/*
	Promises
*/
let doPromiseAwesomenessButton = document.getElementById('doPromiseAwesomeness');
doPromiseAwesomenessButton.addEventListener(
	'click',
	(event) => {
		doPromiseAwesomenessAsync(isSuccess())
			.then((message) => {
				console.log(`In then success: ${message}`);
				return doPromiseAwesomenessAsync();
			})
			.then((message) => {
				console.log(`In second chained then block: ${message}`);
			})
			.catch((error) => {
				console.log(`In catch error: ${error}`)
			})
			.finally(_ => {
				console.log(`In finally block that runs every time regardless of outcome`)
			})

		// try{
		// 	const result1 = await doPromiseAwesomenessAsync(isSuccess());
		// 	const result2 = await doPromiseAwesomenessAsync(isSuccess());
		// 	const result3 = await doPromiseAwesomenessAsync(isSuccess());
		// 	console.log(result1);
		// 	console.log(result2);
		// 	console.log(result3);
		// } catch(error) {
		// 	console.log(error);
		// } finally {
		// 	console.log(`In finally block that runs every time regardless of outcome`)
		// }
	}
);

async function doPromiseAwesomenessAsync(succeeded) {
	return new Promise((resolve, reject) => {
		if (succeeded) {
			resolve('Success');
			// resolve('Success1');
			// resolve('Success2');
			// resolve('Success3');
		} else {
			reject('Failed');
		}
	});
}



// How promises solve the callback issues
// Helps avoid Callback Hell in complex situations such as multiple chained asynchronous operations.


// How do we run promises in parallel?
// Enter promise.all
/*
	Promise.all([
		promise1,
		promise2,
		promise3
	])
*/

let doParallelWorkButton = document.getElementById('doParallelWork');
doParallelWorkButton.addEventListener(
	'click',
	async (event) => {
		const succeeded = isSuccess();
		Promise.all([
			requestOneAsync(succeeded),
			requestTwoAsync(succeeded),
			requestThreeAsync(succeeded)
		])
		.then((messages) => {
			console.log(`PARALLEL: In then success:`, messages);
		}).catch((errors) => {
			console.log(`PARALLEL: In catch error:`, errors)
		}).finally(_ => {
			console.log(`PARALLEL: In finally block that runs every time regardless of outcome`)
		})
	}
);

async function requestOneAsync(succeeded) {
	return new Promise((resolve, reject) => {
		console.log(`In requestOneAsync`)
		if (succeeded) {
			resolve('Request One Succeeded');
		} else {
			reject('Request One Failed');
		}
	});
}

async function requestTwoAsync(succeeded) {
	return new Promise((resolve, reject) => {
		console.log(`In requestTwoAsync`)
		if (succeeded) {
			resolve('Request Two Succeeded');
		} else {
			reject('Request Two Failed');
		}
	});
}

async function requestThreeAsync(succeeded) {
	return new Promise((resolve, reject) => {
		console.log(`In requestThreeAsync`)
		if (succeeded) {
			resolve('Request Three Succeeded');
		} else {
			reject('Request Three Failed');
		}
	});
}


//#endregion promises


//#region observables

/*
	RxJS - Observables


	TODO: Show how complete does not get called in the event of an error
*/
let subject = new Subject();
let behaviorSubject = new BehaviorSubject('Initial Value');
let observableFromBehaviorSubject$ = behaviorSubject.asObservable();
let observableFromSubject$ = subject.asObservable();

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const pauseButton = document.getElementById('pauseButton');
const startClick$ = fromEvent(startButton, 'click');
const stopClick$ = fromEvent(resetButton, 'click');
const pauseClick$ = fromEvent(pauseButton, 'click');
const startValue = 25;

merge(
	startClick$.pipe(map(() => true)),
	pauseClick$.pipe(map(() => false))
)
	.pipe(
		switchMap(val => (val ? interval(500) : EMPTY)),
		map(() => -1),
		scan((acc, curr) => acc + curr, startValue),
		takeWhile(val => val >= 0),
		map(() => getRandomGroceryItem()),
		startWith(getRandomGroceryItem()),
		takeUntil(stopClick$),
		repeat(),
	)
	.subscribe(groceryItem => {
		updateGroceryCart(groceryItem)
	});


const button = document.getElementById('executeObservableMagic');
const clickObservable$ = fromEvent(button, 'click');
// clickObservable$.subscribe(
//   (event) => {
// 	console.log(`event`)
//     const secondObservable = timer(1000);
//     secondObservable.subscribe(
//       (data) => console.log(data) // <- Back in callback hell?
//     );
//   }
// );

clickObservable$
	.pipe(
		map(event => getRandomGroceryItem())
	)
	.subscribe(groceryItem => updateGroceryCart(groceryItem))

clickObservable$.toPromise().then(() => {
	console.log(`clickObservable$ promise`)
});

// Multicasting
observableFromBehaviorSubject$
	.subscribe(groceryItem => console.log(`BehaviorSubject Observer 1: Grocery Cart Updated with item: ${groceryItem}`))

observableFromBehaviorSubject$
	.subscribe(groceryItem => console.log(`BehaviorSubject Observer 2: Grocery Cart Updated with item: ${groceryItem}`))

observableFromSubject$
	.subscribe(groceryItem => console.log(`Subject Observer 1: Grocery Cart Updated with item: ${groceryItem}`))

observableFromSubject$
	.subscribe(groceryItem => console.log(`Subject Observer 2: Grocery Cart Updated with item: ${groceryItem}`))

// class groceryCart {
// 	subject = new Subject();
// 	behaviorSubject = new BehaviorSubject();
// 	observable = this.behaviorSubject.asObservable();

// 	constructor() {}
// }

//  TODO: Show different ways to unsubscribe
//	TODO: Show how first and other pipeable operators may not unsubscribe if the conditions are not met
//  TODO: Show how to ensure we unsubscribe even if an operator does not meet conditions. A few different ways to do this.


//#endregion


//#region utilities
/*
	Utilities
*/
function getRandomNumber(maxNumber) {
	return Math.floor(Math.random() * maxNumber);
}

function getRandomGroceryItem() {
	const groceries = ['milk', 'coriander', 'cucumber', 'eggplant', 'egg', 'doughnut', 'ice cream', 'lettuce', 'yogurt', 'spinach', 'cauliflower', 'pork', 'hamburger', 'steak', 'apple', 'orange', 'pear', 'apricot', 'beans', 'spaghetti', 'pizza']
	return groceries[getRandomNumber(groceries.length - 1)]
}

function getRadioValue() {
	var radioButtonGroup = document.getElementsByName('operationResult');

	for (i = 0; i < radioButtonGroup.length; i++) {
		if (radioButtonGroup[i].checked)
			return radioButtonGroup[i].value;
	}
}

function isSuccess() {
	return getRadioValue() === 'SUCCEED';
}

function getCurrentGroceryItemFromApi(callback, timeToComplete = 1000) {
	console.log(`getCurrentGroceryItemFromApi`)
	setTimeout(() => {
		const groceryItem = getRandomGroceryItem();
		callback(groceryItem)
	}, timeToComplete)
}

function getDataFromApi(succeeds, callback, timeout) {
	if (succeeds) {
		getCurrentGroceryItemFromApi(callback, timeout);
	} else {
		throw Error('error occurred');
	}
}

function updateGroceryCart(groceryItem) {
	const groceryCart = document.getElementById('groceryCart');
	groceryCart.innerText = groceryItem;

	behaviorSubject.next(groceryItem);
	subject.next(groceryItem)
}

//#endregion