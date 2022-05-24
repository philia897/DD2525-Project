function toUnicode(str) {
	return str.split('').map(function (value, index, array) {
		var temp = value.charCodeAt(0).toString();
		// if (temp.length > 2) {
		// 	return '\\u' + temp;
		// }
		return temp;
	}).join(',');
}

function genCodedComm(str) {
    return `eval(String.fromCharCode(${toUnicode(str)}))`;
}

// var obj = {x:1,y:"y"}

// console.log(toUnicode(str));
console.log(genCodedComm("hello world"))

