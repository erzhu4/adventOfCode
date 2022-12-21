let inputArr = require('./input.js')();

var largest = 0;
var temp = 0;

inputArr.forEach((el) => {
    let num = parseInt(el);
    if (!num){
        temp = 0;
        return;
    }

    temp += num;
    if (temp > largest){
        largest = temp;
    }

});

console.log("largest?", largest);

//part 2

let arrr = [];

temp = 0;

inputArr.forEach((el) => {
    let num = parseInt(el);
    if (!num){
        arrr.push(temp + 0);
        temp = 0;
        return;
    }

    temp += num;
});

arrr.push(temp + 0);

let sorted = arrr.sort((a,b) => {return b - a;});

let sum = 0;


for (var i = 0; i < 3; i++){
    sum += sorted[i];
}

console.log(sum);