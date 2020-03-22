function eval() {
    // Do not use eval!!!
    return;
}


const priority = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
};

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function hasPairBrackets(str) {
    let first = 0;
    let second = 0;
    for (el of str) {
        if (el == '(') {
            first++;
            continue;
        }
        if (el == ')') {
            second++;
            if (second > first) {
                return false;
            }
        }
    }
    return first === second;
}

function expressionCalculator(expr) {
    reg = expr.trim().split(/(\d+|\+|\-|\*|\/|\(|\))\s*/g).filter(Boolean);
    if (!hasPairBrackets(expr)) {throw new Error("ExpressionError: Brackets must be paired");}
    let numbers = [];
    let operations = [];
    for (element of reg) {
        if (isNumber(element)) {
            numbers.push(parseFloat(element));
        }

        else if(element == '(') {
            operations.push(element);
            continue;
         }

        else if(element ==')') {
            while (operations[operations.length-1] != '(' && numbers.length > 1) {
                b = numbers.pop();
                a = numbers.pop();
                action = operations.pop();
                result = calculate(a, b, action);
                numbers.push(result);
            }
            operations.pop();
            continue;
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
            if (b === 0) throw new Error("TypeError: Division by zero.");
            return a / b;
    }
}


module.exports = {
      expressionCalculator
}
