/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    return typeof n === 'number' && (n ^ 0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    return Array.from({length: 10}, (_, i) => (i + 1) * 2);
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    if (typeof n !== 'number' || n < 1 || !Number.isInteger(n)) {
        throw new Error('Аргумент должен быть положительным целым числом.');
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    if (typeof n !== 'number' || n < 1 || !Number.isInteger(n)) {
        throw new Error('Аргумент должен быть положительным целым числом.');
    }
    if (n === 1) {
        return 1;
    } else {
        return n + recSumTo(n - 1);
    }
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    if (n < 0 || !Number.isInteger(Number(n))) {
        throw new Error("Факториал определен только для неотрицательных целых чисел.");
    }
    n = BigInt(n);
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    return typeof n === 'number' && n > 0 && (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
        throw new Error('Аргумент должен быть неотрицательным целым числом.');
    }
    return fibFastDoubling(BigInt(n))[0];
}

function fibFastDoubling(n) {
    if (n === 0n) {
        return [0n, 1n];
    }
    const [a, b] = fibFastDoubling(n / 2n);
    const c = a * (b * 2n - a);
    const d = a * a + b * b;
    if (n % 2n === 0n) {
        return [c, d];
    } else {
        return [d, c + d];
    }
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    if (initialValue === undefined) {
        throw new Error('initialValue должен быть задан.');
    }

    let storedValue = initialValue;

    if (typeof operatorFn !== 'function') {
        return function() {
            return initialValue;
        };
    }

    return function(newValue) {
        storedValue = operatorFn(storedValue, newValue);
        return storedValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    if (typeof start !== 'number' || typeof step !== 'number') {
        throw new Error('Параметры start и step должны быть числами.');
    }
    let current = start - step;
    return function() {
        current += step;
        return current;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if (typeof firstObject !== typeof secondObject) {
        return false;
    }

    if (firstObject === secondObject) {
        return true;
    }

    if (typeof firstObject === 'number' && Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true;
    }

    if (
        firstObject === null ||
        secondObject === null ||
        typeof firstObject !== 'object'
    ) {
        return false;
    }

    if (Object.getPrototypeOf(firstObject) !== Object.getPrototypeOf(secondObject)) {
        return false;
    }

    const keysFirst = Object.keys(firstObject);
    const keysSecond = Object.keys(secondObject);

    if (keysFirst.length !== keysSecond.length) {
        return false;
    }

    keysFirst.sort();
    keysSecond.sort();

    for (let i = 0; i < keysFirst.length; i++) {
        if (keysFirst[i] !== keysSecond[i]) {
            return false;
        }
    }

    for (let key of keysFirst) {
        if (!deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
