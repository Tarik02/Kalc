export default class Expression {
	constructor() {
		this._selected = false;
		this._pos = {x: 0, y: 0, width: 0, height: 0};
	}

	/**
	 * @return {{x: number, y: number, width: number, height: number}|*}
	 */
	position() {
		return this._pos;
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param relative
	 */
	measure(canvas, relative) {
		if (relative) {
			this._pos = relative;
		} else {
			this._pos = {x: 0, y: 0, width: 0, height: 25};
		}

		canvas.font = this._pos.height + 'px monospace';
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 */
	draw(canvas) {
		canvas.font = this._pos.height + 'px monospace';

		if (this._selected) {
			canvas.save();
			canvas.translate(0, -this._pos.height / 2);
			canvas.strokeRect(-2, -2, this._pos.width + 4, this._pos.height + 4);
			canvas.restore();
		}
	}
}
