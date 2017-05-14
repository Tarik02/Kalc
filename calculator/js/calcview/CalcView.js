import NumberExpression from './NumberExpression';
import ScopeExpression from './ScopeExpression';

export default class CalcView {
	constructor(canvas) {
		this._canvas = canvas;
		this._context = this._canvas.getContext('2d');

		$(this._canvas).on('resize', this.handleResize.bind(this));
		this.handleResize();

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

		n = new NumberExpression();
		n._value = '45644';
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

	_draw() {
		const canvas = this._canvas;
		const context = this._context;
		const width = canvas.width;
		const height = canvas.height;

		context.clearRect(0, 0, width, height);
		context.fillStyle = 'rgb(150, 150, 150)';
		context.strokeStyle = 'rgb(150, 150, 150)';
		context.font = '25px monospace';
		context.textAlign = 'left';
		context.textBaseline = 'middle';

		this._root.measure(context);

		context.save();
		context.translate(width - this._root._pos.width - 10, height / 2);
		this._root.draw(context, true);
		context.restore();
	}
}
