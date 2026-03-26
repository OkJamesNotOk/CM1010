function Firework(colour,x,y){
    var colour = colour;
    var x = x;
    var y = y;

    var particles =[];
    this.depleted = false;


    //pattern of particles
    if(pattern=="Circle"){
        for(var i=0;i<360;i+=18){
            particles.push(new Particle(x,y,colour,i,5));
        }
    }
    else if(pattern=="Star"){
        for(var i=0;i<8;i++){
            particles.push(new Particle(x,y,colour,i*45,random(5,7)));
        }
        for(var j=0;j<2;j++){
            for(var a=0;a<2;a++){
                particles.push(new Particle(x-50*a,y,colour,j*180,random(5,7)));
                particles.push(new Particle(x+25*a,y-25*a,colour,j*180-45,random(5,7)));
            }
        }
        for(var l=90;l<=270;l+=180){
            for(var b=0;b<2;b++){
                particles.push(new Particle(x,y-50*b,colour,l,random(5,7)));
                particles.push(new Particle(x-25*b,y-25*b,colour,l-45,random(5,7)));
            }
        }
    }
    this.draw = function(){
        for(var i=0;i<particles.length;i++){
            particles[i].draw();
        }
        if(particles[0].speed<=0){
            this.depleted = true;
        }
    }
}

//waves around the face
function faceWave(colour,x,y){
    var colour = colour;
    var x = x;
    var y = y;

    var waves =[];
    this.depleted = false;

    waves.push(new Wave(colour,x,y));

    this.draw = function(){
        for(var i=0;i<waves.length;i++){
            waves[i].draw();
        }
        if(waves[0].age<=0){
            this.depleted = true;
        }
    }
}