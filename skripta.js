var canvas = document.getElementById("canvas");
var nesto = canvas.getContext("2d");
var snegPoEkranu = 245;
var snegArray = [];
var w,h;

w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function random(min, max) {
    return min + Math.random() * (max - min + 1);
};

function clientResize(ev){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
};

window.addEventListener("resize", clientResize);

function kreirajSneg() {
    for(var i = 0; i < snegPoEkranu; i++){
        snegArray.push({
            x: Math.random() * w,  
            y: Math.random() * h,  
            opacity: Math.random(),  
            speedX: random(-11, 11),  
            speedY: random(7, 15),    
            radius:random(0.5, 4.2),
        })
    }
};

function nacrtajSneg(){
    
    for(var i = 0; i < snegArray.length; i++){    
        var gradient = nesto.createRadialGradient(  
            snegArray[i].x,   
            snegArray[i].y,   
            0,                     
            snegArray[i].x,   
            snegArray[i].y,   
            snegArray[i].radius  
            );

            gradient.addColorStop(0, "rgba(255, 255, 255," + snegArray[i].opacity + ")");  
            gradient.addColorStop(.8, "rgba(210, 236, 242," + snegArray[i].opacity + ")");  
            gradient.addColorStop(1, "rgba(237, 247, 249," + snegArray[i].opacity + ")"); 
          
            nesto.beginPath(); 
            nesto.arc(
            snegArray[i].x,  
            snegArray[i].y,  
            snegArray[i].radius,  
            0,                         
            Math.PI*2,                 
            false                     
            );

        nesto.fillStyle = gradient;   
        nesto.fill();                 
    }
};

function pomeriSneg(){
    for (var i = 0; i < snegArray.length; i++) {
        snegArray[i].x += snegArray[i].speedX;     
        snegArray[i].y += snegArray[i].speedY;     

        if (snegArray[i].y > h) {                                                                               
            snegArray[i].x = Math.random() * w * 1.5;
            snegArray[i].y = -50;
        }
    }
};

function updateSnowFall  () {
    nesto.clearRect(0, 0, w, h);
    nacrtajSneg();
    pomeriSneg();
};

setInterval(updateSnowFall,50);
kreirajSneg();