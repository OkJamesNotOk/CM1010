function face(){
    //vis name
    this.name = "Face";

    var facewaves;

    this.setup = function(){        
        facewaves = new faceWaves();

        this.colorPick = new colorPicker(width/2+width/4+50, height-145);
    }

    this.draw = function(){
        push();
        fill(0);
        stroke(this.colorPick.currentColor);
        strokeWeight(2);
        translate(width/2,height/4);
        var spectrum = fourier.analyze();

        //draw the hair
        beginShape();

        var wave = fourier.waveform();
        for (var i = 90; i < 270; i++){
            var j = floor(map(i, 90, 270, 0, wave.length));
            var r = map(wave[j], -1, 1, 50, 200);
            var x = r * sin(i);
            var y = r * cos(i);

            vertex(x, y);
        }

        endShape();

        pop();

        //draw the face outline
        noFill();
        stroke(this.colorPick.currentColor);
        strokeWeight(2);
        arc(width/2, height/4, 250, 500, 0, 180 , radians(360));
        if(beatDetect.detectBeat(spectrum)){
            facewaves.addFaceWaves();
        }
        facewaves.update();

        //face flashes every few seconds
        if(timer == 1 && frameCount%60 == 0 && playing){
            var current = this.colorPick.Random();
            fill(current);
        }
        noStroke();
        this.fx = width/2;
        this.fy = height/4;
        arc(this.fx, this.fy, 250-3, 500-3, 0, 180 , radians(360));
        arc(this.fx, this.fy, 250-3, 250-3, 180, 360, radians(360));

        push();

        translate(0,-height/4);

        //draw the mouth
        beginShape();

        stroke(this.colorPick.currentColor);

        var wave = fourier.waveform();
        for (var i = 0; i < wave.length; i++){
            var x = map(i, 0, wave.length, width/2-40, width/2+40);
            var y = map(wave[i], -1, 1, height/4, height/2) + 250;
            vertex(x, y);
        }

        endShape();

        pop();

        //draw the tears
        push();
        noStroke();

        var c1 = color(200,200,200);
        var c2 = color(this.colorPick.currentColor);

        for (var i = 0; i< spectrum.length; i++){            
            var y = height/4+20;
            var h = map(spectrum[i], 0, 255, 0, height);
            var c = lerpColor(c1,c2,spectrum[i]/255);
            fill(c);
            if(i>width/2-50-15 && i<width/2-50+15 || i>width/2+50-15 && i<width/2+50+15){
                rect(i, y,(width/2)/spectrum.length, h/2);
            }
        }	

        pop();

        //draw the eyes

        fill(this.colorPick.currentColor);
        if(loud){
            stroke(this.colorPick.currentColor)
            line(width/2-50-25,height/4+20,width/2-50+25,height/4+20)
            line(width/2+50-25,height/4+20,width/2+50+25,height/4+20)
        }
        else{
            noStroke();
            if(beatDetect.detectBeat(spectrum)){
                fill(this.colorPick.Random());
                ellipse(width/2-50, height/4+20,50,20);
                ellipse(width/2+50, height/4+20,50,20);
            }
            else{
                fill(255);
                ellipse(width/2-50, height/4+20,50,20);
                ellipse(width/2+50, height/4+20,50,20);
            }


            fill(0);
            var lx = map(mouseX,0,width,width/2-50-20,width/2-50+20,true);
            var rx = map(mouseX,0,width,width/2+50-20,width/2+50+20,true);
            var y = map(mouseY,0,height-200,height/4+20-5, height/4+20+5,true);
            ellipse(lx, y,13,13);
            ellipse(rx, y,13,13);
        }

        //add text
        fill("green");
        textSize(20);
        stroke(0);
        text("Colour:",width/2+width/5+25,height-125);
        
        //call color picker
        this.colorPick.functionPackageDoAll(width/2+width/4+50, height-145);
    };

    //reset angle mode to avoid conflicts with other visualiser
    this.unSelectVisual = function(){
        angleMode(RADIANS);
    }

    //switch angle mode 
    this.selectVisual = function(){
        angleMode(DEGREES);
        this.setup();
    }
}
