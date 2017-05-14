import Expression from './Expression';

export default class ScopeExpression extends Expression {
	constructor() {
		super();
		this._children = [];
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param relative
	 */
	measure(canvas, relative) {
		super.measure(canvas, relative);

		if (relative) {
			this._pos.width += canvas.measureText('(').width;
		}

		for (let child of this._children) {
			child.measure(canvas, {x: this._pos.x + this._pos.width, y: this._pos.y, width: 0});
			this._pos.width += child._pos.width;
		}

		if (relative) {
			this._pos.width += canvas.measureText(')').width;
		}
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param {Boolean?} root
	 */
	draw(canvas, root) {
		super.draw(canvas);

		if (!root) {
			canvas.fillText('(', 0, 0);
			canvas.translate(canvas.measureText('(').width, 0);
		}

		for (let child of this._children)
			child.draw(canvas);

		if (!root) {
			canvas.fillText(')', 0, 0);
			canvas.translate(canvas.measureText(')').width, 0);
		}
	}
}
