import KeyRegistry from './KeyRegistry';

export default class NumpadGroup {
	constructor(buttons) {
		this._buttons = buttons;
		this._numpads = [];
		this._keyHandlers = {};

		function formatKey(event) {
			let key = event.which;
			if (event.shiftKey) {
				key |= 0b100000000;
			}

			return key;
		}

		$(window).on('keydown', event => {
			event.preventDefault();

			let handler = this._keyHandlers[formatKey(event)];
			if (handler) {
				handler.addClass('active');
			}
		}).on('keyup', event => {
			event.preventDefault();

			let handler = this._keyHandlers[formatKey(event)];
			if (handler) {
				handler.removeClass('active');
				handler.click();
			}
		});
	}

	add(numpad) {
		if (this._numpads.indexOf(numpad) === -1) {
			this._numpads.push(numpad);

			numpad._element.find('[data-key]').each((i, handler) => {
				let $handler = $(handler);
				let dataKey = $handler.attr('data-key');

				dataKey.split(',').forEach(item => {
					let modifiers = item.split(':');
					let key = KeyRegistry.getKeyByName(modifiers.pop());
					if (key === -1) {
						console.warn(`Key '${key}' does not exists.`);
						return;
					}

					key &= 0b11111111;
					if (modifiers.indexOf('SHIFT') !== -1) {
						key |= 0b100000000;
					}

					this._keyHandlers[key] = $handler;
				});
			});
		}
	}

	getButtons() {
		return this._buttons;
	}
}
