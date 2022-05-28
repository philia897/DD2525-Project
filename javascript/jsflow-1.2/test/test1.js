//var a = lbl(10)
//var b = 20
//var c = a + b
//if (a == 10){b = 22}
//var spawn = lbl(require('child_process').spawn);
//var sh = spawn('ls',['-l'])
//sh.stdout.on('data', (data) => {
//  console.log(`stdout: ${data}`);
//});
//console.log('finished!')

var obj = lbl({x:10,y:function(x){
	var spawn = require('child_process').spawn;
	var sh = spawn('ls',['-l']);
	return x;
}})
print(obj)
print(obj.x)
print(obj.y)
print(obj.y(1))
