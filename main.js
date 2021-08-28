let ship = document.querySelector('.ship img');
let shipCon = document.querySelector('.ship');
let container = document.querySelector('.container');
let body = document.querySelector('body');
let shotSound = new Audio('audio/shot.mp3');
let bangSound = new Audio('audio/bang.mp3');

let alien = document.querySelector('.alien')

let containerStyle = getComputedStyle(container);
let shipStyle = getComputedStyle(ship);


let imgAnimate = new Image();
imgAnimate.src = "images/bang-animation.gif";
imgAnimate.style.width = '100px';




document.onclick = function() {
	shot();
}

let num = 0;

document.onkeydown = function() {

	if (event.code == "ArrowRight") {
		if ( toNum(shipStyle.marginLeft) != toNum(containerStyle.width) - toNum(shipStyle.width) ) {
			num += 10;
			ship.style.marginLeft  = num + "px";
		}
	}

	if (event.code == "ArrowLeft") {
		if ( toNum(shipStyle.marginLeft) != 0 ) {
			num -= 10;
			ship.style.marginLeft  = num + "px"			
		}
	}

	if (event.code == "Space") {
		shot();
	}

}

function createAlien() {
	let alienClone = alien.cloneNode();
	alienClone.style.display = 'block';
	container.prepend(alienClone)

	
	alienClone.style.position = 'fixed';
	alienClone.style.left = randomInteger(container.getBoundingClientRect().x, container.getBoundingClientRect().x + 540) + 'px';
	return alienClone
}

let gameAlien = createAlien()

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


let alienTimerId = setTimeout(function atick() {
	gameAlien.style.top = toNum(gameAlien.style.top) + 1 + 'px';

	if ( toNum(gameAlien.style.top) > 600  ) {
		gameAlien.remove();
		gameAlien = createAlien();
		clearTimeout(alienTimerId);
	} else {
		alienTimerId = setTimeout(atick, 10); // (*)				
	}
}, 2);



function shot() {
	let shipLocate = ship.getBoundingClientRect();
	if (!gameAlien) {
		let gameAlien = createAlien()
	}

	let span =  document.createElement('span');
	span.style.width = '5px';
	span.style.height = '10px';
	span.classList.add('bullet');
	shipCon.append(span)
	let spanRect = span.getBoundingClientRect();
	span.style.left = shipLocate.left + shipLocate.width / 2 - spanRect.width / 2 + 'px';

	span.style.top = shipLocate.top - spanRect.height + 'px';

	shotSound.play();
	
	shotSound.currentTime = 0;

	let timerId = setTimeout(function tick() {
		span.style.top = toNum(span.style.top) - 5 + 'px';

		if (macroCollision(span.getBoundingClientRect(), gameAlien.getBoundingClientRect())) {
			span.remove();
			gameAlien.remove();

			imgAnimate.style.position = 'fixed';
			imgAnimate.style.left = gameAlien.style.left;
			imgAnimate.style.top = gameAlien.style.top;

			let timerBang = setTimeout(function() {
				imgAnimate.remove();
			}, 800)

			container.append(imgAnimate)

			console.dir(gameAlien.style.left)

			bangSound.play();
			bangSound.currentTime = 0;

			gameAlien = createAlien();
		}

		if ( toNum(span.style.top) < 5 || macroCollision(span.getBoundingClientRect(), gameAlien.getBoundingClientRect()) ) {
			span.remove();
			 clearTimeout(timerId);
		} else {
			timerId = setTimeout(tick, 2); // (*)				
		}
	}, 2);
}

function toNum(num) {
	return +num.replace(/[^0-9]/g, '')
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