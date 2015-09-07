$(document).ready( function(){
	var lastButtonPushed;
	var currentFunction = '';
	var $number = $('#number');
	$('.num').click(function() {
		var $amount = $(this).text();
		currentFunction += $amount;
		var isNum = /^\d+\.?[\d+]?$/.test(currentFunction);
		console.log(currentFunction);
		if ($amount === '.' && !isNum) {
			$number.append($amount);
		}
		if (isNum && /\=/.test(currentFunction)) {
			$number.append($amount);
		} 
		if(/\=/.test(currentFunction)) {
			currentFunction = ''
		} else {
			$number.text($amount);
		}
		lastButtonPushed = 'num';
	})

	$('.dec').click(function() {
		if (lastButtonPushed != 'dec') {
			var $amount = $(this).text();
			currentFunction += $amount;
			var isNum = /^\d+\.?[\d+]?$/.test(currentFunction);
			console.log(currentFunction);
			if ($amount === '.' && !isNum) {
				$number.append($amount);
			}
			if (isNum && /\=/.test(currentFunction)) {
				$number.append($amount);
			} 
			if(/\=/.test(currentFunction)) {
				currentFunction = ''
			} else {
				$number.text($amount);
			}
		}	
		lastButtonPushed = 'dec';
	})

$('.op').click(function() {
	if (lastButtonPushed ==='op') {
		currentFunction = currentFunction.substring(0, currentFunction.length - 1);
	} 
	var $operatorBtn = $(this).text();
	currentFunction += $operatorBtn;
	console.log(currentFunction);
	if ($operatorBtn === '=') {
	$answer = compParse(currentFunction);
	$number.text($answer);
	currentFunction = $answer;
	}
	lastButtonPushed = 'op';
	
})

	$('.special').click(function() {
		var btnText = $(this).text();
		if (btnText === 'AC') {
			$number.empty();
		}
		if (btnText ==='%') {
			currentFunction = currentFunction.substring(0, currentFunction.length - 1);
			var div = parseFloat($number.text()/100);
			currentFunction += div;
			$number.text(div);
		}
		if (btnText === '+/-') {
			currentFunction = currentFunction.substring(0, currentFunction.length - 2);
			var signSwitch = parseFloat($number.text()) * -1 ;
			currentFunction += signSwitch;
			$number.text(signSwitch);
		}
		lastButtonPushed = 'special';
	})

	function compParse(string) {
	  var answer;
	  var functional = ['\\*','\\/','\\+','\\-'];
	  functional.forEach(function(element, index, arr) {
	    var mathVal = arr[index];
	    var funFinder = new RegExp('(\-)*(\\d+\\.)*\\d+' + mathVal + '(\-)*\\d+(\\.\\d+)*');
	    while (string.match(funFinder)) {
	      var finder = string.match(funFinder);
	      var eq = finder[0];
	      var num1Finder = new RegExp('(\-)*(\\d+\\.)*\\d+\\b');
	      var num1 = eq.match(num1Finder)[0];
	      var num2Finder = new RegExp(mathVal + '\\d+(\\.\\d+)*(\-)*');
	      var singleFun = mathVal.replace('\\', '');
	      var num2 = eq.match(num2Finder)[0].replace(singleFun, '');
	      switch(true) {
	        case singleFun === "*": answer = parseFloat(num1) * parseFloat(num2);break;
	        case singleFun === "/": answer = parseFloat(num1) / parseFloat(num2);break;
	        case singleFun === "+": answer = parseFloat(num1) + parseFloat(num2);break;
	        case singleFun === "-": answer = parseFloat(num1) - parseFloat(num2);
	      }
	      string = string.replace(funFinder, answer).replace(/\=/, '');
	    }
	  })
	string = string.substring(0, string.length - 1);
	return string
	}

})
