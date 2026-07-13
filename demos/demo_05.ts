//Generics

function getFirstItem(arr: any[]): any {
	return arr[0];
}

const firstBrowser = getFirstItem(["Chrome", "Firefox"]);
const firstNumber = getFirstItem([1, 2, 3]);

function getFirstElement<T>(arr: T[]): T {
	return arr[0];
}

const firstBrElement = getFirstElement<string>(["Chrome", "Firefox"]);
const firstNrElement = getFirstElement<number>([1, 2]);

let browsersArray: Array<string> = ["Chrome", "Firefox"];

let browsersList: Array<Array<string>> = [["Chrome", "Firefox"], ["webkit"]];

// Type aliases
type UserID = string;
let userId: UserID = "user_1234";

type TestUser = {
	username: string;
	password: string;
	role: string;
};

// Type aliases for objects
const adminUser: TestUser = {
	username: "adminuser",
	password: "test123!",
	role: "admin",
};

const regularUser: TestUser = {
	username: "regularuser",
	password: "test123!",
	role: "tester",
};

function loginUser(user: TestUser) {
	console.log(`Loggin in ${user.username}`);
}

// Type alias for functions
type LoginFunction = (username: string, password: string) => Promise<void>;

// use for variables
const performLogin: LoginFunction = async (user, pass) => {
	console.log(`Loggin in ${user}`);
	console.log(`Entering pass ${pass}`);
};

// use for parameters
function executeLogin(loginMethod: LoginFunction, user: string, password: string) {
	loginMethod(user, password);
}

executeLogin(performLogin, "user1", "pass1");

// Type alias for arrays
type UserList = TestUser[];

const users2: UserList = [adminUser, regularUser];

// Literal types
type BrowserName = "chromium" | "firefox" | "webkit";

let browser: BrowserName;
browser = "chromium";
//browser = 'chrome'

// Combine concepts
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type StatusCode = 200 | 201 | 400 | 404 | 500;

type ApiResponse = {
	method: HttpMethod;
	status: StatusCode;
	data: string | null;
	success: boolean;
};

async function makeRequest(method: HttpMethod, endpoint: string): Promise<ApiResponse> {
	//implementation here
	return {
		method: method,
		status: 200,
		data: "Success",
		success: true,
	};
}

async function executeRequest() {
	const response = await makeRequest("GET", "/api/users");
	console.log(response);
}

executeRequest();
