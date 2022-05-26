const myArgs = process.argv.slice(2);
var serializeModule = myArgs[0]
var serializeFile = myArgs[1]
var customScriptFile = myArgs[2]
// var serializeData;

try {
    var serializeData = require('fs').readFileSync(serializeFile, 'utf8')
    var customScript = require('fs').readFileSync(customScriptFile, 'utf8')
} catch (error) {
    console.log("[ERROR] index.js: File Path Wrong!");
    console.log(error)
    process.exit(1)
}

console.log(serializeData)

// var support_libraries = ['cryo', 'node-serialize', 'serialize-to-js', 'serialize-javascript', 'funcster', 'any-serialize']
var support_libraries = {
    'node-serialize': 'runscript/nodeSerializeRun.js',
    'serialize-javascript': 'runscript/serializeJs.js'
}
if(!support_libraries.hasOwnProperty(serializeModule)){
    console.log("Serialization Module not support")
    process.exit(1)
}else{
    var runscriptFn = require('./runscript/serializeJs');
}

var Interpreter = require('js-interpreter');

var myCode = `
${runscriptFn(serializeFile)}
${customScript}
`

var initFunc = function(interpreter, globalObject) {
//   interpreter.setProperty(globalObject, 'serializedData', serializeData);
//   var wrapper = function deserialize(text) {
//     return deserializeFn(text);
//   };
//   interpreter.setProperty(globalObject, 'deserialize',
//       interpreter.createNativeFunction(wrapper));
};

var myInterpreter = new Interpreter(myCode, initFunc);
// var myInterpreter = new Interpreter(myCode);
try {
    myInterpreter.run()
    console.log('Successfully Run, this object seems safe')
} catch (error) {
    console.log("\n**** Some error happened! Maybe the payload is malicious, check it please! ****\n")
    console.log("check the error log in logs/error_***.log")
    require('fs').writeFileSync(`logs/error_${Date.now()}.log`, `${error} \n\n ====== Run Code ======== \n\n${myCode}`)
}

// var xxx = require('cryo')
// var obj = xxx.parse(serializeData)
// console.log("Done")
// console.log('obj:' + obj)

// function getDeserializationFn(moduleName){
//     switch (moduleName) {
//         case 'cryo':
//             return require('cryo').parse;
    
//         default:
//             return require('cryo').parse;
//             break;
//     }
// }
