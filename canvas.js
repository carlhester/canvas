var canvas = document.querySelector('canvas')
console.log(canvas)

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var c = canvas.getContext('2d');
var circles = [];

var id = 0;

function Circle(x,y, radius, x_vel, left) {
    id += 1
    this.id = id;
    this.x = x
    this.y = y
    this.radius = radius

    this.x_vel = x_vel * left;

    this.y_vel = -20;
    this.y_acc = 1.6;

    this.split = false;
    console.log(this.id);

    this.draw = function(){
        c.beginPath()
        c.arc(this.x,this.y, this.radius , 0,Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
    }

    this.update = function() {
        this.x_vel = this.x_vel * .99;
        if (Math.abs(this.x_vel) < .5) { 
            this.x_vel = 0
        }
        this.x += this.x_vel

        if (this.y + this.y_vel >= canvas.height - this.radius) { 
            this.y = canvas.height - this.radius;
            this.jump()
            if (!this.split && this.radius >= 5) {
                deleteId(this.id);
                this.split = true
                circles.push(new Circle(this.x, this.y, this.radius - 3, this.x_vel - 1, 1));
                circles.push(new Circle(this.x, this.y, this.radius - 3, this.x_vel - 1, -1));
            }
        };

        this.y_vel += this.y_acc
        this.y += this.y_vel + 0.5 * this.y_acc
    }

    this.jump = function() {
        this.y_vel = -this.y_vel * .8;
    }

}

function deleteId(id) { 
    for( var i = 0; i < circles.length; i++){

        if ( circles[i].id === id) {
            circles.splice(i, 1);
            i--;
        }
    }
}


function addNewCircle(e) {
    circles.push(new Circle(e.x, e.y, 10, 0, 1));
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
