module.exports = function (serializeFile) {
    try {
        var serializeData = require('fs').readFileSync(serializeFile, 'utf8')
    } catch (error) {
        console.log("[ERROR] serializeJS.js: File Path Wrong!");
        process.exit(1)
    }
    return `var obj = ${serializeData};`
    
}