let container = document.querySelector('.container');
let shipCon = document.querySelector('.container .ship');
let containerStyle = getComputedStyle(container)

class Bullet {
	constructor(x, y) {
		this.elem = document.createElement('span');
		this.elem.style.width = '5px';
		this.elem.style.height = '10px';
		this.elem.classList.add('bullet');
		this.elem.style.left = x + 'px';
		this.elem.style.top = y + 'px';
	}
}

class Ship {
	constructor(selector) {
		this.elem = document.querySelector(selector)
		this.margin = 0;
	}

	getRect() {
		return this.elem.getBoundingClientRect();
	}

	getStyle() {
		return this.elem.getComputedStyle = getComputedStyle(this.elem)
	}

	moveRight() {
		if ( toNum(this.getStyle().marginLeft) != toNum(containerStyle.width) - toNum(this.getStyle().width) ) {
			this.margin = this.margin + 5;
			this.elem.style.marginLeft  = this.margin + "px";
			return this.margin;
		}
	}

	moveLeft() {
		if ( toNum(this.getStyle().marginLeft) != 0 ) {
			this.margin = this.margin - 5;
			this.elem.style.marginLeft  = this.margin + "px";
			return this.margin;
		}
	}

}

class Shot {
	constructor(bullet, ship) {
		this.bullet = bullet;
	}

	getShot() {
		let that = this;
		shipCon.append(that.bullet.elem)

		let timerId = setTimeout(function tick() {
			console.dir(that.bullet)
			that.bullet.elem.style.top = toNum(that.bullet.elem.style.top) - 5 + 'px';
			console.dir(that.bullet.elem.style.top)

			if ( toNum(that.bullet.elem.style.top) < 5  ) {
				that.bullet.elem.remove();
				 clearTimeout(timerId);
			} else {
				timerId = setTimeout(tick, 2); // (*)				
			}

			// if (macroCollision(bullet.elem.getBoundingClientRect(), gameAlien.getBoundingClientRect())) {
			// 	debug()
			// 	bullet.elem.remove();
			// 	gameAlien.remove();

			// 	imgAnimate.style.position = 'fixed';
			// 	imgAnimate.style.left = gameAlien.style.left;
			// 	imgAnimate.style.top = gameAlien.style.top;

			// 	let timerBang = setTimeout(function() {
			// 		imgAnimate.remove();
			// 	}, 800)

			// 	container.append(imgAnimate)

			// 	console.dir(gameAlien.style.left)

			// 	bangSound.play();
			// 	bangSound.currentTime = 0;

			// 	gameAlien = createAlien();
			// }

					
			
		}, 2);
	}

	// let timerId = setTimeout(function tick() {
	// 	console.dir(bullet)
	// 	bullet.elem.style.top = toNum(bullet.elem.style.top) - 5 + 'px';

	// 	if (macroCollision(bullet.elem.getBoundingClientRect(), gameAlien.getBoundingClientRect())) {
	// 		debug()
	// 		bullet.elem.remove();
	// 		gameAlien.remove();

	// 		imgAnimate.style.position = 'fixed';
	// 		imgAnimate.style.left = gameAlien.style.left;
	// 		imgAnimate.style.top = gameAlien.style.top;

	// 		let timerBang = setTimeout(function() {
	// 			imgAnimate.remove();
	// 		}, 800)

	// 		container.append(imgAnimate)

	// 		console.dir(gameAlien.style.left)

	// 		bangSound.play();
	// 		bangSound.currentTime = 0;

	// 		gameAlien = createAlien();
	// 	}

	// 	if ( toNum(bullet.elem.style.top) < 5 || macroCollision(bullet.elem.getBoundingClientRect(), gameAlien.getBoundingClientRect()) ) {
	// 		bullet.elem.remove();
	// 		 clearTimeout(timerId);
	// 	} else {
	// 		timerId = setTimeout(tick, 2); // (*)				
	// 	}
	// }, 2);
}



let ship = new Ship('.ship img')

document.addEventListener('keydown', function() {

	if (event.code == 'ArrowRight') {
		ship.moveRight();
	}

	if (event.code == 'ArrowLeft') {
		ship.moveLeft();
	}

	if (event.code == 'Space') {
		shot = new Shot(new Bullet(ship.getRect().x - ship.getStyle().width / 4, ship.getRect().y));
		shot.getShot();
		console.dir(shot.bullet.elem.style.top)
	}

})

function toNum(num) {
	return +num.replace(/[^0-9]/g, '')
}