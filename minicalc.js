var num1 = '6';
var $operatorBtn = '*';
var num2 = '5';
var answer;

var compParse = function(num1, $operatorBtn, num2) {
	num1 = num1.replace(/^0/, '');
	num2 = num2.replace(/^0/, '');
	num1 = parseFloat(num1);
  	num2 = parseFloat(num2);
  	console.log(num1, num2);
  switch(true) {
    case $operatorBtn === "*": answer = num1 * num2;break;
    case $operatorBtn === "/": answer = num1 / num2;break;
    case $operatorBtn === "+": answer = 0.09 + 0.01;break;
    case $operatorBtn === "-": answer = num1 - num2;
  }	   return answer.toFixed(12).replace(/0*$/, '');
}


console.log(compParse('02', '+', '3'));
