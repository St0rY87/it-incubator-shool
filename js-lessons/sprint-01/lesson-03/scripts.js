// const numbers = [1,2,3,4,5,6,7,8,9];
// const numbers = new Array(1,2,3,4,5,6);
// console.log(numbers)
// Array.isArray(numbers);
// console.log(Array.isArray(numbers))

// класс =>  Array
// экземпляр класса => numbers
// Array.prototype = > "библиотека" методов экземпялра
// numbers.__proto__ => ссылка на Array.prototype
// numbers.__proto__.push.call(numbers, 200)

const numbers = new Array.prototype.constructor(1, 3, 10);

// Array.isArray() => статический метод


class Pet {
    constructor(name) {
        this.name = name
    }
    sayHi() {
        console.log(`hello from ${this.name}`)
    }


}

const cat = new Pet('Majorka');

Array.prototype.push = function () {
    alert()
}

Array.prototype.find = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i]) === true) {
            return this[i]
        }
    }
    return undefined;
}

numbers.find(n => n % 2 === 0)

// контекст вызова (так как получает свое значение только в момент вызова)
// контекст - это объект

Array.prototype.map = function (callback) {
    const newArr = new Array();
    for (let i = 0; i < this.length; i++) {
        newArr[i] = callback(this[i]);
    }
    return newArr;
}

Array.prototype.filter = function (callback) {
    const newArr = new Array();
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i])) {
            newArr[newArr.length] = this[i]
        }
    }

    return newArr;
}


const test = [23, 24, 33, 12, 56, 23, 11, 55, 4, 7, 7, 7, 8, 3, 2, 24];

const result = {
    1: 5,
    7: 3,
}

test.reduce((acc, el) => {        // acc = {}              
    if (acc[el] === undefined) { //acc.23 ?
        acc[el] = 1; //{...acc, acc[el]: 1}
    } else {
        acc[el] = acc[el] + 1
    }
    return acc
}, {})


numbers.reduce((acc, el)=>{
    acc = acc + el;
    return acc;
}, 0);


Array.prototype.reduce = function(callback, accumulator) {
    for (let i = 0; i < this.length; i++) {
       accumulator = callback(accumulator, this[i])
        
    }

    return accumulator;
}