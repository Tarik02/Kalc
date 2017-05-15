import ChildableExpression from './ChildableExpression';
import NumberExpression from './NumberExpression';

export default class RootExpression extends ChildableExpression {
	constructor() {
		super();

		this._constChildren(
			new NumberExpression('1'),
			new NumberExpression('2')
		);
	}

	radicand(value = null) {
		return this._child(0, value);
	}

	index(value = null) {
		return this._child(1, value);
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param relative
	 */
	measure(canvas, relative) {
		super.measure(canvas, relative);

		const scale = this._pos.height / 25;
		const radicand = this.radicand();
		const index = this.index();

		index.measure(canvas, {x: this._pos.x + 2, y: this._pos.y, width: 0, height: this._pos.height / 2});
		this._pos.width += 2 * scale + index.position().width + 12 * scale;
		radicand.measure(canvas, {x: this._pos.x + this._pos.width, y: this._pos.y + 2, width: 0, height: this._pos.height - 2});
		this._pos.width += radicand.position().width + 4 * scale;
	}

	/**
	 * @param {CanvasRenderingContext2D} canvas
	 * @param {Boolean?} root
	 */
	draw(canvas, root) {
		super.draw(canvas);

		const scale = this._pos.height / 25;
		const radicand = this.radicand();
		const index = this.index();

		canvas.save();
		canvas.scale(scale, scale);
		canvas.beginPath();
		canvas.moveTo(0, 0);
		canvas.save();
		canvas.translate(2 + index.position().width / scale, 0);
		canvas.lineTo(3, 0);
		canvas.lineTo(10, 14);
		canvas.lineTo(17, -14);
		canvas.restore();
		canvas.lineTo(this._pos.width / scale, -14);
		canvas.stroke();
		canvas.closePath();
		canvas.restore();

		canvas.save();
		canvas.translate(2 * scale, -this._pos.height / 3.5);
		index.draw(canvas);
		canvas.restore();

		canvas.save();
		canvas.translate(2 * scale + index.position().width + 16 * scale, 2);
		radicand.draw(canvas, true);
		canvas.restore();
	}
}
