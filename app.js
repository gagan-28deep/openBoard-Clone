const express = require("express"); // Access
const socket = require("socket.io");

const app = express(); //Initialized and server ready

app.use(express.static("public"));

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log("Listening to port " + port);
})

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Made socket connection");

    // Received Data
    socket.on('beginPath' , (data)=>{
        // Data -> data from frontEnd
        // Now transer data to all connected computer
        io.sockets.emit('beginPath' , data)
    })
    socket.on('drawStroke' , (data)=>{
        // Data -> data from frontEnd
        // Now transer data to all connected computer
        io.sockets.emit('drawStroke' , data)
    })
    socket.on('redoUndo' , (data)=>{
        // Data -> data from frontEnd
        // Now transer data to all connected computer
        io.sockets.emit('redoUndo' , data)
    })
})