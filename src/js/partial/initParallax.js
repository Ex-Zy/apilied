import {WIN_WIDTH, WIN_HEIGHT, isTouch} from '../_global.js'

var showParallax = (moveForce, rotateForce) => {
	if(!isTouch()) {
		$('.js-parallax-section').mousemove((e) => {
			
			var moveX = (e.pageX - WIN_WIDTH/2) / (WIN_WIDTH/2) * -moveForce;
			var moveY = (e.pageY - WIN_HEIGHT/2) / (WIN_HEIGHT/2) * -moveForce;
			
			var rotateY = (e.pageX / WIN_WIDTH * rotateForce*2) - rotateForce;
			var rotateX = -((e.pageY / WIN_HEIGHT * rotateForce*2) - rotateForce);
		
			$('.js-parallax-bg').css({
				'left': moveX+'px',
				'top': moveY+'px',
				'transform': 'rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)'
			});

			$('.js-parallax-company').css({
				'right': (moveX * 3) +'px',
				'bottom': (moveY * 3)+'px'
			});

		});
	}
}

showParallax(5, 2);