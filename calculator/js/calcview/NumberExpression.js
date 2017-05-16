import Expression from './Expression';

export default class NumberExpression extends Expression {
	constructor() {
		super();
		this._value = '1000000';
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param relative
	 */
	measure(canvas, relative = null) {
		super.measure(canvas, relative);

		this._pos.width += canvas.measureText(this._value).width;
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 */
	draw(canvas) {
		super.draw(canvas);

		canvas.fillText(this._value, 0, 0);
		canvas.translate(canvas.measureText(this._value).width, 0);
	}
}
