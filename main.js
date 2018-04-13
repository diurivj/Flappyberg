var canvas  = document.getElementById("mainGame");
var ctx     = canvas.getContext("2d");

//clases
function Board(){
  this.x        = 0;
  this.y        = 0;
  this.width    = canvas.width;
  this.height   = canvas.height;
  this.img      = new Image();
  this.img.src  = "http://ellisonleao.github.io/clumsy-bird/data/img/bg.png";
  this.score    = 0;
  
  this.img.onload = function(){
    this.draw();
  }.bind(this);
  
  this.draw = function(){
    this.move();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
    ctx.font = "50px Avenir";
    ctx.fillStyle = "red"
    ctx.fillText(this.score, this.width/2 - 20, this.y + 50);
  };

  this.move = function(){
    this.x --;
    if (this.x < -this.width) this.x = 0;
  };
}

function Flappy(){
  this.x        = 150;
  this.y        = 150;
  this.width    = 50;
  this.height   = 55;
  this.img = new Image();
  this.img.src = "assets/mark-zuckerberg-celebrity-mask.png";

  this.img.onload = function(){
    this.draw();
  }.bind(this);

  this.draw = function(){
    this.y += 1;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  };

  this.move = function(){
    this.y -=20;
  };
}

//declaraciones 
var board       = new Board();
var flappy      = new Flappy();
var intervalo;
var frames      = 0;

//main functions
function update(){
  frames ++;
  console.log(frames);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  board.draw();
  flappy.draw();
};

function start(){
  if (intervalo > 0) return;
  intervalo = setInterval(function(){
    update();
  }, 1000/60);
};

function stop(){
  clearInterval(intervalo);
  intervalo = 0;
};

//listeners 
document.getElementById("startBtn").addEventListener("click", start);
document.getElementById("pauseBtn").addEventListener("click", stop);

addEventListener("keydown", function(key){
  if (key.keyCode === 32){
    flappy.move();
  }
});