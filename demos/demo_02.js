//vamos a definir un objeto

const user ={
    username: "admin",
     role: "administrator",
    email: "test@email.com"
}
//asi es como hariamos las llamadas de la manera antigua
// const username =user.username;


//si queremos llamarlo destructuring, podemos hacerlo de la siguiente manera

const {username, role, email} = user;

console.log(username, role, email);

// Functions

//classic way para crear functions, con un parametro dentro

function hello (name){
    console.log(`Hello, ${name}!`);
}
hello("Juan");

//arrow functions

const arrowFunction = (name) => {
    return console.log(`Hello, ${name}!`);
}

arrowFunction("Pedro");

// podemos ponerlo en una sola linea, si solo tenemos un parametro y un return

const arrowFunction2 = name => console.log(`Hello, ${name}!`);

//funciones con dos parametros

const suma = (a, b) => a + b;

console.log(suma(2, 3));

//array de objetos

const users = [
    {username: "admin", role: "administrator", active: true},
    {username: "user1", role: "user", active: true},
    {username: "user2", role: "user", active: false},
]

//filter, funciona asi: array.filter(item => condition), nos devuelve un nuevo array con los elementos que cumplen la condicion

const activeUsers = users.filter(user => user.active);