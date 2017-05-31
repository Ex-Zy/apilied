import {PRELOADER, WIN} from '../_global.js';

let time = 500;
let speed = 600;

WIN.on('load', () => {
	PRELOADER.delay(time)
			 .fadeOut(speed)
			 .find('.js-preloader-title')
			 .fadeIn(speed);
});
