import Expression from './Expression';

export default class ChildableExpression extends Expression {
	constructor() {
		super();

		this._children = [];
		this._dynamicChildren = true;
	}

	_constChildren(...children) {
		this._children = children;
		this._dynamicChildren = false;
	}

	add(...children) {
		if (!this._dynamicChildren) {
			throw new Error('The expression have no dynamic children.');
		}

		for (let child of children) {
			if (!(child instanceof Expression))
				throw new TypeError('Child must be instance of Expression.');

			if (this._children.indexOf(child) === -1)
				this._children.push(child);
		}
	}

	remove(...children) {
		if (!this._dynamicChildren) {
			throw new Error('The expression have no dynamic children.');
		}

		for (let child of children) {
			let index = this._children.indexOf(child);
			if (index !== -1)
				this._children.splice(index, 1);
		}
	}

	children() {
		return this._children;
	}
}
