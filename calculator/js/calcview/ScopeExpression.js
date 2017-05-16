import ChildableExpression from './ChildableExpression';

export default class ScopeExpression extends ChildableExpression {
	constructor() {
		super();
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param relative
	 * @param {Boolean} root
	 */
	measure(canvas, relative = null, root = false) {
		super.measure(canvas, relative);

		if (!root) {
			this._pos.width += canvas.measureText('(').width;
		}

		for (let child of this._children) {
			child.measure(canvas, {x: this._pos.x + this._pos.width, y: this._pos.y, width: 0, height: this._pos.height});
			this._pos.width += child._pos.width;
		}

		if (!root) {
			this._pos.width += canvas.measureText(')').width;
		}
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param {Boolean} root
	 */
	draw(canvas, root = false) {
		super.draw(canvas);

		if (!root) {
			canvas.fillText('(', 0, 0);
			canvas.translate(canvas.measureText('(').width, 0);
		}

		for (let child of this._children) {
			child.draw(canvas);
		}

		if (!root) {
			canvas.fillText(')', 0, 0);
			canvas.translate(canvas.measureText(')').width, 0);
		}
	}
}
