function Fireworks(){
    var fireworks = [];
    this.addFirework = function(){
        var f_colour=null;
        
        var r = random(0,255);
        var g = random(0,255);
        var b = random(0,255);
//        console.log(r+" "+g+" "+b);
        f_colour = color(r,g,b);
        var f_x = random(width*0,width*0.75);
        var f_y = random(height*0,(height-100)*0.8);
        var firework = new Firework(f_colour,f_x,f_y);
        fireworks.push(firework);
    }
    
    this.update = function(){
        for(var i=0;i<fireworks.length;i++){
            fireworks[i].draw();
            if(fireworks[i].depleted){
                fireworks.splice(i,1);
            }
        }
    }
}

//waves around the face
function faceWaves(){
    var faceWaves = [];
    this.addFaceWaves = function(){
        this.colorPick = new colorPicker();
        var f_colour=null;
        
        f_colour = color(this.colorPick.Random());
        var f_x = width/2;
        var f_y = height/4;
        var facewave = new faceWave(f_colour,f_x,f_y);
        faceWaves.push(facewave);
    }
    
    this.update = function(){
        for(var i=0;i<faceWaves.length;i++){
            faceWaves[i].draw();
            if(faceWaves[i].depleted){
                faceWaves.splice(i,1);
            }
        }
    }
}