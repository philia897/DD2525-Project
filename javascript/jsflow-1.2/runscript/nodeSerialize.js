var FUNCFLAG = '_$$ND_FUNC$$_';

module.exports = function getCode(serializeFile) {
    try {
        var rawData = require('fs').readFileSync(serializeFile, 'utf8')
        var serializedData = parseSerializedData(rawData)
    } catch (error) {
        console.log("[ERROR] serializeJS.js: File Path Wrong!");
        process.exit(1)
    }
    return `var obj = lbl(${serializedData});`
    
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
                    parsedStr = parsedStr.replace(`"${obj[key]}"`, `lbl(${obj[key].substring(FUNCFLAG.length)})`)
                }
            }
        }
    }

    return parsedStr
}