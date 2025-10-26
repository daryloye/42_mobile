import { evaluate } from 'mathjs';

function getLastChar(str: string) {
  return (str === '') ? '' : str[str.length - 1];
};

function hasDecimalInLastNumber(str: string): boolean {
  for (var i = str.length - 1; i >= 0 && !isOperator(str[i]); --i) {
    if (str[i] === '.') return true;
  }
  return false;
}

function isNumber(str: string): boolean {
  return (!isNaN(Number(str)));
}

function isOperator(str: string): boolean {
  return (str === "+" || str === "-" || str === "x" || str === "/");
}

export function processInput(prev: string, input: string): string {
  const lastChar = getLastChar(prev);
  
  if (input === "AC") {
    return '';
  }
  if (input === 'C' && prev !== '') {
    return prev.substring(0, prev.length - 1);
  }
  if (input === '=' && isNumber(lastChar)) {
    return prev;
  }

  if (prev.length >= 25) {
    return prev;
  }
  if (isNumber(input)) {
    return prev + input;
  }
  if (input === '.' && prev !== '' && isNumber(lastChar) && !hasDecimalInLastNumber(prev)) {
    return prev + input;
  }
  if (input === '-' && lastChar !== '-') {
    return prev + input;
  }
  if ((input === '/' || input === 'x' || input === '+') && (isNumber(lastChar) || lastChar === '.')) {
    return prev + input;
  }
  return prev;
}


export function processResult(prev: string, input: string, setResult: React.Dispatch<React.SetStateAction<string>>): string {
  const lastChar = getLastChar(prev);

  if (input === 'AC') {
    setResult('');
  }
  if (input === '=' && isNumber(lastChar)) {
    setResult( evaluate(prev.replace(/x/g, '*')) );
  }
}