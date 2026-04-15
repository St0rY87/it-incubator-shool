
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const str = ["q", "w", "e"]

// function push(array, el){
//     console.log(arguments);
//     const arr = arguments[0]
//     for (let i = 1; i < arguments.length; i++) {
//        arr[arr.length] = arguments[i]
//     }
//     return arr.length
// }

//const len = numbers.push(100)
const push = (array, ...rest) => {
    console.log(rest);
    for (let i = 0; i < rest.length; i++) {
        array[array.length] = rest[i];
    }
    return array.length
}
const len = push(numbers, 100, 200, 300)

//const arr = [...numbers, 100,200, ...str]
//const arr = numbers.concat(100,200, str)
function concat(array, ...rest) {
    const result = []
    for (let i = 0; i < array.length; i++) {
        result[i] = array[i];
    }
    for (let i = 0; i < rest.length; i++) {
        if (Array.isArray(rest[i])) {
            const innerArray = rest[i]
            for (let i = 0; i < innerArray.length; i++) {
                result[result.length] = innerArray[i];
            }
        } else {
            result[result.length] = rest[i];
        }
    }
    return result
}

concat(numbers, 100, 200, str)


function indexOf(array, el, startIndex = 0) {

    let start = startIndex
    if (start < 0) {
        start = array.length + startIndex
    }
    for (let i = start; i < array.length; i++) {
        if (el === array[i]) {
            return i
        }
    }
    return -1
}

const numbersPlus = [1, 2, 3, 4, 5, 6, 7, 8, 9]
indexOf(numbersPlus, 6)

function includes(array, el) {
    for (let i = 0; i < array.length; i++) {
        if (el === array[i]) {
            return true
        }
    }
    return false
}


const a = [1, 2, 3, 4, 5, 6, 7, 8, 9]


function toReversed(array) {
    const result = []
    for (let i = 0; i < array.length; i++) {
        result[i] = array[array.length - 1 - i]
    }
    return result
}


// [1,2,3,4,5, 6] = 6 => 3 => 012
function revers(array) {
    for (let i = 0; i < array.length / 2; i++) {
        let temp = array[array.length - 1 - i]
        array[array.length - 1 - i] = array[i]
        array[i] = temp
    }
    return array
}



console.log('Hello from JS')
