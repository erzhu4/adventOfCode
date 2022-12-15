let inputArr = require('./input.js')();
var SandUnit = require('./sand.js');

var startTime = Date.now();
    

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

let totalNumberOfSandUnits = 0;
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

// console.log("max Rows: ", maxRows);
// console.log("max Cols: ", maxCols);

maxRows += 1;
// maxCols += 2;

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

var startDroppingSandPart1 = function(){
    // console.log("start dropping the sand part1");
    let count = 0;
    let hasSandHitTheBottom = false;
    while (!hasSandHitTheBottom){
        let sandUnit = new SandUnit(THEMAP, SANDSTARTLOCATION, config);
        count += 1;
        while (!sandUnit.hasSettled) {
            sandUnit.tick();
            // displayArrayInConsole(THEMAP);
            // sleep(10);
        }

        hasSandHitTheBottom = THEMAP[THEMAP.length - 1].find(el => {
            return el == config.settledSandChar;
        });
    }
    totalNumberOfSandUnits += count;
    console.log("Final Count Part 1", count - 1);
}

startDroppingSandPart1();
displayArrayInConsole(THEMAP);
//----------------------------------------PART2--------------------------------------------------------------------------------

var addColumnsToTheLeft = function(amount) {
    SANDSTARTLOCATION[1] += amount;
    for (var i = 0; i < amount; i++){
        THEMAP.forEach(row => {
            row.unshift(config.emptyAirChar);
        });
    }
}

var addColumnsToTheRight = function(amount) {
    for (var i = 0; i < amount; i++){
        THEMAP.forEach(row => {
            row.push(config.emptyAirChar);
        });
    }
}

var adjustMapToWidth = function(minWidthNeeded){
    if (SANDSTARTLOCATION[1] < (minWidthNeeded / 2)){
        addColumnsToTheLeft((minWidthNeeded / 2) - SANDSTARTLOCATION[1]);
    }

    if ((maxCols - SANDSTARTLOCATION[1]) < (minWidthNeeded / 2) ){
        addColumnsToTheRight((minWidthNeeded / 2) - (maxCols - SANDSTARTLOCATION[1]));
    }

}

var startDroppingSandPart2 = function(){
    // console.log("start dropping the sand part2");
    let count = 0;
    let hasHoleBeenPlugged = false;
    while (!hasHoleBeenPlugged){
        let sandUnit = new SandUnit(THEMAP, SANDSTARTLOCATION, config);
        count += 1;
        while (!sandUnit.hasSettled) {
            sandUnit.tick();

            // displayArrayInConsole(THEMAP);
            // console.log('------------------------------');
            // sleep(10);
        }

        hasHoleBeenPlugged = (THEMAP[SANDSTARTLOCATION[0]][SANDSTARTLOCATION[1]] == config.settledSandChar);
    }

    console.log("Final Count Part 2", count + totalNumberOfSandUnits);
}

var requiredWidth = (maxRows * 2) + 2;
// console.log('requiredWidth', requiredWidth);
adjustMapToWidth(requiredWidth);


startDroppingSandPart2()
displayArrayInConsole(THEMAP);
var endTime = Date.now();

console.log(`Time it took: ${endTime - startTime} milliseconds`)

// displayArrayInConsole(THEMAP);