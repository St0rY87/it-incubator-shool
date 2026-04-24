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

const numbers = new Array.prototype.constructor(10, 20, 30);

// Array.isArray() => статический метод


class Pet {
    constructor(name) {
        this.name = name
        this.sayHi = 'Hi from pet'
    }

}

const cat = new Pet('Majorka')