	class GradientAnimation {
		constructor() {
			this.cnv        = document.querySelector(`canvas`);
			this.ctx        = this.cnv.getContext(`2d`);

			this.inners     = 4;
			this.radius     = 250;
			this.colorList  = ['#159e74', '#2A47A0'];

			this.coordintes = [];
			this.coordintes.push({x: 0.5,y: 0.5});
			this.coordintes.push({x: 0.7,y: 0.4});

			this.setCanvasSize();
			this.createCircles();
			this.drawAnimation();

			(window.onresize = () => {
				this.setCanvasSize();
				//this.createCircles();
			})();
		}
		setCanvasSize() {
			this.w = this.cnv.width  = innerWidth;
			this.h = this.cnv.height = innerHeight;
		}
		createCircles() {
			this.circles = [];
			this.coordintes.forEach(function (coordinte, i){
				this.circles.push(new Circle(this.w, this.h, this.radius, this.colorList[i] , coordinte.x, coordinte.y, this.inners));
			}, this);
		}
		drawCircles() {
			this.circles.forEach(circle => circle.draw(this.ctx));
		}
		clearCanvas() {
			this.ctx.clearRect(0, 0, this.w, this.h);
		}
		drawAnimation() {
			this.clearCanvas();
			this.drawCircles();
			window.requestAnimationFrame(() => this.drawAnimation());
		}
	}

class Circle {
	constructor(w, h, radius, color, x, y, inners = 0) {
		this.color = color;
		this.radius = radius;
		this.firstColor  = `${this.color}FF`;
		this.secondColor = `${this.color}80`;

		this.x = Math.trunc(x * w);
		this.y = Math.trunc(y * h);
		this.minX = Math.trunc(0.5 * w);
		this.maxX = Math.trunc(1 * w);
		this.minY = Math.trunc(0);
		this.maxY = Math.trunc(0.6 * h);

		this.newX = this.newMax(this.x, 1000, this.minX, this.maxX);
		this.newY = this.newMax(this.y, 500, this.minY, this.maxY);

		let inner;
		this.inners = [];
		for (let i = 0 ; i < inners ; ++i) {
			inner = {
				x: Math.trunc(this.x + Math.random() * (Math.round(Math.random()) * 2 - 1) * this.radius),
				y: Math.trunc(this.y + Math.random() * (Math.round(Math.random()) * 2 - 1) * this.radius),
				radius: Math.trunc(Math.random() * radius + radius * 0.1),
				newRadius: Math.trunc(Math.random() * radius + radius * 0.1),
				newX: this.newMax(this.x2, this.radius*2, this.x - this.radius, this.x + this.radius),
				newY: this.newMax(this.y2, this.radius*2, this.y - this.radius, this.y + this.radius),
			};
			this.inners.push(inner);
		}
	}
	draw(ctx, speed) {

		//основной круг
		if (this.x !== this.newX ){
			//
		} else {
			this.newX = this.newMax(this.x, 1000, this.minX, this.maxX);
		}
		this.x = this.target(this.x, this.newX);

		if (this.y !== this.newY ){
			//
		} else {
			this.newY = this.newMax(this.y, 500, this.minY, this.maxY);
		}
		this.y = this.target(this.y, this.newY);

		const x = this.x;
		const y = this.y;
		const radius = this.radius;



		ctx.filter = 'blur(80px)';
		//ctx.globalCompositeOperation = `saturation`;
		ctx.globalCompositeOperation = `overlay`;

		/*let gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
		gradient.addColorStop(0, this.firstColor);
		gradient.addColorStop(0.3, this.firstColor);
		gradient.addColorStop(1, this.secondColor);
		ctx.fillStyle = gradient;*/
		ctx.fillStyle = this.secondColor;


		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
		ctx.closePath();



		//дополнительные
		this.inners.forEach(function (inner, i){
			if (inner.x !== inner.newX && (inner.x > (x - radius) && inner.x < (x + radius)) ){
				//
			} else {
				this.inners[i].newX = inner.newX = this.newMax(inner.x, radius * 2, x - radius, x + radius);
			}
			this.inners[i].x = inner.x = this.target(inner.x, inner.newX);


			if (inner.y !== inner.newY && (inner.y > (y - radius) && inner.y < (y + radius)) ){
				//
			} else {
				this.inners[i].newY = inner.newY = this.newMax(inner.y, radius * 2, y - radius, y + radius);
			}
			this.inners[i].y = inner.y = this.target(inner.y, inner.newY);


			if (inner.radius !== inner.newRadius && (inner.radius < (radius * 1.1) && inner.radius > (radius * 0.1)) ){
				//
			} else {
				this.inners[i].newRadius = inner.newRadius = Math.trunc(Math.random() * radius + radius * 0.1);
			}
			this.inners[i].radius = inner.radius = this.target(inner.radius, inner.newRadius);


			ctx.beginPath();
			ctx.arc(inner.x, inner.y, inner.radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		}, this);
	}
	target(from, to, speed = Math.trunc(Math.random() * 3)){
		if (from < to){
			from += speed;
			if (from > to) from = to;
		} else {
			from -= speed;
			if (from < to) from = to;
		}
		return from;
	}
	newMax(from, shift, min, max){
		let target = Math.trunc(from + (Math.round(Math.random()) * 2 - 1) * Math.random() * shift);
		if (target > max) target = max;
		if (target < min) target = min;
		return target;
	}
}

window.onload = () => {
	new GradientAnimation();
}