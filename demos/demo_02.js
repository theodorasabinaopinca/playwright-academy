// OOP Javascript

const user = {
	username: "admin",
	email: "admin@example.com",
	role: "administrator",
};

// Destructuring

const username1 = user.username;
const email1 = user.email;

const { username, email, role } = user;
console.log(username, email, role);

// Array destructuring
const browsers = ["Chromium", "Firefox", "Webkit"];

const [browser1, browser2, browser3] = browsers;
console.log(browser1, browser2);

// Functions

function hello(name) {
	console.log(`Hello, ${name} `);
}

hello("Alice");

const hello1 = (name) => {
	return `Hello, ${name} `;
};

hello1("bob");
const hello2 = (name) => `Hello, ${name} `;
console.log(hello2("Mary"));

const add = (a, b) => a + b;
console.log(add(5, 3));

// Array methods

const usersDemo = [
	{ username: "admin", active: true },
	{ username: "tester", active: true },
];

// filter array method
const activeUsers = usersDemo.filter((user) => user.active);
console.log(activeUsers);

//syntax
//array.filter(item => condition)
