let inputArr = require('./input.js')();

// console.log(JSON.stringify(inputArr));

var largest = 0;
var temp = 0;

inputArr.forEach((el) => {
    let num = parseInt(el);
    // console.log("parse???", el);
    if (!num){
        temp = 0;
        return;
    }

    temp += num;
    if (temp > largest){
        largest = temp;
    }

});

console.log(largest);