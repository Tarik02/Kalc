chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('calculator/calculator.html', {
		resizable: false,
		frame: {
			type: 'none'
		}, innerBounds: {
			width: 400,
			height: 495
		}
	});
});