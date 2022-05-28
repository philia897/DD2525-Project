var FUNCFLAG = '_$$ND_FUNC$$_';

module.exports = function getCode(serializeFile) {
    try {
        var rawData = require('fs').readFileSync(serializeFile, 'utf8')
        var serializedData = parseSerializedData(rawData)
    } catch (error) {
        console.log("[ERROR] serializeJS.js: File Path Wrong!");
        process.exit(1)
    }
    return `var obj = ${serializedData};`
    
}

function parseSerializedData(obj,originStr){
    var parsedStr = originStr
    
    if(typeof obj === 'string'){
        parsedStr = obj
        obj = JSON.parse(obj);
    }

    var key;
    for(key in obj){
        if(obj.hasOwnProperty(key)) {
            if(typeof obj[key] === 'object'){
                parsedStr = parseSerializedData(obj[key],parsedStr);
            } else if (typeof obj[key] === 'string'){
                if(obj[key].indexOf(FUNCFLAG) === 0){
                    parsedStr = parsedStr.replace(`"${obj[key]}"`, obj[key].substring(FUNCFLAG.length))
                }
            }
        }
    }

    return parsedStr
}

// exports.unserialize = function(obj, originObj) {
//     var isIndex;
//     if (typeof obj === 'string') {
//       obj = JSON.parse(obj);
//       isIndex = true;
//     }
//     originObj = originObj || obj;
  
//     var circularTasks = [];
//     var key;
//     for(key in obj) {
//       if(obj.hasOwnProperty(key)) {
//         if(typeof obj[key] === 'object') {
//           obj[key] = exports.unserialize(obj[key], originObj);
//         } else if(typeof obj[key] === 'string') {
//           if(obj[key].indexOf(FUNCFLAG) === 0) {
//             obj[key] = eval('(' + obj[key].substring(FUNCFLAG.length) + ')');
//           } else if(obj[key].indexOf(CIRCULARFLAG) === 0) {
//             obj[key] = obj[key].substring(CIRCULARFLAG.length);
//             circularTasks.push({obj: obj, key: key});
//           }
//         }
//       }
//     }
  
//     if (isIndex) {
//       circularTasks.forEach(function(task) {
//         task.obj[task.key] = getKeyPath(originObj, task.obj[task.key]);
//       });
//     }
//     return obj;
//   };
