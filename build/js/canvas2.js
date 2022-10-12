let app = new PIXI.Application({
	width: innerWidth,
	height: innerHeight,
	antialias: true,
	//backgroundColor: 0x0,
	transparent: true,
});


let speed = 15;
let circleAmount = 10;
let colorList  = [0x159e74, 0x2A47A0]

let containerWidth = innerWidth / 4;



document.querySelector(`.top_animtaion`).appendChild(app.view);




//const circles = [];
//circles.push(circle);

const blendMode = 0;
const opacity = 1;

const blurFilter = new PIXI.filters.BlurFilter();
blurFilter.blur = 150;
blurFilter.quality  = 15;
blurFilter.blendMode = 0;
blurFilter.multisample = 0
//blurFilter.padding  = 200





const container = new PIXI.Container();
app.stage.addChild(container);

container.pivot.x = containerWidth / 2;
container.pivot.y = containerWidth / 2;


container.minX = Math.trunc(app.screen.width * 0.5);
container.maxX = Math.trunc(app.screen.width);
container.minY = Math.trunc(app.screen.height * 0.1);
container.maxY = Math.trunc(app.screen.height * 0.6);


container.x = app.screen.width / 2;
container.y = app.screen.height / 2;

container.x2 = newMax(container.x, app.screen.width / 2, container.minX, container.maxX);
container.y2 = newMax(container.y, app.screen.height / 2, container.minY, container.maxY);

container.filters = [blurFilter];


for (let i = 0; i < circleAmount; i++) {
	let color = colorList[0];
	let x = Math.trunc(Math.random() * containerWidth);
	let y = Math.trunc(Math.random() * containerWidth);
	let radius = Math.random() * containerWidth / 2;

	const circle = new PIXI.Graphics();
	circle.blendMode = blendMode
	circle.lineStyle(0);
	circle.beginFill(color, opacity, true);
	circle.drawCircle(0, 0, radius);
	circle.endFill();
	circle.x = x;
	circle.y = y;

	circle.x2 = newCircleCoordinates(circle.x);
	circle.y2 = newCircleCoordinates(circle.y);
	circle.radius = radius;
	circle.radius2 = Math.random() * containerWidth / 2 + containerWidth*0.1;
	circle.color = color;

	container.addChild(circle);
}

/*
const graphics = new PIXI.Graphics();
graphics.beginFill(0xDE3249, 0.3, true);
graphics.drawRect(0, 0, containerWidth, containerWidth);
graphics.endFill();
graphics.name = 'test';
container.addChild(graphics);
*/


app.ticker.add((delta) => {
	let xDir = (container.x <= container.x2) ? 1 : -1;
	let yDir = (container.y <= container.y2) ? 1 : -1;

	container.x += 0.1 * speed * xDir * delta;
	container.y += 0.1 * speed * yDir * delta;



	if ( (xDir === 1 && container.x >= container.x2) || (xDir === -1 && container.x <= container.x2))
		container.x2 = newMax(container.x, app.screen.width / 2, container.minX, container.maxX);
	if ( (yDir === 1 && container.y >= container.y2) || (yDir === -1 && container.y <= container.y2) )
		container.y2 = newMax(container.y, app.screen.height / 2, container.minY, container.maxY);

	container.children.forEach(function (circle, i){
		if (circle.name === 'test') return;

		let radiusDir = (circle.radius <= circle.radius2) ? 1 : -1;
		circle.radius += 0.05 * speed * radiusDir * delta;


		circle.clear();
		circle.beginFill(circle.color, 0.9, true);
		circle.drawCircle(0, 0, circle.radius);
		circle.endFill();


		let xDir = (circle.x <= circle.x2) ? 1 : -1;
		let yDir = (circle.y <= circle.y2) ? 1 : -1;
		circle.x += 0.1 * speed * xDir * delta;
		circle.y += 0.1 * speed * yDir * delta;

		if ( (xDir === 1 && circle.x >= containerWidth) ||
			(xDir === -1 && circle.x <= 0) ||
			(yDir === 1 && circle.y >= containerWidth) ||
			(yDir === -1 && circle.y <= 0) ){
			circle.x2 = newCircleCoordinates(circle.x);
			circle.y2 = newCircleCoordinates(circle.y);
		}
		if ( (radiusDir === 1 && circle.radius >= circle.radius2) ||
			(xDir === -1 && circle.radius <= circle.radius2) ){
			circle.radius2 = Math.random() * containerWidth / 2 + containerWidth*0.1;
		}
	});

	container.rotation -= 0.0005 * speed * delta;
});












const container2 = new PIXI.Container();
app.stage.addChild(container2);

container2.pivot.x = containerWidth / 2;
container2.pivot.y = containerWidth / 2;


container2.minX = Math.trunc(app.screen.width * 0.5);
container2.maxX = Math.trunc(app.screen.width);
container2.minY = Math.trunc(app.screen.height * 0.1);
container2.maxY = Math.trunc(app.screen.height * 0.6);


container2.x = app.screen.width / 2 + app.screen.width / 6;
container2.y = app.screen.height / 2 - + app.screen.width / 6;

container2.x2 = newMax(container2.x, app.screen.width / 2, container2.minX, container2.maxX);
container2.y2 = newMax(container2.y, app.screen.height / 2, container2.minY, container2.maxY);

container2.filters = [blurFilter];


for (let i = 0; i < circleAmount; i++) {
	let color = colorList[1];
	let x = Math.trunc(Math.random() * containerWidth);
	let y = Math.trunc(Math.random() * containerWidth);
	let radius = Math.random() * containerWidth / 2;

	const circle = new PIXI.Graphics();
	circle.blendMode = blendMode
	circle.lineStyle(0);
	circle.beginFill(color, opacity, true);
	circle.drawCircle(0, 0, radius);
	circle.endFill();
	circle.x = x;
	circle.y = y;

	circle.x2 = newCircleCoordinates(circle.x);
	circle.y2 = newCircleCoordinates(circle.y);
	circle.radius = radius;
	circle.radius2 = Math.random() * containerWidth / 2 + containerWidth*0.1;
	circle.color = color;

	container2.addChild(circle);
}

app.ticker.add((delta) => {
	let xDir = (container2.x <= container2.x2) ? 1 : -1;
	let yDir = (container2.y <= container2.y2) ? 1 : -1;

	container2.x += 0.1 * speed * xDir * delta;
	container2.y += 0.1 * speed * yDir * delta;



	if ( (xDir === 1 && container2.x >= container2.x2) || (xDir === -1 && container2.x <= container2.x2))
		container2.x2 = newMax(container2.x, app.screen.width / 2, container2.minX, container2.maxX);
	if ( (yDir === 1 && container2.y >= container2.y2) || (yDir === -1 && container2.y <= container2.y2) )
		container2.y2 = newMax(container2.y, app.screen.height / 2, container2.minY, container2.maxY);

	container2.children.forEach(function (circle, i){
		if (circle.name === 'test') return;

		let radiusDir = (circle.radius <= circle.radius2) ? 1 : -1;
		circle.radius += 0.05 * speed * radiusDir * delta;


		circle.clear();
		circle.beginFill(circle.color, 0.9, true);
		circle.drawCircle(0, 0, circle.radius);
		circle.endFill();


		let xDir = (circle.x <= circle.x2) ? 1 : -1;
		let yDir = (circle.y <= circle.y2) ? 1 : -1;
		circle.x += 0.1 * speed * xDir * delta;
		circle.y += 0.1 * speed * yDir * delta;

		if ( (xDir === 1 && circle.x >= containerWidth) ||
			(xDir === -1 && circle.x <= 0) ||
			(yDir === 1 && circle.y >= containerWidth) ||
			(yDir === -1 && circle.y <= 0) ){
			circle.x2 = newCircleCoordinates(circle.x);
			circle.y2 = newCircleCoordinates(circle.y);
		}
		if ( (radiusDir === 1 && circle.radius >= circle.radius2) ||
			(xDir === -1 && circle.radius <= circle.radius2) ){
			circle.radius2 = Math.random() * containerWidth / 2 + containerWidth*0.1;
		}
	});

	container2.rotation += 0.0002 * speed * delta;
});





function newMax(from, shift, min, max){
	let target = Math.trunc(from + (Math.round(Math.random()) * 2 - 1) * Math.random() * shift);
	if (target > max) target = max;
	if (target < min) target = min;
	return target;
}



function newCircleCoordinates(from){
	let target = 0;
	if (from <= 0) {
		target = containerWidth + Math.random() * containerWidth * 3;
	} else if(from >= containerWidth) {
		target = Math.random() * containerWidth * 3 * -1;
	} else {
		target = Math.random() * containerWidth * 3 * (Math.round(Math.random()) * 2 - 1);
		if (target > 0 && target < containerWidth ) target + containerWidth;
	}
	return target;
}