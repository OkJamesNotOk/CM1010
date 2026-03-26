var shape;
var pattern;

function FireworkEffect(){
    this.name = "Firework";

    var fireworks;

    this.setup = function(){
        background(0);
        angleMode(DEGREES);
        frameRate(60);
        beatDetect = new BeatDetect();

        fireworks = new Fireworks();

        //drop down list for selecting shape of particles
        this.shape_select;
        this.shape_select = createSelect();
        this.shape_select.position(25,height-100);
        this.shape_select.option("Circle");
        this.shape_select.option("Triangle");
        this.shape_select.option("Square");

        //drop down list decoration
        this.shape_select.style('background-color', '#537CA1');
        this.shape_select.style('border-radius', '10px');
        this.shape_select.style('width', '150px');
        this.shape_select.style('padding', '3px');
        this.shape_select.style('font-size', '20px');
        this.shape_select.style('color', 'violet');

        //value of dropdown list
        this.shape = this.shape_select.value();

        //drop down list for selecting pattern of particles
        this.pattern_select;
        this.pattern_select = createSelect();
        this.pattern_select.position(25,height-40);
        this.pattern_select.option("Circle");
        this.pattern_select.option("Star");

        //drop down list decoration
        this.pattern_select.style('background-color', '#936DA2');
        this.pattern_select.style('border-radius', '10px');
        this.pattern_select.style('width', '150px');
        this.pattern_select.style('padding', '3px');
        this.pattern_select.style('font-size', '20px');
        this.pattern_select.style('color', 'violet');

        //value of dropdown list
        this.pattern = this.pattern_select.value();
    }

    //remove elements when visualistion is changed
    this.unSelectVisual = function(){
        this.shape_select.remove();
        this.pattern_select.remove();
        angleMode(RADIANS);
    }
    //call setup when this visualisation is select
    this.selectVisual = function(){
        this.setup();
        stroke(0);
    } 

    //assign dropdown list value to variables
    this.check_select = function(){
        shape = this.shape_select.value();
    }
    this.check_select2 = function(){
        pattern = this.pattern_select.value();
    }

    this.setup();

    this.draw = function(){
        background(0);
        var spectrum = fourier.analyze();
        if(beatDetect.detectBeat(spectrum)){
            fireworks.addFirework();
        }
        fireworks.update();

        fill("green");
        textSize(20);
        text("Shape:", width/2+175,height-100);
        text("Pattern:", width/2+175,height-60);
        
        //automatically resize
        this.onResize();

        //automatically select the value of the drop down list
        this.check_select();
        this.check_select2();
    }
    this.unSelectVisual();

    this.onResize = function(){
        this.shape_select.position(width/2 + 250,height-120);
        this.pattern_select.position(width/2 + 250,height-80);
    }
}