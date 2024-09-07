import express from "express";


const app = express();

app.get('/api/user', (req,res)=> {
    console.log("Hello")
    res.send("<h1>HELLO</h1>")
})



app.listen(3022, ()=>{
    console.log("Server is listening on 3022")
})