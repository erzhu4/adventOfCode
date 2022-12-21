let inputArr = require('./input.js')();

inputArr = inputArr.map(el => el.replace(/\s/g, ''));

let map = {};

inputArr.forEach((el) => {
    let thing = el.split(':');
    map[thing[0]] = thing[1];
});

var findValueOf = function(str) {
    let target = map[str];
    try {
        let result = eval(target);
        map[str] = result;
        return result;
    } catch (e) {
        let strs = target.split(/[-+/*]/);
        map[str] = map[str].replace(strs[0], findValueOf(strs[0])).replace(strs[1], findValueOf(strs[1]));
        let result = eval(map[str]);
        return result;
    }
}

findValueOf('root');

console.log(eval(map['root']));