var playing = false;
//displays and handles clicks on the playback button.
function PlaybackButton(){

    this.x = width/2;
    this.y = height-80;
    this.width = 20;
    this.height = 20;

    //flag to determine whether to play or pause after button click and
    //to determine which icon to draw

    this.draw = function(){
        this.x = width/2;
        this.y = height-80;
        this.width = 20;
        this.height = 20;
        fill(200);
        if(playing){
            rect(this.x - this.width/2,
                 this.y,
                 this.width/2 - 2,
                 this.height);
            rect(this.x - this.width/2 + (this.width/2 + 2),
                 this.y,
                 this.width/2 - 2,
                 this.height);
        }
        else{	
            triangle(this.x - this.width/2,
                     this.y,
                     this.x + this.width - this.width/2,
                     this.y + this.height/2,
                     this.x - this.width/2,
                     this.y+this.height);
        }
    };

    //checks for clicks on the button, starts or pauses playabck.
    //@returns true if clicked false otherwise.
    this.hitCheck = function(){
        if(mouseX > this.x - this.width/2 && mouseX < this.x - this.width/2 + this.width && mouseY > this.y && mouseY < this.y + this.height){
            if (sound[p].isPlaying()) {
                sound[p].pause();
            } else {
                sound[p].play();
            }
            playing = !playing;
            return true;
        }
        return false;
    };

    //press space to pause/play
    this.space = function(){
        if (sound[p].isPlaying()) {
            sound[p].pause();
        } else {
            sound[p].play();
        }
        playing = !playing;
    }

}