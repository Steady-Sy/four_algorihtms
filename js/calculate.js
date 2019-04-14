var globalOperate = ['+', '-', '*', '÷'];
//生成随机数x,y和一个操作符
function num() {
	return Math.floor(Math.random() * 10 + 1);
}
/**
 * 生成表达式
 * @returns {string}
 */
function crateExpression() {
	var num1 = num();
	var num2 = num();
	var op1 = Math.floor(Math.random() * 4 + 1);
	var ops = ["+", "-", "*", "÷"];
	var str = num1 + ops[op1 - 1] + num2;

	//生成完整的三项式
	var num3;
	var op2 = Math.floor(Math.random() * 4 + 1);
	num3 = num();
	str = str + ops[op2 - 1] + num3;
	return str;
}

function getRPN(text) {
	var operand = [], //用于存放操作数的栈
		operator = [], //用于存放操作符的栈
		textArr = text.split(''),
		newTextArr = [];
	calTextArr = []; //用于存放操作数与操作符分割后的数组
	for (var i = 0; i < textArr.length; i++) {
		if (!Number(text[i]) && Number(text[i]) != 0) {
			newTextArr.push("|", text[i], "|");
		} else {
			newTextArr.push(textArr[i]);
		}
	}
	var calTextArr = newTextArr.join('').split("|");
	calTextArr.unshift("#")

	for (var i = 0; i < calTextArr.length; i++) {
		//如果是数字则直接入栈
		if (Number(calTextArr[i]) || Number(calTextArr[i]) == 0) {
			operand.push(calTextArr[i]);
		}
		//如果是操作符则再根据不同的情况进行操作
		else {
			switch (true) {
				//如果operator栈顶是“（”或者遍历到的操作符是“（”则直接入栈
				case calTextArr[i] == "(" && operator.slice(-1)[0] == "(":
					operator.push(calTextArr[i]);
					break;

					/*如果遍历到的操作符是“）”则把operator中的操作符依次弹出并压入
					 operand中直至operator栈顶操作符为“（”，然后将“（”也弹出，但不压入
					 operand栈中
					 */
				case calTextArr[i] == ")":
					do {
						operand.push(operator.pop());
					} while (operator.slice(-1)[0] != "(");
					operator.pop();
					break;

					//如果是其他的操作符，则比较优先级后再进行操作
				default:
					var compare = compareOperator(calTextArr[i], operator.slice(-1)[0]);
					var a = calTextArr[i];
					var b = operator.slice(-1)[0]
					if (operator.length == 0) {
						operator.push(calTextArr[i]);
					} else if (compareOperator(calTextArr[i], operator.slice(-1)[0])) {
						do {
							operand.push(operator.pop());
							var compareResult = compareOperator(calTextArr[i], operator.slice(-1)[0]);
						} while (compareResult);
						operator.push(calTextArr[i]);
					} else {
						operator.push(calTextArr[i]);
					}
					break;
			}
		}
	}
	//遍历结束后，将operator中的元素全部压入operand中
	operator.forEach(function() {
		operand.push(operator.pop());
	});
	//把用于比较的“#”字符去掉
	operator.pop();
	return operand;
}
/**
 * 比较两个运算符的优先级
 * @param {Object} a
 * @param {Object} b
 */
function compareOperator(a, b) {
	var aLevel = getOperatorRand(a),
		bLevel = getOperatorRand(b);

	if (aLevel <= bLevel) {
		return true;
	} else if (aLevel > bLevel) {
		return false;
	}
}

/**
 * 将操作符的优先级用数字具体化
 * @param {Object} operator
 */
function getOperatorRand(operator) {
	switch (operator) {
		case "#":
			return 0;
		case "+":
			return 1;
			break;
		case "-":
			return 1;
			break;
		case "*":
			return 2;
			break;
		case '÷':
			return 2;
			break;
	}
}
/**
 * 对后缀表达式进行计算，通过栈来计算
 * @param endStr
 * @returns {String}
 */
function calculate(endStr) {
	var length = endStr.length;
	var stack = new Array();
	var num1, num2;
	for (var i = 0; i < length; i++) {
		var key = endStr[i];
		/*if(key == '/' || key == '÷'){//涉及到分数和除号，直接用分数处理
		    return fractionCul(endStr);
		}*/
		var result = globalOperate.indexOf(key); //判断该符号存不存在全局操作数组中
		if (result === -1) { //不是操作符，那就是数组
			stack.push(key);
		} else { //操作数的情况，直接出栈，在进行加减
			return fractionCul(endStr);
			/*num1 = stack.pop();
			num2 = stack.pop();
			stack.push(simpleCal(num2,num1,key));*/
		}
	}

	if (stack.length === 1) {
		return stack.pop(); //返回结果
	}

}

/**
 * 计算两个分数的情况
 * @param endStr
 * @returns {string}
 */
function fractionCul(endStr) {
	var length = endStr.length,
		stack = new Array(),
		num1, num2, object1, object2;
	for (var i = 0; i < length; i++) {
		var key = endStr[i];
		if (globalOperate.indexOf(key) !== -1) { //是操作符的情况
			switch (key) {
				case '+':
					object1 = stack.pop(); //出栈
					object2 = stack.pop();
					if (object1 instanceof Fraction) { //如果是分数
						if (object2 instanceof Fraction) { //是分数
							stack.push(object2.add(object1)); //栈底的减去栈顶的元素，先进后出
						} else {
							num1 = Number(object2);
							stack.push(new Fraction(num1).add(object1));
						}
					} else {
						if (object2 instanceof Fraction) {
							num1 = Number(object1);
							stack.push(object2.add(new Fraction(num1)));
						} else {
							num1 = Number(object1);
							num2 = Number(object2);
							stack.push(new Fraction(num2).add(new Fraction(num1)))
						}
					}
					break;
				case '-':
					object1 = stack.pop();
					object2 = stack.pop();
					if (object1 instanceof Fraction) {
						if (object2 instanceof Fraction) {
							stack.push(object2.sub(object1));
						} else {
							num1 = Number(object2);
							stack.push(new Fraction(num1).sub(object1));
						}
					} else {
						if (object2 instanceof Fraction) {
							num1 = Number(object1);
							stack.push(object2.sub(new Fraction(num1)));
						} else {
							num1 = Number(object1);
							num2 = Number(object2);
							stack.push(new Fraction(num2).sub(new Fraction(num1)))
						}
					}
					break;
				case '*':
					object1 = stack.pop();
					object2 = stack.pop();
					if (object1 instanceof Fraction) {
						if (object2 instanceof Fraction) {
							stack.push(object2.mul(object1));
						} else {
							num1 = Number(object2);
							stack.push(new Fraction(num1).mul(object1));
						}
					} else {
						if (object2 instanceof Fraction) {
							num1 = Number(object1);
							stack.push(object2.mul(new Fraction(num1)));
						} else {
							num1 = Number(object1);
							num2 = Number(object2);
							stack.push(new Fraction(num2).mul(new Fraction(num1)))
						}
					}
					break;
				case '÷':
					object1 = stack.pop();
					object2 = stack.pop();
					if (object1 instanceof Fraction) {
						if (object2 instanceof Fraction) {
							stack.push(object2.div(object1));
						} else {
							num1 = Number(object2);
							stack.push(new Fraction(num1).div(object1));
						}
					} else {
						if (object2 instanceof Fraction) {
							num1 = Number(object1);
							stack.push(object2.div(new Fraction(num1)));
						} else {
							num1 = Number(object1);
							num2 = Number(object2);
							stack.push(new Fraction(num2).div(new Fraction(num1)))
						}
					}
					break;
			}
		} else { //操作数直接进栈
			stack.push(key);
		}
	}
	var fraction = stack.pop();
	return fraction.getResult();
}
