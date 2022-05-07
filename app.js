const display = document.querySelector("[data-name=display]")
const calculator = document.querySelector("[data-name=calculator]")

let number = 0
let previousNumber = 0
let operatorWasPressed = false
let lastOperator = '+'

const operations = {
  '+': (number1, number2) => number1 + number2,
  '-': (number1, number2) => number1 - number2,
  '*': (number1, number2) => number1 * number2,
  '/': (number1, number2) => number1 / number2
}

const realizeOperation = () => {
  previousNumber = operations[lastOperator](previousNumber, number)
  display.value = previousNumber
  operatorWasPressed = true
}

const keyDownEvent = event => {
  const key = event.key || event.target.dataset.key
  display.focus()

  if (!key) { return }

  if (!isNaN(key)) {
    if (operatorWasPressed) {
      number = Number(key)
      operatorWasPressed = false
    }
    else {
      number = Number(`${number}${key}`)
    }
    display.value = number
    return
  }

  switch (key) {
    case 'Escape': {
      number = 0
      previousNumber = 0
      lastOperator = '+'
      display.value = number
      break
    }
    case '+': case '-': case '*': case "/": {
      if (operatorWasPressed) {
        lastOperator = key
        break
      }
      realizeOperation()
      lastOperator = key
      break
    }
    case 'Enter':
    case '=': {
      realizeOperation()
      break
    }
    case 'Delete': {
      number = 0
      display.value = number
    }
    case '+/-': {
      if (operatorWasPressed) {
        previousNumber *= -1
        display.value = previousNumber
        break
      }
      number *= -1
      display.value = number
      break
    }
  }
}

calculator.addEventListener('click', keyDownEvent)
calculator.addEventListener('keydown', keyDownEvent)
