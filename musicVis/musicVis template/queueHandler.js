//index of current song
var p=0;

function QueueHandler(){
    //load sound file and push to array 'sound'
    this.queue = function(name){        
        sound[sound.length] = loadSound(name);
    }

    //play next song if current song ended.
    this.PlayNextSong = function(){
        if(round(sound[p].currentTime())==round(sound[p].duration())){
            this.next();
        }
    }

    //function pause current song, move to next song in queue
    this.next = function(){
        sound[p].pause();
        p+=1;
        if(p>sound.length-1){
            p=0;
        }
        this.play();
    }

    //function pause current song, move to previous song in queue
    this.previous = function(){
        sound[p].pause();
        p-=1;
        if(p<0){
            p=sound.length-1;
        }        
        this.play();
    }

    //jump forward "s" seconds
    this.timeForward = function(s){
        var newTime = sound[p].currentTime()+s;
        if(newTime>=sound[p].duration()){
            this.next();
        }
        else sound[p].jump(newTime);
    }

    //jump backward "s" seconds
    this.timeBackward = function(s){
        var newTime = sound[p].currentTime()-s;
        if(newTime<=0){
            this.previous();
        }
        else sound[p].jump(newTime);
    }

    //play song and set bool "playing" to true
    this.play = function(){
        sound[p].play();
        sound[p].jump(0);
        playing = true;
    }
}

//check if file is audio file, if yes queue the file and add name to array fileNames
function checkFile(file){
    if(file.type === 'audio'){
        queueHandlerQ.queue(file);
        //add names of songs into an array
        fileNames[sound.length-1] = file.name;
    }
}