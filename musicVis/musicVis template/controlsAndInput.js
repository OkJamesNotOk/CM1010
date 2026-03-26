//Constructor function to handle the onscreen menu, keyboard and mouse
//controls

var queueHandlerQ;

// Initial track
var fileNames = ["stomper_reggae_bit.mp3"];

function ControlsAndInput(){    
    this.menuDisplayed = true;

    //playback button 
    this.playbackButton = new PlaybackButton();
    
    //other UI elements, UI background, play next/previous, progress bar, volume bar
    this.ui = new ui_create();
    queueHandlerQ = new QueueHandler();

    //simplifying some functions 
    this.next = function(){
        queueHandlerQ.next();
    }
    this.previous = function(){
        queueHandlerQ.previous();
    }
    this.PlayNext = function(){
        queueHandlerQ.PlayNextSong();
    }

    this.setup = function(){        
        this.musicX = width/2-50;
        this.musicY = height-130;
        this.addMusic = createFileInput(checkFile, "true");
        this.addMusic.position(this.musicX, this.musicY);

        this.addMusic.style('background-color', '#737CA1');
        this.addMusic.style('width', '100px');
        this.addMusic.style('padding', '1px');
        this.addMusic.style('font-size', '16px');
        this.addMusic.style('color', 'violet');
        this.addMusic.style('overflow', 'hidden');
        this.addMusic.style('visibility', 'none');
    }
    this.setup();

    this.mousePressed = function(){
        //check if the playback button has been clicked
        var isButtonClicked = this.playbackButton.hitCheck();
        if(isButtonClicked){            
            //update variable so the progress bar is drawn correctly
            currTime = this.ui.progress();
        }

        var queueBtn = this.ui.btnsCheck();
        //check which btn is pressed
        if(queueBtn != false){
            //play previous track
            if(queueBtn == "previous"){
                this.previous();
            }
            //play next track
            if(queueBtn == "next"){
                this.next();
            }
        }

        var newTime = this.ui.timeJump();
        if(newTime != false){
            playing = true;
            sound[p].jump(newTime);
        }
    };

    //responds to keyboard presses
    //@param keycode the ascii code of the keypressed
    this.keyPressed = function(keycode){
        if(keycode == 32){
            this.playbackButton.space();
            //update variable so the progress bar is drawn correctly
            if(playing == false){ currTime = this.ui.progress()}
        }
        
        //number keys to switch visualisation
        if(keycode > 48 && keycode < 58){
            var visNumber = keycode - 49;
            if(visNumber<=vis.visuals.length-1){
                vis.selectVisual(vis.visuals[visNumber].name);
            }
        }

        // fullscreen with F
        if(keycode == 70){
            let fs = fullscreen();
            fullscreen(!fs);
        }
        // mute/unmute with M
        if(keycode==77){
            this.ui.mute();
        }

        // arrow key left rewind 5s
        if(keyCode == 37){
            if(playing){
                queueHandlerQ.timeBackward(5);
            }
        }
        
        // arrow key right forward 5s
        if(keyCode==39){
            if(playing){
                queueHandlerQ.timeForward(5);
            }
        }
    };

    //draws the playback button and potentially the menu
    this.draw = function(){
        push();
        fill("white");
        stroke("black");
        strokeWeight(2);
        textSize(20);

        this.ui.draw();
        this.ui.onResize();

        //playback button 
        this.playbackButton.draw();

        //only draw the menu if menu displayed is set to true.
        if(this.menuDisplayed){
            fill(255);
            text("Select a visualisation:", 25, height-130);
        }
        pop();

        //update sound volume
        sound[p].setVolume(this.ui.vol(),0,0);

        //check if selected visualisation changed
        this.check_select();
        //resize the drop down list
        this.menu_select.position(25,height-120);
        this.menu_select.style('width', 10/100*width + "px");
        this.shortcut.position(25,height-40);
        this.shortcut.style('width', 20/100*width + "px");

        //reset to default value
        this.shortcut_unchange();

        //play next song if current one finished
        this.PlayNext();

        //update location of file upload button
        this.musicX = width/2-200;
        this.musicY = height-130;
        this.addMusic.position(this.musicX,this.musicY);

        //name of added music
        stroke("black");
        fill("white")
        strokeWeight(2);
        textSize(15);
        if(p<fileNames.length){
            var name = fileNames[p];
            text('' + name,this.musicX + 120,this.musicY + 20);
        }
    }

    //drop down list for visualisation selection
    this.menu_select = createSelect();
    this.menu_select.position(25,height-120);
    for(var i=0; i< vis.visuals.length;i++){
        this.menu_select.option(vis.visuals[i].name);
    }
    //drop down list decoration
    this.menu_select.style('background-color', '#737CA1');
    this.menu_select.style('border-radius', '10px');
    this.menu_select.style('width', 10/100*width + "px");
    this.menu_select.style('padding', '3px');
    this.menu_select.style('font-size', '20px');
    this.menu_select.style('color', 'violet');

    //check if the selected visualisation changed
    this.last_selected=this.menu_select.value();
    this.check_select = function(){
        this.selected = this.menu_select.value();
        if(this.selected != this.last_selected){
            vis.selectVisual(this.selected);
            this.last_selected = this.selected;
        }
        else{
            this.menu_select.value(vis.selectedVisual.name);
        }
    }


    this.shortcut = createSelect();
    this.shortcut.position(25,height-40);
    this.shortcut.option("Keyboard Commands:");
    this.shortcut.option("M: Mute");
    this.shortcut.option("F: Fullscreen");
    this.shortcut.option("Space: Pause / Play");
    this.shortcut.option("1: Spectrum");
    this.shortcut.option("2: Wavepattern");
    this.shortcut.option("3: Needles");
    this.shortcut.option("5: Ridge Plots");
    this.shortcut.option("6: Firework");
    this.shortcut.option("7: Face");
    this.shortcut.option("Arrow Key Left: Rewind 5s");
    this.shortcut.option("Arrow Key Right: Forward 5s");

    //drop down list decoration
    this.shortcut.style('background-color', '#737CA1');
    this.shortcut.style('border-radius', '10px');
    this.shortcut.style('width', 20/100*width + "px");
    this.shortcut.style('padding', '3px');
    this.shortcut.style('font-size', '20px');
    this.shortcut.style('color', 'violet');

    //reset to default value.
    this.shortcut_unchange = function(){
        this.shortcut.selected("Keyboard Commands:");
    }
}

