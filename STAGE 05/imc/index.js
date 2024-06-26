import { cardResult } from "./card.js";
import { imc, isNaNError, emptyError} from "./functions.js"

export const inputWeight = document.querySelector('#weight');
export const inputHeight = document.querySelector('#height');
const form = document.querySelector('form');
const msgError = document.querySelector('.msg-error');

inputWeight.oninput = () => msgError.classList.remove('appear')
inputHeight.oninput = () => msgError.classList.remove('appear')
form.onsubmit = (event) => {
  event.preventDefault()

  const weight = inputWeight.value
  const height = inputHeight.value
  
  const valueIsNaN = isNaNError(weight) || isNaNError(height)
  const valueEmpty = emptyError(weight) || emptyError(height)

  if (valueIsNaN) {
    msgError.innerText = 'Digite apenas números'
    msgError.classList.add('appear')
    inputWeight.value = ""
    inputHeight.value = ""
    return;
  }

  if (valueEmpty) {
    msgError.innerText = 'Digite os dois valores'
    msgError.classList.add('appear')
    return;
  }

  const imcCalc = imc(weight, height)

  result(imcCalc)
}

function result(imcCalc) {
  if (imcCalc < 18.6) {
    var situation = "BAIXO PESO";
  } else if (imcCalc >= 18.6 && imcCalc <= 24.9) {
    situation = "PESO NORMAL";
  } else if (imcCalc >= 25 && imcCalc <= 29.9) {
    situation = "SOBREPESO";
  } else if (imcCalc >= 30 && imcCalc <= 34.9) {
    situation = "OBESIDADE GRAU I";
  } else if (imcCalc >= 35 && imcCalc <= 39.9) {
    situation = "OBESIDADE GRAU II";
  } else {
    situation = "OBESIDADE GRAU III";
  }

  const message = `seu IMC é de ${imcCalc}, logo está com ${situation}`

  cardResult.text.innerText = message

  cardResult.open()
}