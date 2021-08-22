let start = document.querySelector('.start');
let ship = document.querySelector('.ship img');
let shipCon = document.querySelector('.ship');
let container = document.querySelector('.container');
let body = document.querySelector('body');

let alien = document.querySelector('.alien')

let compStyleCont = getComputedStyle(container);
let compStyleShip = getComputedStyle(ship);



document.onclick = function() {
	shot();
}

let num = 0;
document.onkeydown = function() {
	if (event.code == "ArrowRight") {
		if ( compStyleShip.marginLeft.replace(/[^0-9]/g, '') != compStyleCont.width.replace(/[^0-9]/g, '') - compStyleShip.width.replace(/[^0-9]/g, '') ) {
			num += 10;
			ship.style.marginLeft  = num + "px";
		}
	}

	if (event.code == "ArrowLeft") {
		if ( compStyleShip.marginLeft.replace(/[^0-9]/g, '') != 0 ) {
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
	alienClone.style.left = randomInteger(1, 540) + 'px';
	return alienClone
}

let gameAlien = createAlien()

function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

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


		let timerId = setTimeout(function tick() {
			span.style.top = span.style.top.replace(/[^0-9]/g, '') - 2 + 'px';
			console.dir(span.style.top.replace(/[^0-9]/g, '')) 

			if (macroCollision(span.getBoundingClientRect(), gameAlien.getBoundingClientRect())) {
				span.remove();
				gameAlien.remove();
				createAlien();
			}

			if ( span.style.top.replace(/[^0-9]/g, '') < 1 || macroCollision(span.getBoundingClientRect(), gameAlien.getBoundingClientRect()) ) {
				span.remove();
				 clearTimeout(timerId);
			} else {
				timerId = setTimeout(tick, 2); // (*)				
			}
		}, 2);
}

function macroCollision(obj1, obj2){
  var XColl = false;
  var YColl = false;

  console.dir(obj1)
  console.dir(obj2)

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