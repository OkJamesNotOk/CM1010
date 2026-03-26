function Spectrum(){
    this.name = "spectrum";

    this.draw = function(){
        push();
        var spectrum = fourier.analyze();
        noStroke();

        var c1 = color(0,255,0);
        var c2 = color(255,0,0);

        for (var i = 0; i< spectrum.length; i++){            
            var y = map(i, 0, spectrum.length, 0, (height-50));
            var h = map(spectrum[i], 0, 255, 0, width);
            var c = lerpColor(c1,c2,spectrum[i]/255);
            fill(c);
            rect(0, y, h, (height-50)/spectrum.length );
        }	
        pop();
    };

    this.unSelectVisual = function(){

    }

    this.selectVisual = function(){

    }
}
