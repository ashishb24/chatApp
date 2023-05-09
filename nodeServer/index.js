//node srever will handle socket io connection
const io = require("socket.io")(4000, {
    cors:{origins: ["http://localhost:4000"]}
  });


const users = {};

io.on("connection", socket =>{
    socket.on("new-user-joined", nam =>{
        console.log("new user", nam);
        users[socket.id] = nam;
        socket.broadcast.emit("user-joined", nam);
    })
    socket.on("send",message =>{
        socket.broadcast.emit("receive",{message: message ,nam:users[socket.id]})
    })
    socket.on("disconnect",message =>{
        socket.broadcast.emit("left",users[socket.id])
        delete users[socket.id];
    })
})



