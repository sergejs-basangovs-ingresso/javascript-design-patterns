// write function that will lex the input string value into tokens array
const TokenType = Object.freeze({
	integer: 0, // 0,2,3,4,5,6...
	plus: 1, // +
	minus: 2, // -
	lparen: 3, // (
	rparen: 4, // )
});

class Token {
	constructor(type, text) {
		this.type = type;
		this.text = text;
	}

	toString() {
		return `\`${this.text}\``;
	}
}

class Integer {
	constructor(value) {
		this.value = value;
	}
}

const Operation = Object.freeze({
	addition: 0,
	subtraction: 1,
});

class BinaryOperation {
	constructor() {
		this.type = null; // type of operation ( + or - in our case)
		this.left = null; // left operand ( a+b , left operand is a)
		this.right = null; // right operand ( a+b , right operand is b)
	}

	get value() {
		const left = this.left.value; // recursive !
		const right = this.right.value; // recursive !

		switch (this.type) {
			case Operation.addition:
				return left + right;
			case Operation.subtraction:
				return left - right;
			default:
				return 0;
		}
	}
}

function lex(input) {
	const result = [];

	for (let i = 0; i < input.length; i++) {
		switch (input[i]) {
			case "+":
				result.push(new Token(TokenType.plus, "+"));
				break;
			case "-":
				result.push(new Token(TokenType.minus, "-"));
				break;
			case "(":
				result.push(new Token(TokenType.lparen, "("));
				break;
			case ")":
				result.push(new Token(TokenType.rparen, ")"));
				break;
			default:
				const buffer = [input[i]];
				for (let j = i + 1; j < input.length; ++j) {
					if ("1234567890".includes(input[j])) {
						buffer.push(input[j]);
						++i;
					} else {
						result.push(
							new Token(TokenType.integer, buffer.join(""))
						);
						break;
					}
				}
				break;
		}
	}

	return result;
}

function parse(tokens) {
	const result = new BinaryOperation();
	let haveLHS = false;

	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i];

		switch (token.type) {
			case TokenType.integer:
				const integer = new Integer(parseInt(token.text));
				if (!haveLHS) {
					result.left = integer;
					haveLHS = true;
				} else {
					result.right = integer;
				}
				break;
			case TokenType.plus:
				result.type = Operation.addition;
				break;
			case TokenType.minus:
				result.type = Operation.subtraction;
				break;
			case TokenType.lparen:
				//here the idea is to find the length of sub-expression between '(' and ')',
				//then recursively parse this sub-expression
				let j = i; // found '('
				for (; j < tokens.length; j++) {
					//here we find the length of subExpression, counting characters from '(' to ')'
					if (tokens[j].type === TokenType.rparen) break; // found ')' ! Now the outer variable j = subExpression length
				}
				// process subexpression
				const subExpression = tokens.slice(i + 1, j);
				const element = parse(subExpression);

				if (!haveLHS) {
					result.left = element;
					haveLHS = true;
				} else result.right = element;
				i = j; // advance

				break;
		}
	}
	return result;
}
const input = "(13+4)-(12+1)";
const tokens = lex(input);
const parsed = parse(tokens);

console.log(`${input} = ${parsed.value}`);
