const socket = new WebSocket("ws://localhost:8080");
let user = document.getElementById("username");

socket.addEventListener('open', function(event){
    console.log("Conenction opened");
})

socket.addEventListener('close', function(event){
    console.log("Connection closed");
})
socket.addEventListener('message',function(event){
    let command = JSON.parse(event.data)
    // Getting a username
    if(command.type === "username"){
        user.innerHTML= command.username
    }
    else if(command.type === "message"){
        let elementExists = document.getElementById("message-list")
        // Create List if it doesn't already exist
        if(!elementExists){
            const node = document.createElement("ul");
            node.setAttribute("id","message-list");
            document.getElementById("messages").appendChild(node);
            elementExists = document.getElementById("message-list")
        }
        // Append contents from server to the list
        const liNode = document.createElement("li")
        const textNode = document.createTextNode(command.message);
        liNode.appendChild(textNode)
        elementExists.appendChild(liNode);
    }
})

// Sends the message to the server
document.querySelector('button').onclick = () =>{
    const value = document.getElementById("input_box").value
    socket.send(JSON.stringify({"message":value}))
}

//Logic to disbale button when nothing is typed
function EnableDisable(messageValue){
    const message = messageValue.value.trim();
    let button = document.querySelector("button");
    if(message !== ""){
        button.disabled = false;
    }
    else{
        button.disabled = true;
    }
}