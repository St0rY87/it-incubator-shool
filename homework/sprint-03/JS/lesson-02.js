const server = {
    getData: function() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('get data')
            }, 2000)
        })
    }
}

const delay = (ms = 1000) => {
    return new Promise((resolve, rejected)=>{
        setTimeout(()=>{
            resolve(`ms is ${ms}`)
        }, ms)
    })
}

delay() 
delay().then((res)=> console.log(res))
delay().then((res)=> res)


const promise1 = new Promise((res, rej) => {
 setTimeout(() => {
//    res("reject1");
   rej("reject1");
 }, 1000);
});

promise1
 .catch((t) => t + "catch1")
 .catch((t) => t + "catch2")
 .then((t) => t + "then1")
 .finally((t) => t + "finally")
 .then((t) => console.log(t)); 