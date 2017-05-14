export default class Expression {
	constructor() {
		this._pos = {x: 0, y: 0, width: 0};
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param relative
	 */
	measure(canvas, relative) {
		if (relative) {
			this._pos = relative;
		} else {
			this._pos = {x: 0, y: 0, width: 0};
		}
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 */
	draw(canvas) {
		/*canvas.restore();
		canvas.save();
		canvas.translate(this._pos.x, this._pos.y);*/
	}
}
