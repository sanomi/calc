'use strict';

$(document).ready( function(){
	var $number = $('#number');
	var lastButtonPressed = "";
	var num1, num2, $amount, $operatorBtn, posInEq, answer, lastOpPressed;
	var decimalPressed = false;
	var opPressed = 0;
	$('.num').click(function() {
		$amount = $(this).text();
		if (opPressed > 1) {
			num1 = compParse(num1, lastOpPressed, num2);
			num2 = $amount;
		}
		if ($number.text() === '0') {
			$number.empty();
		}
		if (lastButtonPressed === 'op') {
				$number.text($amount);
				num2 = $amount;
				posInEq = '2';
			}
		if (lastButtonPressed === 'eq') {
			$number.text($amount);
			num1 = $number.text();
			posInEq = '1';
			}
		if (lastButtonPressed !== 'eq' && lastButtonPressed !== 'op') {
			if (decimalPressed) {
				$number.append($amount);
				if (posInEq === '1') {
					num1 = $number.text();
				} else {
					num2 = $number.text();
				}
			} 
			else {
			$number.append($amount);
			if (opPressed === 1) {
				num2 = $number.text();
				posInEq = '2';
			} else {
				num1 = $number.text();
				posInEq = '1';
				}	
			}		
		}	
	lastButtonPressed = 'num';
	})

	$('.op').click(function() {
		if (lastButtonPressed !== 'op') {
			lastOpPressed = $operatorBtn;
			$operatorBtn = $(this).text();
			lastButtonPressed = 'op';
			decimalPressed = false;
			opPressed += 1;
		} else {
			$operatorBtn = $(this).text();
			lastButtonPressed = 'op';
		}
	})

	$('.dec').click(function() {
		if (/\./.test($number.text()) !== true) {
			$amount = $number.text() + '.';
				$number.text($amount);
					if (posInEq === '1') {
						num1 = $amount;
					} else {
						num2 = $amount;
					}
			decimalPressed = true;
		}
	})

	$('.eq').click(function() {
		console.log(num1, $operatorBtn, num2);
		answer = compParse(num1, $operatorBtn, num2);
		$number.text(answer);
		num1 = answer;
		decimalPressed = false;
		opPressed = 0;
		lastButtonPressed = 'eq'
	})

	$('.special').click(function() {
		var btnText = $(this).text();
		if (btnText === 'AC') {
			$number.text(0);
			opPressed = 0;
			decimalPressed = false;
		}
		if (btnText ==='%') {
			$amount = $number.text();
			$amount = parseFloat($amount)/100;
			$number.text($amount.toFixed(12).replace(/\.0+$/, '').replace(/0*$/, ''));
				if (posInEq === '1') {
					num1 = $amount;
				} else {
					num2 = $amount;
				}
			}
		if (btnText === '+/-') {
				$amount = $number.text();
				$amount = parseFloat($amount) * -1;
				$number.text($amount);
				if (posInEq === '1') {
					num1 = $amount;
				} else {
					num2 = $amount;
				}
		}
	})

	var compParse = function(num1, $operatorBtn, num2) {
		num1 = parseFloat(num1);
	 	num2 = parseFloat(num2);
	  switch(true) {
	    case $operatorBtn === "*": answer = num1 * num2;break;
	    case $operatorBtn === "/": answer = num1 / num2;break;
	    case $operatorBtn === "+": answer = num1 + num2;break;
	    case $operatorBtn === "-": answer = num1 - num2;
	  }
	  if (answer !== 0) {
	  	answer = answer.toFixed(12).replace(/\.\d*0+$/, '');
	  }
	  return answer;
	}
	$(document).click(function() {
	console.log(num1, $operatorBtn, num2);
	})
});
