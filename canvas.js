let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");


let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = pencilWidthElem.value;

let mouseDown = false;
// API
let tool = canvas.getContext("2d");

// tool.strokeStyle = 'blue'
// tool.lineWidth = '6'
// tool.beginPath(10,10)  //  new graphic (path) (line)
// tool.moveTo(100,10)  // start point
// tool.lineTo(100,100)  // end point
// tool.stroke() // fill color or fill graphic

// tool.beginPath() // for the new line
// tool.strokeStyle = 'red'
// tool.moveTo(10,10)
// tool.lineTo(100,180)
// tool.stroke()

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// MouseDown => start new path , mousemove => fill path (graphics)

canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
  beginPath({
    x: e.clientX,
    y: e.clientY,
  });
});

canvas.addEventListener("mousemove", (e) => {
  if (mouseDown)
    drawStroke({
      x: e.clientX,
      y: e.clientY,
    });
});

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;
});
function beginPath(strokeObje) {
  tool.beginPath();
  tool.moveTo(strokeObje.x, strokeObje.y);
}

function drawStroke(strokeObje) {
  tool.lineTo(strokeObje.x, strokeObje.y);
  tool.stroke();
}
pencilColor.forEach((colorElem) => {
  colorElem.addEventListener("click", (e) => {
    let color = colorElem.classList[0];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});

pencilWidthElem.addEventListener("change", (e) => {
  penWidth = pencilWidthElem.value;
  tool.lineWidth = penWidth;
});

eraserWidthElem.addEventListener("change", (e) => {
  eraserWidth = eraserWidthElem.value;
  tool.lineWidth = eraserWidth;
});

eraser.addEventListener('click' , (e)=>{
    if(eraserFlag){
        tool.strokeStyle = eraserColor
        tool.lineWidth = eraserWidth
    }
    else{
        tool.strokeStyle = penColor
        tool.lineWidth = penWidth
    }
})
