const myArgs = process.argv.slice(2);

var support_libraries = {
    'node-serialize': './runscript/nodeSerialize',
    'serialize-javascript': './runscript/serializeJs'
}

var help = `
*** Javascript Sandbox Tester ***    
Try to test the Serialized Payload in the Sandbox to detect Remote Code Execution behavior

Usage: sandbox [library] [input serialized file] [custom testing file]
support libraries: ${Object.keys(support_libraries).toString()}

==========================================
`
if(myArgs.length < 3){
    console.log("ERROR: not enough Parameters!")
    console.log(help)
    process.exit(1)
}

var serializeModule = myArgs[0]
var serializeFile = myArgs[1]
var customScriptFile = myArgs[2]
// var serializeData;


// Get the Run Code
try {
    var serializeData = require('fs').readFileSync(serializeFile, 'utf8')
    var customScript = require('fs').readFileSync(customScriptFile, 'utf8')
} catch (error) {
    console.log("[ERROR] index.js: File Path Wrong!");
    console.log(error)
    console.log(help)
    process.exit(1)
}

console.log(serializeData)

// var support_libraries = ['cryo', 'node-serialize', 'serialize-to-js', 'serialize-javascript', 'funcster', 'any-serialize']
if(!support_libraries.hasOwnProperty(serializeModule)){
    console.log("Serialization Module not support")
    console.log(help)
    process.exit(1)
}else{
    var runscriptFn = require(support_libraries[serializeModule]);
}

var myCode = `
${runscriptFn(serializeFile)}
${customScript}
`

// Init the interpreter and input the Code to run
var Interpreter = require('js-interpreter');

var initFunc = function(interpreter, globalObject) {
//   interpreter.setProperty(globalObject, 'serializedData', serializeData);
//   var wrapper = function deserialize(text) {
//     return deserializeFn(text);
//   };
//   interpreter.setProperty(globalObject, 'deserialize',
//       interpreter.createNativeFunction(wrapper));
};

var myInterpreter = new Interpreter(myCode, initFunc);

try {
    myInterpreter.run()
    console.log('Successfully Run, this object seems safe')
} catch (error) {
    console.log("\n**** Some error happened! Maybe the payload is malicious, check it please! ****\n")
    console.log("check the error log in logs/error_***.log")
    require('fs').writeFileSync(`logs/error_${Date.now()}.log`, `${error} \n\n ====== Run Code ======== \n\n${myCode}`)
}

// function getDeserializationFn(moduleName){
//     switch (moduleName) {
//         case 'cryo':
//             return require('cryo').parse;
    
//         default:
//             return require('cryo').parse;
//             break;
//     }
// }
