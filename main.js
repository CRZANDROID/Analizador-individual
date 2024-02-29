import { separateElements, analyzeSyntax } from './analyzer.js';

const analyzeButton = document.getElementById('analyzeButton');
const msg = document.getElementById('mensaje');

analyzeButton.addEventListener('click', () => {
  const inputString = document.getElementById('text').value;
  const inputList = separateElements(inputString);
  const result = analyzeSyntax(inputList);

  if (result.success) {
    msg.innerText = `Gramatica correcta\n${result.history}`;
  } else {
    msg.innerText = `Error: ${result.message}\n${result.history}`;
  }
});