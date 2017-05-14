import CalcView from './calcview/CalcView';
import Numpad from './Numpad';
import NumpadGroup from './NumpadGroup';
import Pages from './Pages';

const currentWindow = chrome.app.window.current();
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

$.each($('.buttons'), (i, buttons) => {
	new Numpad(buttons, currentWindow.innerBounds.height - 50 - 50, numpadGroup);
});

$('#topbar .close').click(() => {
	event.preventDefault();

	chrome.app.window.current().close();
});
