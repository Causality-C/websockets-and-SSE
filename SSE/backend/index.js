const express = require("express")
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors())
const pool = require("./db")

// REST INTERFACE for Feed Database
app.get('/feed',async(req,res)=>{
    const feed = await pool.query("SELECT * from feed");
    res.json(feed.rows)
})

app.post("/feed", async(req,res)=>{
    // Assume that body request is valid
    const {description, name} = req.body;
    const newFeedItem = await pool.query(`insert into feed (description, name, time_stamp) values ('${description}', '${name}',to_timestamp(${Date.now()/1000.0})) RETURNING *`);
    res.json(newFeedItem.rows[0])
})

// Server Sent Events
app.get("/realtime-feed", async(req,res)=>{
    res.setHeader("Content-Type","text/event-stream");
    // number of elements 
    let i = 0;
    // Dont know if this is best practice
    setInterval(async()=>{
        const feed = await pool.query("SELECT * from feed");
        let c = feed.rows.length
        if(c > i){
            // Take difference and send back
            const diff = feed.rows.slice(i,c+1)
            res.write(`data: ${JSON.stringify({"difference":diff})}\n\n`);
        }
        i = c;
    },10000) // Do every ten seconds
})
app.listen(5000,() =>{
    console.log("Server Listening on Port 5000");
})