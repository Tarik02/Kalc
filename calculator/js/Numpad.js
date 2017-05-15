export default class Numpad {
	constructor(element, height, group) {
		this._height = height;
		this._element = element = $(element);
		this._group = group;

		this.resize();

		if (this._group) {
			this._group.add(this);

			let $buttons = this._element.find('.button');
			$buttons.on('contextmenu', event => event.preventDefault());
			$.each($buttons, (i, button) => {
				let $button = $(button);
				let buttonName = '';

				if (button.id.substr(0, 7) === 'button-') {
					buttonName = button.id.substr(7);
				}

				$button.click(((handler, button) => {
					event.preventDefault();
					handler(button);
				}).bind(null, this._clickButton.bind(this, buttonName), $button));
			});
		}
	}

	resize(numpadHeight) {
		this._height = numpadHeight || this._height;
		let height = this._height / 5;

		let $buttons = this._element.find('tbody');
		let rows = $buttons.children();
		let size = $buttons.parent().width() / 5;
		$buttons.parent().css('height', (rows.length * height) + 'px');
		$.each(rows, (i, row) => {
			let $row = $(row);
			let buttons = $row.children();

			buttons.css({
				'width': size + 'px',
				'height': height + 'px',
				'line-height': height + 'px'
			}).each((i, button) => {
				$(button).find('a>span').css({
					'height': height + 'px'
				});
			});
		});
	}

	_clickButton(name, ...args) {
		(this._group._buttons[name] || this._group._buttons[''])(...args);
	}
}
