const socket = io("http://localhost:4000");

const form = document.getElementById("send-container")
const messageInput = document.getElementById("messageInp")
const messageContainer = document.querySelector(".container")
const audio =new Audio("ting.mp3");


const append =(message,position)=>{
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message")
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if (position=="left") {
        audio.play();
    }

}


const nam = prompt("Enter your name to join");
socket.emit("new-user-joined",nam )
console.log(nam);

socket.on("user-joined", nam =>{
append(`${nam} joined the chat`,"left")
})

socket.on("receive", data =>{
    append(`${data.nam} : ${data.message}`,"left")
    })
socket.on("left", nam =>{
    append(`${nam} left the chat`,"left")
    })


    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        const message=messageInput.value;
        append(`you: ${message}`, "right")
        socket.emit("send", message);
        messageInput.value = "";
    })