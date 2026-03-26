//draw a functional color picker, size and numbers of colors can be changed.
//this system dynamically adjusts the color picker according to colors in the colorList array
function colorPicker(x, y){
    //list of colors for the grid
    this.colorList = ["red", "green", "blue", "orange", "yellow", "indigo", "violet", "white", "black", "purple", "aqua", "pink", "gold", "goldenrod", "skyblue","lightblue", "#B0BF1A", "#EED9C4", "#3B7A57", "#FFBF00", "#9966CC", "#7FFFD4", "#FF9966", "#007FFF", "#0018A8", "#8A2BE2","#F5F5DC", "#FFE4C4", "azure", "#696969", "#8B008B"];
    //default color of color picker
    this.currentColor = this.colorList[0];
    //initial x,y values for color picker
    this.colorPickerX = x;
    this.colorPickerY = y;
    //number of color blocks in a line(in the color picker)
    this.gridMul = 7;
    //size of each color block
    var sizeInterval = 20;


    this.resize = function(x,y){
        this.colorPickerX = x;
        this.colorPickerY = y;
    }

//    check where mouse is pressed, then get the index of this.colorList
        this.pickColor = function(){
            // limit to only the area that contains the color picker
            if(mouseX>this.colorPickerX & 
               mouseX<this.colorPickerX+(sizeInterval*this.gridMul) &
               mouseY>this.colorPickerY &
               mouseY<this.colorPickerY+(sizeInterval*ceil(this.colorList.length/this.gridMul))
              ){
                //calculate index of the selected box based on mouse position (remove the need to create multiple if else statements)
                if(mouseIsPressed){
                    //calculate which column the mouse is on
                    var x = mouseX-(this.colorPickerX);
                    x = floor(x/sizeInterval);
                    //calculate which row the mouse is on
                    var y = mouseY-(this.colorPickerY);
                    y = floor(y/sizeInterval);
                    //column no. + (row no. * (no. of color box is in a row))
                    x += y*this.gridMul;
                    //check if index x exists
                    if(x<this.colorList.length){
                        this.currentColor = this.colorList[x];                    
                    }
                }            
            }
        }

    //draw a grid of colors as a color picker
    this.drawColorPicker = function(){
        //variable "a" is used to draw blocks in "new line" by increasing the y value with "a" and reducing the x value with "a" so blocks in new line are below blocks in the previous line
        var a=-1;

        //draw background for color picker
        stroke(100);
        strokeWeight(2);
        fill(100,100);
        rect(this.colorPickerX-1,
             this.colorPickerY-1,
             sizeInterval*this.gridMul+2,
             sizeInterval*ceil(this.colorList.length/this.gridMul)+2
            );
        stroke(0);
        strokeWeight(0);
        //draw color boxes in a line in multiples of this.gridMul
        for(var i=0; i<this.colorList.length; i++){
            //increase variable "a" by 1 after drawing this.gridMul no. of boxes
            if(i%this.gridMul==0){
                a++;
            }
            //draw color picker
            fill(this.colorList[i]);
            rect(this.colorPickerX+(sizeInterval*i) - sizeInterval * this.gridMul * a,
                 this.colorPickerY+(sizeInterval*a),
                 sizeInterval,sizeInterval);
        }
    }

    //execute all funcitons for ease of use
    this.functionPackageDoAll = function(x,y){
        this.resize(x,y);
        this.drawColorPicker();
        this.pickColor();
    }

    //select a random color
    this.Random = function(){
        var randomColor = random(this.colorList);
        return randomColor
    }
}