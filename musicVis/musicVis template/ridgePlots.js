function RidgePlots(){
    this.name = "Ridge Plots";

    var startY;
    var startX;
    var endY;
    var spectrumWidth;
    var speed = 1.5;
    var output =[];

    this.setup = function(){

        //slider to adjust amplitude
        this.sizeSlider = createSlider(30,200,40);
        this.sizeSlider.position(width/2+width/5, height-80);
        this.sizeSlider.size(120);
        this.sizeSlider.style('transform', 'rotate(270deg)');
        
        this.colorPick = new colorPicker(width/2+width/4+50, height-145);
    }
    this.setup();

    //remove sliders when changing visualisation
    this.unSelectVisual = function(){
        this.sizeSlider.remove();
        output = [];
    }
    //call setup and resize element when this visualiser is selected
    this.selectVisual = function(){
        this.setup();
        this.onResize();
    } 
    this.onResize = function(){
        startX = width/5;
        endY = (height-50)/5;
        startY = (height-50) - endY;
        spectrumWidth = (width/5)*3;
        this.sizeSlider.position(width/2+width/5-50, (height)-80);
    }

    this.onResize();

    this.draw = function(){
        this.onResize();
        //get values from slider
        slidersize = this.sizeSlider.value();
        //        var color = this.colorSlider.value();

        background(0);
        //add text
        fill("green");
        textSize(20);
        stroke(0);
        text("Size:",width/2+width/5-50,height-125);
        text("Colour:",width/2+width/5+25,height-125);

        stroke(255);
        strokeWeight(2);

        if(frameCount%15==0){
            addWave();
        }
        for(var i =output.length-1;i>=0;i--){
            var wave = output[i];
            fill(this.colorPick.currentColor);
            beginShape();
            for(var j=0;j<wave.length;j++){
                wave[j].y -= speed;
                vertex(wave[j].x,wave[j].y);
            }
            endShape();
            if(wave[0].y<endY){
                output.splice(i,1);
            }
        }
        
        this.colorPick.functionPackageDoAll(width/2+width/4+50, height-145);
    }

    function addWave(){
        var w = fourier.waveform();
        var outputWave = [];
        var smallScale = 5;
        var bigScale = slidersize;

        for(var i=0;i<w.length;i++){
            if(i%20==0){
                var x = map(i,0,1024,startX,startX+spectrumWidth);

                if(i<1024*0.25 || i >1024*0.75){
                    var y = map(w[i],-1,1,-smallScale,smallScale);
                    var o = {x:x, y:startY+y};
                    outputWave.push(o);
                }
                else{
                    var y = map(w[i],-1,1,-bigScale,bigScale);
                    var o = {x:x, y:startY+y};
                    outputWave.push(o);
                }
            }
        }
        output.push(outputWave);
    }

    this.unSelectVisual();
}