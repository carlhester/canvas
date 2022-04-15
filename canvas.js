var canvas = document.querySelector('canvas')
console.log(canvas)

canvas.width = window.innerWidth-100;
canvas.height = window.innerHeight-100;

var c = canvas.getContext('2d');
var circles = [];

var id = 0;

function Circle(x, y, radius, x_vel, y_vel, left) {
    id += 1
    this.id = id;
    this.x = x
    this.y = y
    this.radius = radius

    this.x_vel = x_vel * left;

    this.y_vel = y_vel;
    this.y_acc = 1.6;

    this.split = false;

    this.draw = function(){
        c.beginPath()
        c.arc(this.x,this.y, this.radius , 0,Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.fillStyle = 'blue';
        c.stroke();
        c.fill();
    }

    this.update = function() {
        this.x_vel = this.x_vel * .97;
        if (Math.abs(this.x_vel) < .5) { 
            this.x_vel = 0
        }
        this.x += this.x_vel

        if (this.y + this.y_vel >= canvas.height - this.radius) { 
            this.y = canvas.height - this.radius;
           // this.jump()
            if (!this.split && this.radius >= 5) {
                deleteId(this.id);
                this.split = true;
                let xx = randomIntFromInterval(2, 3)
                circles.push(new Circle(this.x, this.y, this.radius - 3, this.x_vel - 1, -this.y_vel *xx * .1, 1));
                circles.push(new Circle(this.x, this.y, this.radius - 3, this.x_vel - 1, -this.y_vel *xx * .1, -1));
            }
        };

        this.y_vel += this.y_acc
        this.y += this.y_vel + 0.5 * this.y_acc

        if (this.y > canvas.height) { 
            deleteId(this.id)
        }
    }

    this.jump = function() {
        this.y_vel = -this.y_vel * .8;
    }

}

function Cloud() { 
    this.x = 100
    this.y = 100
    this.vel = 5
    
    this.update = function(){
        if (this.x >= canvas.width || this.x <= 0 ) { 
            this.vel = -this.vel
        }
        this.x += this.vel;
    }
   
        this.draw = function(){
        c.beginPath()
        c.arc(this.x-10,this.y, 20 , 0,Math.PI * 2, false);
        c.arc(this.x-10,this.y+15, 15 , 0,Math.PI * 2, false);
        c.arc(this.x-20,this.y-13, 25 , 0,Math.PI * 2, false);
        c.arc(this.x-30,this.y-12, 15 , 0,Math.PI * 2, false);
        c.arc(this.x,this.y, 15 , 0,Math.PI * 2, false);
        c.arc(this.x+10,this.y, 20 , 0,Math.PI * 2, false);
        c.arc(this.x+10,this.y+15, 15 , 0,Math.PI * 2, false);
        c.arc(this.x+20,this.y-13, 25 , 0,Math.PI * 2, false);
        c.arc(this.x+30,this.y-12, 15 , 0,Math.PI * 2, false);
        c.arc(this.x+45,this.y+13, 25 , 0,Math.PI * 2, false);
        c.arc(this.x+55,this.y-4, 25 , 0,Math.PI * 2, false);
        c.arc(this.x+65,this.y+13, 25 , 0,Math.PI * 2, false);
        c.strokeStyle = 'darkgrey';
        c.fillStyle = 'darkgrey';
        c.stroke();
        c.fill();
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
function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function addNewCircle(x, y) {
    //let x = randomIntFromInterval(0, canvas.width)
    //let y = randomIntFromInterval(-100, -0)
    let rr = randomIntFromInterval(6,10)
    circles.push(new Circle(x, y, rr, 0, 0, 1));
};

var cloud = new Cloud();

function animate() {
    requestAnimationFrame(animate);

    c.clearRect(0,0,innerWidth, innerHeight);
    c.fillStyle = 'lightgrey';
    c.fillRect(0,0,innerWidth,innerHeight);
    let zz = randomIntFromInterval(0, 5)
    if (zz > 3) { 
        let xx = randomIntFromInterval(20, 80)
        addNewCircle(cloud.x+xx, cloud.y);
    }
    for (let circ of circles) {
        circ.update();
        circ.draw();
    }
    cloud.update();
    cloud.draw();
}

//canvas.addEventListener("click", addNewCircle, false);

animate()
