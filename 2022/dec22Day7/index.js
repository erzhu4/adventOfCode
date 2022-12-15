let input = require('./input.js')();

console.log("huh???".replace(/\n/g, 'a'));

let lineByLineArray = input.replace(/\n/g, ' ').split('$ ');

function makeid() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var currentDirectory = null;

var rootDirectory = {
    id: makeid(),
    type: 'd',
    name: 'root',
    content: []
};


//************************************************************************** */

containsNumbers = (str) => {
    return /\d/.test(str);
}

cleanUpEmptyArrayElements = (arr) => {
    return arr.filter((el) => {
        return el != '';
    }).map(el => {
        if (el[el.length - 1] == ' '){
            return el.slice(0, el.length - 1);
        }
        return el;
    });
}

var generateNewFile = (size, name) => {
    return {
        id: makeid(),
        type: 'f',
        name: name,
        size: parseInt(size)
    };
}

var generateNewDirectory = (name) => {
    return {
        id: makeid(),
        type: 'd',
        name: name,
        content: []
    };
}

var doesThisDirectoryContainEl = (dir, el) => {
    if (dir.type != 'd') {
        return false;
    }
    return !!dir.content.find(e => {
        return e.id == el.id;
    });
}

var recursiveSearchDirForEl = (dir, el) => {
    if (doesThisDirectoryContainEl(dir, el)){
        return dir;
    }

    for (var i = 0; i < dir.content.length; i++){
        let currentElement = dir.content[i];
        if (currentElement.type == 'd'){
            let found = recursiveSearchDirForEl(currentElement, el);
            if (found){
                return found;
            }
        }
    }
    return null;
}

var buildDirectoryFromString = (str) => {
    // console.log("-------------------------------------");
    let strSplitOnSpace = str.split(' ');

    if (!currentDirectory){
        return;
    }

    for (var i = 0; i < strSplitOnSpace.length; i++){
        if (containsNumbers(strSplitOnSpace[i])){
            // console.log("Has Numbers!", strSplitOnSpace[i])
            currentDirectory.content.push(generateNewFile(strSplitOnSpace[i], strSplitOnSpace[i + 1]));
            i++;
        } else {
            currentDirectory.content.push(generateNewDirectory(strSplitOnSpace[i]));
        }
    }

};

//************************************************************************** */



var lineIsRootDirectory = () => {
    currentDirectory = rootDirectory;
    return;
}

var lineIsLs = (line) => {
    let lineSplitOnDir = line.replace(/ls /g, '').split('dir ');
    let dirArray = cleanUpEmptyArrayElements(lineSplitOnDir);
    dirArray.forEach((el) => {
        buildDirectoryFromString(el);
    });
    return;
}

var lineIsCd = (line) => {
    let dirName = line.split(' ')[1];
    currentDirectory = currentDirectory.content.find(el => {
        return el.name == dirName;
    });
    return;
}

var upOneDirectory = (line) => {
    currentDirectory = recursiveSearchDirForEl(rootDirectory, currentDirectory);
    return;
}

//read the lines and build the structure
lineByLineArray.forEach((line) => {
    if (line.indexOf('cd /') != -1){
        lineIsRootDirectory();
    } else if (line.indexOf('ls ') != -1){
        lineIsLs(line);
    } else if (line.indexOf('cd ..') != -1){
        upOneDirectory(line);
    } else if (line.indexOf('cd ') != -1){
        lineIsCd(line);
    }
});

var setSizeOfEachDirectory = (dir) => {
    let result = 0;
    dir.content.forEach(el => {
        if (el.type == 'f'){
            result += el.size;
        } else if (el.type == 'd'){
            result += setSizeOfEachDirectory(el);
        }
    });
    dir.dirSize = result;
    return result;
}

setSizeOfEachDirectory(rootDirectory);

var maxSize = 100000

var finalArr = [];
var sum = 0;
// var test = {};

let dirMapToSize = {};

var traverseDirectoryToFindSize = (dir) => {
    dir.content.forEach(el => {
        if (el.type == 'd'){
            if (el.dirSize <= maxSize){
                finalArr.push(el.dirSize);
            }
            dirMapToSize[el.id] = el.dirSize;
            traverseDirectoryToFindSize(el);
        }
    });
}

traverseDirectoryToFindSize(rootDirectory);


console.log(JSON.stringify(rootDirectory));

finalArr.forEach(e => {
    sum += e;
});

// console.log(finalArr);
console.log(sum);

//part 2----------------

var setDerpSizeOfEachDirectory = (dir) => {
    let result = 0;
    dir.content.forEach(el => {
        if (el.type == 'f'){
            // result += el.size;
        } else if (el.type == 'd'){
            result += (el.dirSize);
            result += setDerpSizeOfEachDirectory(el);
        }
    });
    dir.derpSize = result;
    return result;
}

// setDerpSizeOfEachDirectory(rootDirectory);

let targetSize = 30000000 - 27463286;
             //  42536714
             //  8003064
console.log(dirMapToSize);

let smallestDirAboveTarget = rootDirectory.dirSize;

Object.keys(dirMapToSize).forEach((key) => {
    if (dirMapToSize[key] >= targetSize && dirMapToSize[key] < smallestDirAboveTarget){
        smallestDirAboveTarget = dirMapToSize[key];
    }
});

console.log("smallest Dir To Target ", smallestDirAboveTarget);



// console.log(test);