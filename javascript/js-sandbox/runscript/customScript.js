// obj.valueOf();

function test (obj) {
    for(key in obj){
        if(typeof obj[key] === 'object'){
            test(obj[key]);
        } else if (typeof obj[key] === 'function'){
            var fun = (obj[key])();
            fun();
        } else {
            var x = obj[key];
        }
    }
}