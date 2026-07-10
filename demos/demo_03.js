//Sync code
console.log("Start");

function greet() {
	console.log("Hello");
	return "Done";
}

const result = greet();
console.log(result);
console.log("End");

//Async code
console.log("Start");

setTimeout(() => {
	console.log("This happens after 2 sec");
}, 2000);

console.log("End");

// Promises

const myPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		const success = true;
		if (success) {
			resolve("Operation successful");
		} else {
			reject(new Error("Something went wrong"));
		}
	}, 1000);
});

console.log(myPromise);
