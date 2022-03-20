const http = require("http")
const WebSocketServer = require("websocket").server
const server = http.createServer((req,res) => {})
let connection;
let users = ["Eren","Mikasa",'Armin']

// Handshake
const websocket = new WebSocketServer({
    "httpServer":server
})

// Gets Json: finds message, inserts server stuff
function signWithServer(message){
    let messageModified = message;
    messageModified['message'] = "Server says: " + message['message'];
    messageModified['type'] = "message"
    return messageModified;
}

// Request Logic 
websocket.on("request", req =>{
    connection = req.accept(null,req.origin)
    connection.on("close", () => {console.log("Close Connection")})
    connection.on("message", (message)=>{
        const data = JSON.parse(message.utf8Data)
        console.log("Message Received: " + data.message)
        // Just make sure the client can get distinguished information
        const ret = signWithServer(data);
        connection.send(JSON.stringify(ret))
    })
    // Send back user name
    const name = users[Math.floor(Math.random() * users.length)];
    const userData = JSON.stringify({type:"username",username: name})
    connection.send(userData)
})

server.listen(8080,()=>{console.log("server is ready at port 8080")})