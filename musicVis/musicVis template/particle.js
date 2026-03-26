function Particle(x,y,colour,angle,speed){
    var x;
    var y;
    var angle = angle;
    this.speed = speed;
    this.colour = colour;
    this.age = 200;

    this.draw = function(){
        this.update();
        var r = red(this.colour)-(255-this.age);
        var g = green(this.colour)-(255-this.age);
        var b = red(this.colour)-(255-this.age);

        var c = color(r,g,b);
        fill(c);
        this.age-=1;
        //shape of particle
        if(shape=="Circle"){
            ellipse(x,y,10,10);
        }
        else if(shape=="Square"){
            rect(x,y,10,10);
        }
        else if(shape=="Triangle"){
            triangle(x-7,   //x1
                     y-7,   //y1
                     x,     //x2
                     y+7,   //y2
                     x+7,   //x3
                     y-7);  //y3
        }
    }

    this.update = function(){
        this.speed-= 0.1;
        x+=cos(angle)*speed+noise(frameCount)*10;
        y+=sin(angle)*speed+noise(frameCount)*10;  

    }
}

//waves around the face
function Wave(colour,x,y){
    this.x = x;
    this.y = y;
    this.colour = colour;
    this.size = 0;
    this.age = 150;

    this.draw = function(){
        this.update();
        var r = red(this.colour)-(255-this.age);
        var g = green(this.colour)-(255-this.age);
        var b = red(this.colour)-(255-this.age);

        var c = color(r,g,b);
        this.age-=1;
        
        //shape of wave        
        noFill();
        stroke(r, g, b);
        strokeWeight(2);
        arc(this.x, this.y, 250+this.size, 500+this.size, 0, 180 , radians(360));
        arc(this.x, this.y, 250+this.size, 250+this.size, 180, 360, radians(360));
    }

    this.update = function(){
        this.size+=5;
    }
}