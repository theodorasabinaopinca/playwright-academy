// esto es para demostrar que java es secuencial, es decir, que se ejecuta de arriba hacia abajo, y que si una funcion tarda mucho en ejecutarse, el resto del codigo se queda esperando a que termine

console.log("Inicio del programa");

function greet(){
    console.log("Hello");
    return "done";
}

const result = greet();
console.log(result);
console.log("End");

//ahora vamos a ver un asyncronous function, que es una funcion que se ejecuta en segundo plano, y que no bloquea el resto del codigo

console.log("Inicio del programa");

setTimeout(() => {
    console.log("This happens after 2 seconds");
}, 2000);

console.log("End");


// Promises

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() =>{
        const success = true;
        if(success){
            resolve("The promise was resolved");
        }else{
            reject(new Error("The promise was rejected"));
        }
    }, 1000)
}, )

console.log(myPromise)

