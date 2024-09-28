function sum(num1, num2){
    return num1 + num2;
}

function calc(num1, num2, calcNumbs){
    return calcNumbs(num1, num2);
}

console.log(calc(2, 2, sum));

// another example

setTimeout(function(){
    console.log('Hola JavaScript');
}, 2000);

// another example

function greetings(name){
    console.log(`Hola ${name}`);
}

setTimeout(greetings, 5000, 'Red')


// another example

const sum1 = (a, b) => a + b;
const res = (a, b) => a - b;
const mult = (a, b) => a * b;
const div = (a, b) => a / b;
const calc2 = (a, b, operation) => operation(a, b);
console.log(calc2(4, 5, res));