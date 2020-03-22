function eval() {
    // Do not use eval!!!
    return;
}


const priority = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
    'foo': 9999,
};

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

function expressionCalculator(expr) {
    reg = expr.split(/(\d+|\+|\-|\*|\/|\(|\))\s*/g).filter(Boolean);
    let numbers = [];
    let operations = [];
    for (element of reg) {
        if (isNumber(element)) {
            numbers.push(parseFloat(element));
        }
        else {
            if (priority[element] > priority[operations[operations.length - 1]] || operations.length == 0){
                operations.push(element);
                continue
            }  

            while (priority[element] <= priority[operations[operations.length - 1]])
              {
                b = numbers.pop();
                a = numbers.pop();
                action = operations.pop();
                result = calculate(a, b, action);
                numbers.push(result);
        }
        operations.push(element);
    }
}
    while (operations.length > 0) {
        b = numbers.pop();
        a = numbers.pop();
        action = operations.pop();
        result = calculate(a, b, action);
        numbers.push(result);
    }
    return numbers.pop();

}

function calculate(a, b, action) {
    switch(action) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b
    }
}


//console.log('test');
console.log(expressionCalculator('2*5/10 + 14 - 2*3-1/1'));
