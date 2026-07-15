// JS classes

const user1 = {
	username: "alice",
	email: "alice@test.com",
	getInfo() {
		return `${username} - ${email}`;
	},
};

const user2 = {
	username: "bob",
	email: "bob@test.com",
	getInfo() {
		return `${username} - ${email}`;
	},
};

class TestUser {
	constructor(username, email) {
		this.username = username;
		this.email = email;
	}

	getInfo() {
		return `${this.username} - ${this.email}`;
	}
}

const user3 = new TestUser("mary", "mary@test.com");
const user4 = new TestUser("john", "john@test.com");

console.log(user3.getInfo());
console.log(user4.getInfo());
