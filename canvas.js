var canvas = document.querySelector('canvas')
console.log(canvas)

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var c = canvas.getContext('2d');
var circleRadius  = 10;

function Circle(x,y,left) {
    this.x = x
    this.y = y

    this.x_vel = 5 * left;

    this.y_vel = -20;
    this.y_acc = 1.6;

    this.draw = function(){
        c.beginPath()
        c.arc(this.x,this.y,circleRadius,0,Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
    }

    this.update = function() {
        console.log('update', this.y_vel, this.y, canvas.height - circleRadius);

        this.x_vel = this.x_vel * .99;
        if (Math.abs(this.x_vel) < .5) { 
            this.x_vel = 0
        }
        this.x += this.x_vel

        if (this.y >= canvas.height - circleRadius) { 
            this.y = canvas.height - circleRadius;
            if (!this.on_ground) {
                this.jump()
            }
        };

        this.y_vel += this.y_acc
        this.y += this.y_vel + 0.5 * this.y_acc
    }

    this.jump = function() {
        this.y_vel = -this.y_vel * .8;
    }

}

var circles = [];

function addNewCircle(e) { 
    circles.push(new Circle(e.x,e.y, 1));
};

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0,0,innerWidth, innerHeight);
    c.fillStyle = 'darkgrey';
    c.fillRect(0,0,innerWidth,innerHeight);

    for (let circ of circles) {
        circ.update();
        circ.draw();
    }
}

canvas.addEventListener("click", addNewCircle, false);

animate()
