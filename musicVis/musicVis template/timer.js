//initial value
var timer = 3;

// count down timer
function timer_count(){
    if (frameCount % 60 == 0){
        timer-=1;
        if (timer == 0){
            timer = 3;
        }
    }
}