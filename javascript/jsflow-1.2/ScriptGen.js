const myArgs = process.argv.slice(2);
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
    process.exit(1)
}

console.log(serializeData)

// var support_libraries = ['cryo', 'node-serialize', 'serialize-to-js', 'serialize-javascript', 'funcster', 'any-serialize']
var support_libraries = {
    'node-serialize': './runscript/nodeSerializeRun',
    'serialize-javascript': './runscript/serializeJs'
}
if(!support_libraries.hasOwnProperty(serializeModule)){
    console.log("Serialization Module not support")
    process.exit(1)
}else{
    var runscriptFn = require(support_libraries[serializeModule]);
}

var myCode = `
${runscriptFn(serializeFile)}
${customScript}
`
if (myCode.includes('__proto__')){
    var myCode = `console.log('Suffering from prototype pollution attack!'); console.log("original test code is: "); console.log(\`${myCode}\`)`
}
require('fs').writeFileSync(`test/${serializeModule}_test.js`, myCode)