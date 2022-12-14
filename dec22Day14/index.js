let inputArr = require('./input.js')();
var SandUnit = require('./sand.js');

//-------------------------Helpers-------------------------------
var displayArrayInConsole = (arr) => {
    for (var i = 0; i < arr.length; i++){
        console.log(JSON.stringify(arr[i]));
    }
};

var sleep = (miliseconds) => {
    var waitTill = new Date(new Date().getTime() + miliseconds);
    while(waitTill > new Date()){}
}
//--------------------------------------------------------

//-------------------------SetUp-------------------------------
console.log('start');

const config = {
    emptyAirChar: '.',
    wallChar: '#',
    fallingSandChar: '+',
    settledSandChar:'o'
}

// const SANDSTARTLOCATION = [0,7];
const SANDSTARTLOCATION = [0,500];
const THEMAP = [];

let maxRows = 0;
let maxCols = 0;

inputArr.forEach(line => {
    let = pointStr = line.split('->');
    pointStr.forEach(point => {
        let coords = point.split(',');
        let colVal = parseInt(coords[0]);
        let rowVal = parseInt(coords[1]);
        if (colVal > maxCols){
            maxCols = colVal;
        }

        if (rowVal > maxRows){
            maxRows = rowVal;
        }
    });
});

maxRows += 2;
maxCols += 2;

//-------------------------build the map-------------------------------

var buildEmptyMap = function(rows, cols) {
    for (var i = 0; i < (rows + 1); i++){
        THEMAP.push([config.emptyAirChar]);
        for (var x = 0; x < (cols + 1); x++){
            THEMAP[i].push(config.emptyAirChar);
        }
    }
}

buildEmptyMap(maxRows, maxCols);

var markAllPointsBetweenTwoCoordsOnMap = function(coord1, coord2){
    let point1 = coord1.split(',').map(e => parseInt(e));
    let point2 = coord2.split(',').map(e => parseInt(e));
    //Index 0 is Col Index 1 is row

    if (point1[0] == point2[0]){
        let col = point1[0];
        for (var i = Math.min(point1[1], point2[1]); i <= Math.max(point1[1], point2[1]); i++){
            THEMAP[i][col] = config.wallChar;
        }

    } else if (point1[1] == point2[1]){
        let row = point1[1];
        for (var i = Math.min(point1[0], point2[0]); i <= Math.max(point1[0], point2[0]); i++){
            THEMAP[row][i] = config.wallChar;
        }
    }
};

var setWallsUsingLineArr = function(lineArr){
    for (var i = 1; i < lineArr.length; i++){
        markAllPointsBetweenTwoCoordsOnMap(lineArr[i - 1], lineArr[i]);
    }
};

var drawLinesOnMapFromInput = function(input){
    input.forEach(line => {
        let arrRepresentingLine = line.split('->');
        setWallsUsingLineArr(arrRepresentingLine);
    });
}

drawLinesOnMapFromInput(inputArr);

//------------------------------------------------------------------------------------------------------------------

var startDroppingSand = function(){
    console.log("start dropping the sand");
    let count = 0;
    let hasSandHitTheBottom = false;
    while (!hasSandHitTheBottom){
        let sandUnit = new SandUnit(THEMAP, SANDSTARTLOCATION, config);
        count += 1;
        while (!sandUnit.hasSettled) {
            sandUnit.tick();
            // displayArrayInConsole(THEMAP);
            // sleep(100);
        }

        hasSandHitTheBottom = THEMAP[THEMAP.length - 1].find(el => {
            return el == config.settledSandChar;
        });
    }

    console.log("Final Count ", count - 1);
}

startDroppingSand();

// displayArrayInConsole(THEMAP);