const app=require("express")();
const server=require('http').createServer(app);
const io=require('socket.io')(server)
const mongoose=require('mongoose')
var schema=mongoose.Schema({
  'username':{type:'String',require:true},
  'message':{type:'String',require:true},
  'timestamp':{type:'number',require:true}
})




var message=[];
var mongodb='mongodb+srv://wakurdedarshan:HelloWorld7@cluster0.bhajvga.mongodb.net/?retryWrites=true&w=majority'




mongoose.connect(mongodb)
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code here
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });



io.on("connection",(socket)=>{
    console.log("Okk Connected");
socket.on('roomid',(roomid)=>{
  const Msg=mongoose.model(roomid,schema);
   console.log(roomid)
    Msg.find().then((result)=>{
      io.emit(roomid,result);
    console.log(result)
})
    socket.on(roomid,(data)=>{

console.log(data)
      const message1=new Msg({username:data.username,message:data.message,timestamp:Date.now()});
      message1.save().then(()=>{
        socket.to(roomid).emit(data);
        console.log(message1)
      })
});
})
    })


  


   





server.listen(5000,()=>{
console.log("http://localhost:5000/");
});