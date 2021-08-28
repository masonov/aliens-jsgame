let container = document.querySelector('.container');
let shipCon = document.querySelector('.container .ship');
let containerStyle = getComputedStyle(container)
let shotSound = new Audio('audio/shot.mp3');
let bangSound = new Audio('audio/bang.mp3');
let imgAnimate = new Image();
imgAnimate.src = "images/bang-animation.gif";
imgAnimate.style.width = '100px';

let result = document.querySelector('.result span');


class Ship {
	constructor(src) {
		this.elem = new Image();
		this.elem.src = src;
		this.margin = 0;
	}

	appendIn(selector) {
		let container = document.querySelector(selector);
		container.append(this.elem);
	}

	getRect() {
		return this.elem.getBoundingClientRect();
	}

	getStyle() {
		return this.elem.getComputedStyle = getComputedStyle(this.elem)
	}

	moveRight() {
		if ( toNum(this.getStyle().marginLeft) != toNum(containerStyle.width) - toNum(this.getStyle().width) ) {
			this.margin = this.margin + 20;
			this.elem.style.marginLeft  = this.margin + "px";
			return this.margin;
		}
	}

	moveLeft() {
		if ( toNum(this.getStyle().marginLeft) != 0 ) {
			this.margin = this.margin - 20;
			this.elem.style.marginLeft  = this.margin + "px";
			return this.margin;
		}
	}

}

class AlienShip extends Ship {
	constructor(src) {
		super(src);
		this.elem.style.width = '100px';
		this.elem.style.position = 'fixed';
		this.elem.style.left = randomInteger(container.getBoundingClientRect().x, 
			container.getBoundingClientRect().x + container.getBoundingClientRect().width 
			- toNum(this.elem.style.width)) + 'px';
		this.elem.style.top = '-90px';
	}

	moveDown() {
		let that = this;
		let counter = -90

		let timerId = setTimeout(function tick() {
			counter++;
			that.elem.style.top = counter + 'px';
			// console.dir(toNum(that.elem.style.top) + 1)

			if ( toNum(that.elem.style.top) > toNum(containerStyle.height)  ) {
				that.elem.remove();
				clearTimeout(timerId);
			} else {
				timerId = setTimeout(tick, 10);		
			}
		}, 10);
	}
}

class Bullet {
	constructor(x, y) {
		this.elem = document.createElement('span');
		this.elem.style.width = '5px';
		this.elem.style.height = '10px';
		this.elem.classList.add('bullet');
		this.elem.style.left = x + 'px';
		this.elem.style.top = y + 'px';
	}

	getRect() {
		return this.elem.getBoundingClientRect();
	}
}

let ship = new Ship('images/ship.png');
ship.appendIn('.ship')

let alienShip = new AlienShip('images/alienShip2.png');
alienShip.appendIn('.container');
alienShip.moveDown();

let shotCounter = 0;

class Shot {
	constructor(bullet, ship, alienShip) {

		this.bullet = bullet;
		this.alienShip = alienShip;
		this
	}

	getShot() {
		let that = this;
		shipCon.append(that.bullet.elem)

		shotSound.play();
		shotSound.currentTime = 0;

		let timerId = setTimeout(function tick() {
			that.bullet.elem.style.top = toNum(that.bullet.elem.style.top) - 5 + 'px';

			if ( macroCollision(that.bullet.getRect(), that.alienShip.getRect()) ) {
				that.alienShip.elem.remove();

				bangSound.play();
				bangSound.currentTime = 0;

				result.innerHTML = ++shotCounter;

				console.dir(that.alienShip.getRect())
				container.append(imgAnimate)

				imgAnimate.style.position = 'fixed';
				imgAnimate.style.left = that.alienShip.elem.style.left;
				imgAnimate.style.top = that.alienShip.elem.style.top;


				let timerBang = setTimeout(function() {
					imgAnimate.remove();
				}, 800)

				let timerAlien = setTimeout(function() {
					alienShip = new AlienShip('images/alienShip2.png');
					alienShip.appendIn('.container');
					alienShip.moveDown();
				}, 800)
			}

			if ( toNum(that.bullet.elem.style.top) < 5  ) {
				that.bullet.elem.remove();
				clearTimeout(timerId);
			} else {
				timerId = setTimeout(tick, 2);		
			}
		}, 2);
	}
}




document.addEventListener('click', () =>  {
	shot = new Shot(new Bullet(ship.getRect().left + toNum(ship.getStyle().width) / 2, ship.getRect().top), ship, alienShip);
	shot.getShot();
})

document.addEventListener('keydown', () => {

	if (event.code == 'ArrowRight') {
		ship.moveRight();
	}

	if (event.code == 'ArrowLeft') {
		ship.moveLeft();
	}

	if (event.code == 'Space') {
		shot = new Shot(new Bullet(ship.getRect().left + toNum(ship.getStyle().width) / 2, ship.getRect().top), ship, alienShip);
		shot.getShot();
	}

})

function toNum(num) {
	return +num.replace(/[^0-9]/g, '')
}

function toNum2(num) {
	return num.replace(/[^0-9]/g, '')
}

function macroCollision(obj1, obj2){
  var XColl = false;
  var YColl = false;

  if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width)) {
  	XColl = true;
  }
  if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height)) {
  	YColl = true;
  }

  if (XColl && YColl) {
  	return true;
  }
  return false;
}

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}