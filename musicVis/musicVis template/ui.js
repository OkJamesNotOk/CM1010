var loud = false;
var currTime=0;
function ui_create(){

    //create volume slider
    this.volx = 200;
    this.voly = height-50;
    this.setup = function(){
        //create slider to adjust volume
        this.volume_slider = createSlider(0,3.5,0.5,0.1);
        this.volume_slider.position(this.volx, this.voly);
        this.volume_slider.size(150);
    }
    this.setup();

    //return slider value when called in controlsAndInput.js
    this.vol = function(){
        return this.volume_slider.value();
    }

    //return volume to the state before pressing the mute button
    this.b4mute = 0;
    this.mute = function(){
        if(this.volume_slider.value()!=0){
            this.b4mute = this.volume_slider.value();
            this.volume_slider.value(0);
        }
        else{
            this.volume_slider.value(this.b4mute);
        }
    }


    this.x = 0;
    this.y = height-150;

    this.draw = function(){
        //draw the control panel with some tranparency
        fill(200,100);
        rect(this.x,this.y,width,150);

        //map value of slider to volume
        this.volx_bar = this.volume_slider.value();
        this.volx_bar = map(this.volx_bar, 0, 4, 0, 30);

        //multipliers
        var x_mul=5;
        var y_mul=2;
        for(var i=0;i<30;i++){
            //draw volume indicator
            if(i<this.volx_bar){
                fill(0,255,0);
                if(i>18){
                    fill(255,0,0);
                }
                rect(this.volx+i*(x_mul+0.5)+6,
                     this.voly-15-i*y_mul,
                     5,
                     10+i*y_mul);
            }
        }
        this.isLoud();

        this.progressBar();

        fill(200);
        strokeWeight(0);
        this.NextSongBtn();
        this.PreviousSongBtn();
    }

    this.isLoud = function(){
        //map value of slider to volume
        this.volx_bar = this.volume_slider.value();
        this.volx_bar = map(this.volx_bar, 0, 4, 0, 30);

        if(this.volx_bar>18){
            loud = true;
        }
        else{
            loud = false;
        }
    }

    this.progressBar = function(){
        //parameters for progress bar
        this.progressBarX = width/2;
        this.progressBarY = height-40;
        this.progressBarWidth = 30/100*width;
        var w = this.progressBarWidth;
        this.progressBarHeight = 10;
        var h = this.progressBarHeight;

        this.CurrentTime = this.progress();
        //draw progress bar
        fill(200);
        rect(this.progressBarX - w/2,
             this.progressBarY,
             w,
             h
            );
        //draw the progress of the playing track
        fill(0);
        if(playing){            
            rect(this.progressBarX - w/2,
                 this.progressBarY,
                 this.CurrentTime,
                 h
                );
        }
        else{
            rect(this.progressBarX - w/2,
                 this.progressBarY,
                 currTime,
                 h
                );
        }
    }

    //map current time of the song width of progress bar
    this.progress = function(){
        this.songDuration = sound[p].duration();
        this.songTimeNow = sound[p].currentTime();        
        this.timePercent = map(this.songTimeNow,
                               0, this.songDuration,
                               0, this.progressBarWidth              
                              );
        return round(this.timePercent);
    }

    this.NextSongBtn = function(){
        this.NSBX = width/2 + 30;
        this.NSBY = height-80 + 2;
        this.NSBW = 20 - 4;
        this.NSBH = 20 - 4;

        var x = this.NSBX
        for(var i=0; i<2; i++){
            x += this.NSBW/2*i;
            triangle(x - this.NSBW/2,
                     this.NSBY,
                     x + this.NSBW - this.NSBW/2,
                     this.NSBY + this.NSBH/2,
                     x - this.NSBW/2,
                     this.NSBY + this.NSBH);
        }
    }

    this.PreviousSongBtn = function(){
        this.PSBX = width/2 - 30;
        this.PSBY = height-80 + 2;
        this.PSBW = 20 - 4;
        this.PSBH = 20 - 4;

        var x = this.PSBX       
        for(var i=0; i<2; i++){
            x -= this.PSBW/2*i;
            triangle(x + this.PSBW/2,
                     this.PSBY,
                     x - this.PSBW + this.PSBW/2,
                     this.PSBY + this.PSBH/2,
                     x + this.PSBW/2,
                     this.PSBY + this.PSBH);
        }
    }

    this.btnsCheck = function(){
        if(mouseX > this.NSBX - this.NSBW/2 &&
           mouseX < this.NSBX + this.NSBW &&
           mouseY > this.NSBY && 
           mouseY < this.NSBY + this.NSBH){
            var btn = "next";
            return btn
        }
        else if(mouseX < this.PSBX + this.PSBW/2 &&
                mouseX > this.PSBX - this.PSBW &&
                mouseY > this.PSBY && 
                mouseY < this.PSBY + this.PSBH){
            var btn = "previous";
            return btn
        }
        return false
    }

    this.timeJump = function(){
        this.progressBarX = width/2;
        this.progressBarY = height-40;
        this.progressBarWidth = 30/100*width;
        var w = this.progressBarWidth;
        if(mouseX > this.progressBarX - w/2 &&
           mouseX < this.progressBarX + w/2 &&
           mouseY > this.progressBarY &&
           mouseY < this.progressBarY + 10){
            var newTime = mouseX - (this.progressBarX - w/2);
            newTime = map(newTime,
                          0, this.progressBarWidth,
                          0, this.songDuration);
            return newTime
        }
        else return false
    }

    this.onResize = function(){
        //reposition volume slider
        this.volx = 15/100*width;
        this.voly = height-60;
        this.volume_slider.position(this.volx, this.voly);

        //resize background of UI
        this.x = 0;
        this.y = height-150;
    }
    this.onResize();
}