// Primitive types
let username: string = "testuser";
let age: number = 25;

// Array
let usernames = ["alice", "bob", "charlie"];
let browsers: Array<string> = ["Chromium", "Firefox"];

// Functions
function add(a: number, b: number): number {
	return a + b;
}

// Union types
let mixedData: (string | number)[] = ["alice", 30, "alice", 23];
let mixedData2: Array<string | number> = ["alice", 30, "alice", 23];

// Object
let user: { name: string; age: number } = {
	name: "Alice",
	age: 25,
};

//Array objects

let users: { name: string; age: number }[] = [
	{ name: "Alice", age: 25 },
	{ name: "ben", age: 30 },
];

//users.push({ name: "David", age: "30" });

//Optional prop

let user2: {
	name: string;
	page: number;
	email?: string;
} = {
	name: "Alice",
	page: 25,
};

//user2.email = 'alice@example.com';
//console.log(user2.email.toLowerCase());

// Nested objects
let user3: {
	name: string;
	credentials: {
		username: string;
		password: string;
	};
} = {
	name: "Alice",
	credentials: {
		username: "alice123",
		password: "test1234!",
	},
};

user3.credentials.username;

// Optional param
function login(username: string, password: string, isLogged?: boolean) {
	console.log(`loggin in ${username}`);
	if (isLogged) {
		console.log("User logged in");
	} else {
		console.log("User not logged in");
	}
}

//login("alice");

function setTimeout(duration: number = 5000) {
	console.log(`Timeout is: ${duration} ms`);
}

setTimeout();
setTimeout(1000);
