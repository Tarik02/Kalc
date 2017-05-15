import ChildableExpression from './ChildableExpression';

import NumberExpression from './NumberExpression';
import ScopeExpression from './ScopeExpression';
import RootExpression from './RootExpression';

export default class CalcView {
	constructor(canvas) {
		this._canvas = canvas;
		this._context = this._canvas.getContext('2d');

		$(this._canvas)
			.on('resize', this.handleResize.bind(this))
			.on('mouseup', this.handleMouseUp.bind(this));

		this.handleResize();


		this._beginX = this._beginY = 0;

		this._selected = null;
		this._root = new ScopeExpression();

		let c = new ScopeExpression();
		this._root._children.push(c);

		let n = new NumberExpression();
		n._value = '4564';
		c._children.push(n);

		n = new NumberExpression();
		n._value = '+';
		c._children.push(n);

		n = new NumberExpression();
		n._value = '45644';
		c._children.push(n);

		n = new NumberExpression();
		n._value = '+';
		this._root._children.push(n);

		n = new RootExpression();
		let r = new RootExpression();
		n.index(r);
		r = new RootExpression();
		n.radicand(r);
		this._root._children.push(n);
	}

	requestRepaint() {
		window.requestAnimationFrame(this._draw.bind(this), this._canvas);
	}

	handleResize() {
		this._canvas.width = $(this._canvas).width();
		this._canvas.height = $(this._canvas).height();
		this.requestRepaint();
	}

	/**
	 * @param {MouseEvent} event
	 */
	handleMouseUp(event) {
		const position = $(this._canvas).offset();
		const x = (event.clientX || event.pageX) - position.left;
		const y = (event.clientY || event.pageY) - position.top;

		if (this._selected)
			this._selected._selected = false;

		let exp = this.find({
			x: x - this._beginX,
			y: y - this._beginY
		});

		this._selected = exp;
		if (exp) {
			exp._selected = true;
			this.requestRepaint();
		}
	}

	_draw() {
		const canvas = this._canvas;
		const context = this._context;
		const width = canvas.width;
		const height = canvas.height;

		context.clearRect(0, 0, width, height);
		context.fillStyle = 'rgb(150, 150, 150)';
		context.strokeStyle = 'rgb(150, 150, 150)';
		context.lineWidth = 2;
		context.lineJoin = 'round';
		context.font = '25px monospace';
		context.textAlign = 'left';
		context.textBaseline = 'top';
		context.textBaseline = 'middle';

		this._root.measure(context);

		context.save();
		context.translate(this._beginX = width - this._root._pos.width - 10, this._beginY = height / 2);
		this._root.draw(context, true);
		context.restore();
	}

	/**
	 * @param {{x: number, y: number}} position
	 * @param {ChildableExpression?} parent
	 * @return Expression|null
	 */
	find(position, parent = null) {
		if (parent === null) {
			parent = this._root;
		}

		for (let child of parent.children()) {
			if (CalcView._in(position, child.position())) {
				if (child instanceof ChildableExpression) {
					return this.find(position, child);
				} else {
					return child;
				}
			}
		}

		return CalcView._in(position, parent.position()) ? parent : null;
	}

	static _in(position, box) {
		return position.x >= box.x && position.y >= box.y && position.x <= box.x + box.width && position.y <= box.y + box.height;
	}
}
