let inputArr = require('./input.js')();

// console.log(inputArr)

let maxSize = 0;

inputArr.forEach(el => {
    if ( el[1] > maxSize) {
        maxSize = el[1];
    }
});

var buildMap = function(size) {
    let result = [];
    for (var i = 0; i < (size*2); i++){
        result.push(['.']);
        for (var x = 0; x < (size*2); x++){
            result[i].push('.');
        }
    }
    return result;
}


var theMap = buildMap(maxSize);
var headLocation = [0,0];
var tailLocation = [0,0];


// **************************************************************************************************************

var setStartPoint = function(){
    theMap[maxSize][maxSize] = 's';
    headLocation = tailLocation = [maxSize, maxSize];
}
setStartPoint();

var moveHeadUp = function(){
    headLocation[0] = headLocation[0] - 1;
}
var moveHeadLeft = function(){
    headLocation[1] = headLocation[1] - 1;
}
var moveHeadRight = function(){
    headLocation[1] = headLocation[1] + 1
}
var moveHeadDown = function(){
    headLocation[0] = headLocation[0] + 1;
}
//------------------------------------------------------------------------------------------
var moveTailUp = function(){
    tailLocation[0] = tailLocation[0] - 1;
}
var moveTailLeft = function(){
    tailLocation[1] = tailLocation[1] - 1;
}
var moveTailRight = function(){
    tailLocation[1] = tailLocation[1] + 1
}
var moveTailDown = function(){
    tailLocation[0] = tailLocation[0] + 1;
}

var moveTailUpLeft = function(){
    tailLocation[0] = tailLocation[0] - 1;
    tailLocation[1] = tailLocation[1] - 1;
}
var moveTailUpRight = function(){
    tailLocation[0] = tailLocation[0] - 1;
    tailLocation[1] = tailLocation[1] + 1;
}
var moveTailDownLeft = function(){
    tailLocation[0] = tailLocation[0] + 1;
    tailLocation[1] = tailLocation[1] - 1;
}
var moveTailDownRight = function(){
    tailLocation[0] = tailLocation[0] + 1;
    tailLocation[1] = tailLocation[1] + 1;
}

// **************************************************************************************************************

console.log(theMap);

console.log('max?', maxSize);