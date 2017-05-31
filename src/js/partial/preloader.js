import {PRELOADER, WIN} from '../_global.js';

let time = 500;
let speed = 600;

WIN.on('load', () => {
	setTimeout(function() {
		PRELOADER.delay(time).fadeOut(speed);
	}, 300);
});
