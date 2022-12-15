let inputArr = require('./input.js')();

// console.log(inputArr)
(async function(){
    let maxSize = 0;

    let sumOfAllDirs = {
        'U': 0,
        'D': 0,
        'R': 0,
        'L': 0
    };

    inputArr.forEach(el => {
        sumOfAllDirs[el[0]] += el[1];
    });

    Object.keys(sumOfAllDirs).forEach(key => {
        if (maxSize < sumOfAllDirs[key]){
            maxSize = sumOfAllDirs[key];
        }
    });



    // maxSize = 800;
    console.log('Max Size', maxSize);

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

    // var sleep = (seconds) => {
    //     var waitTill = new Date(new Date().getTime() + seconds * 1000);
    //     while(waitTill > new Date()){}
    // }

    var theMap = buildMap(maxSize);
    var headLocation = [0,0];
    var previousHeadLocation = [0,0];
    var tailLocation = [0,0];

    var displayArrayInConsole = (arr) => {
        for (var i = 0; i < arr.length; i++){
            console.log(JSON.stringify(arr[i]));
        }
    };

    // var drawMapForTick = () => {
    //     theMap[tailLocation[0]][tailLocation[1]] = 'T';
    //     theMap[headLocation[0]][headLocation[1]] = 'H';
    //     displayArrayInConsole(theMap);
    //     theMap[tailLocation[0]][tailLocation[1]] = '.';
    //     theMap[headLocation[0]][headLocation[1]] = '.';
    // }

    // **************************************************************************************************************

    var setStartPoint = function(){
        theMap[maxSize][maxSize] = 's';
        headLocation = [maxSize, maxSize];
        previousHeadLocation  = [maxSize, maxSize];
        tailLocation  = [maxSize, maxSize];
    }
    setStartPoint();

    var moveHeadUp = function(){
        previousHeadLocation = [headLocation[0], headLocation[1]]
        headLocation[0] = headLocation[0] - 1;
        // theMap[headLocation[0]][headLocation[1]] = 'X';
    }
    var moveHeadLeft = function(){
        previousHeadLocation = [headLocation[0], headLocation[1]]
        headLocation[1] = headLocation[1] - 1;
        // theMap[headLocation[0]][headLocation[1]] = 'X';
    }
    var moveHeadRight = function(){
        previousHeadLocation = [headLocation[0], headLocation[1]]
        headLocation[1] = headLocation[1] + 1;
        // theMap[headLocation[0]][headLocation[1]] = 'X';
    }
    var moveHeadDown = function(){
        previousHeadLocation = [headLocation[0], headLocation[1]]
        headLocation[0] = headLocation[0] + 1;
        // theMap[headLocation[0]][headLocation[1]] = 'X';
    }
    //------------------------------------------------------------------------------------------

    var didHeadMoveAwayFromTail = () => {

        let distance = Math.sqrt( 
            ( (headLocation[0] - tailLocation[0])*(headLocation[0] - tailLocation[0])) +
            (
                (headLocation[1] - tailLocation[1])*(headLocation[1] - tailLocation[1])
            ) 
        );

        console.log("head is at: (" + headLocation[0] + ', ' + headLocation[1] + ') AND tail is at: (' + tailLocation[0] + ', ' + tailLocation[1]+')')
        // console.log("didHeadMoveAwayFromTail??", distance);

        if (distance >= 2) {
            // console.log('need to move');
            return true;
        }
        return false;
    }

    var evaluateTail = (arg) => {
        // console.log("Tick");
        // console.log(arg);
        // drawMapForTick();
        if (didHeadMoveAwayFromTail()){
            tailLocation = [previousHeadLocation[0], previousHeadLocation[1]];
            // console.log("huh");
            theMap[tailLocation[0]][tailLocation[1]] = '#';
        }
        // drawMapForTick();
        // sleep(1);
    }


    // **************************************************************************************************************

    // console.log(JSON.stringify(theMap));
    //read the lines
    inputArr.forEach((line) => {
        switch (line[0]) {
            case 'U':
                for (var i = 0; i < line[1]; i++){
                    moveHeadUp();
                    evaluateTail(line);
                }
                break;
            case 'D':
                for (var i = 0; i < line[1]; i++){
                    moveHeadDown();
                    evaluateTail(line);
                }
                break;
            case 'L':
                for (var i = 0; i < line[1]; i++){
                    moveHeadLeft();
                    evaluateTail(line);
                }
                break;
            case 'R':
                for (var i = 0; i < line[1]; i++){
                    moveHeadRight();
                    evaluateTail(line);
                }
                break;
            default:
        }
    });

    // console.log(JSON.stringify(theMap));
    // console.log(theMap);

    // displayArrayInConsole(theMap);

    var sumUpMap = () => {
        let sum = 0;
        theMap.forEach(row => {
            row.forEach(el => {
                if (el != '.'){
                    sum += 1;
                }
            });
        });
        return sum;
    }
    console.log('Sum?', sumUpMap());
})();