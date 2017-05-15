import CalcView from './calcview/CalcView';
import Numpad from './Numpad';
import NumpadGroup from './NumpadGroup';
import Pages from './Pages';

const currentWindow = chrome && chrome.app && chrome.app.window ? chrome.app.window.current() : null;

const pages = new Pages('#pages');
const calcView = new CalcView($('.main-input').get(0));
const numpadGroup = new NumpadGroup({
	'': () => {}, // Empty
	'backspace': () => {},
	'stack-result': () => {},
	'panel': self => {
		$('.bottom-buttons').toggleClass('active').hasClass('active') ?
			self.addClass('down') :
			self.removeClass('down');
	}
});

function windowHeight() {
	if (currentWindow) {
		return currentWindow.innerBounds.height;
	} else {
		return $(window).height();
	}
}

$.each($('.buttons'), (i, buttons) => {
	let numpad = new Numpad(buttons, windowHeight() - 50 - 50, numpadGroup);
	$(window).resize(() => numpad.resize(windowHeight() - 50 - 50));
});

$('#topbar .close').click(event => {
	event.preventDefault();

	if (currentWindow) {
		currentWindow.close();
	}
}).on('contextmenu', event => event.preventDefault());

