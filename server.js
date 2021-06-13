const { Socket } = require('dgram');
const express = require('express');
const { dirname } = require('path');
const app = express();
const path = require('path');
const http = require('http').Server(app);
const port =process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
http.listen(port,()=>{
    
    console.log(` hello world ${port}`);

})  
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
    
})
const io =require('socket.io')(http);
io.on('connection',(socket)=>{
    console.log("connected....");
    
            socket.on('message',(msg)=>{
                console.log(msg);
                socket.broadcast.emit('message',msg);
            })
})
