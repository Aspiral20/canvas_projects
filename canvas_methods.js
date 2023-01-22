/*
let canvas = document.getElementById('canvas'),
  context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let xRect = 50;
let yRect = 50;
let widthRect = 300;
let heightRect = 200;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;
let radiusArc = 100;
let antiClock = false;

context.fillRect(50,50,300,200);       //coloreaza un patrat

setInterval(() => {     //animatii canvas->requestAnimationFrame
  if (xRect + widthRect >= canvas.width) {
    return 0
  } else {
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height)

  context.fillStyle = 'green';
  context.fillRect(xRect++, yRect, widthRect, heightRect)
  }
}, 10)

context.strokeStyle = 'darkred';
context.lineWidth = 10;
context.strokeRect(xRect,yRect,widthRect,heightRect)

context.fillStyle = 'black';
context.arc(centerX, centerY, radiusArc, 0, 2 * Math.PI, antiClock);
context.fill()

context.scale(2,2)
context.rotate(20 * Math.PI/180)

context.beginPath();            //initializeaza punctul de inceput al obiectului
context.moveTo(50, 50);
context.lineTo(50, 100);
context.lineTo(100, 100);
context.lineTo(100, 50);
context.closePath();       //traseaza o linie catre punctul initial. Punctul lui beginPath()
context.stroke();

let gradient = context.createLinearGradient(0, 0, 70, 0)    //x0,y0 - inceput; x1,y1 - sfarsit
gradient.addColorStop('0', 'red')
gradient.addColorStop('.5', 'green')
gradient.addColorStop('1', 'blue')

context.fillStyle = gradient

context.font = "20px Roboto";
context.fillText("Hello world!", 0, 70)
*/
