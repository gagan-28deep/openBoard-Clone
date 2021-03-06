// const  { socket }  = require("socket.io");

let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");


let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");

let download = document.querySelector(".download");

let undoRedoTracker = []; // Data
let track = 0; // Represent which action from Tracker to take

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = pencilWidthElem.value;

let mouseDown = false;



// API
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// MouseDown => start new path , mousemove => fill path (graphics)

canvas.addEventListener("mousedown", (e) => {
  mouseDown = true;
//   beginPath({
//     x: e.clientX,
//     y: e.clientY,
   
//   });
let data = {
    x : e.clientX,
    y : e.clientY
}
  socket.emit('beginPath' , data)
});

canvas.addEventListener("mousemove", (e) => {
  if (mouseDown)
  {
      let data = {
        x: e.clientX,
        y: e.clientY,
        color: eraserFlag ? eraserColor : penColor,
        width: eraserFlag ? eraserWidth : penWidth,
      }
   
    // drawStroke({
    //   x: e.clientX,
    //   y: e.clientY,
    //   color: eraserFlag ? eraserColor : penColor,
    //   width: eraserFlag ? eraserWidth : penWidth,
    // });
    socket.emit('drawStroke' , data)
  }
});

canvas.addEventListener("mouseup", (e) => {
  mouseDown = false;

  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

undo.addEventListener("click", (e) => {
    // Track -- 
    if (track > 0) track--;
    // track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    // undoRedoCanvas(data)
    socket.emit('redoUndo' , data)
})
redo.addEventListener("click", (e) => {
     // Track ++
    if (track < undoRedoTracker.length-1) track++;
    // track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    // undoRedoCanvas(data)
    socket.emit('redoUndo' , data)
})
function undoRedoCanvas(trackObj) {
    
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;

    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function beginPath(strokeObje) {
  tool.beginPath();
  tool.moveTo(strokeObje.x, strokeObje.y);
}

function drawStroke(strokeObje) {
  tool.strokeStyle = strokeObje.color;
  tool.lineWidth = strokeObje.width;
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

eraser.addEventListener("click", (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = penColor;
    tool.lineWidth = penWidth;
  }
});
download.addEventListener("click", (e) => {
  let url = canvas.toDataURL();

  // To download
  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});

socket.on('beginPath' , (data)=>{
    // data -> data from server
    beginPath(data)
})

socket.on('drawStroke' , (data)=>{
    drawStroke(data)
})


socket.on('redoUndo' , (data)=>{
    undoRedoCanvas(data)
})

