export default class Pages {
	constructor(parent) {
		this._parent = parent = $(parent);

		this.showPage('main');
	}

	showPage(name) {
		this._parent.children().removeClass('active');
		this._parent.find('#' + name).addClass('active');
	}
}
