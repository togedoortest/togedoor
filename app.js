


const express = require("express");
var path = require('path');
var indexRouter = require('./routes/vindex');
// const app = express();
const app = require('express')();
// var http = require('http');
const http = require('http').Server(app);
// const io = require('socket.io')(http);

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


var cookieParser = require('cookie-parser');

require("./config/db")();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var cors = require('cors')  //use this

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()) 
app.use(cookieParser());


app.use("/uploads", express.static("uploads"));


app.use('/', indexRouter);


app.use("/sendemail",require("./routes/sendEmail"))
app.use("/users", require("./routes/users"));
app.use("/services", require("./routes/services"));
app.use("/categories", require("./routes/categories"));

app.use("/payments", require("./routes/payments"));
app.use("/subcategories", require("./routes/subCategories"));



//test messages
const User = require("./models/User");
const Conversation = require("./models/Conversations");



console.log('fffffff');
io.on('connection', socket => {
  console.log('connected');
  const id = socket.handshake.query.id2
  socket.join(id)
console.log( id);
  socket.on('send-message', ({ recipients, text }) => {
    console.log('all res');
    console.log(recipients[0]);
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      console.log('newRecipients');
      console.log(newRecipients);
      console.log(text);
      console.log('id');
      console.log(id);
      
     const SaveInDataBase= async (text,id,recipients)=> {
        
   console.log('recipients[0]');
   console.log(recipients[0]);
   
        try {
      
          
          const user = await (await User.findById(recipients[0])).toObject();
          const MyUser = await (await User.findById(id)).toObject();

          const newConversation={firstname:MyUser.firstname,isChecked:false,ConnectedUserID:id,Topic:[text]}
const MyNewConversation={firstname:user.firstname,isChecked:false,ConnectedUserID:recipients[0],Topic:['@?FX56## '+text]}
          //user1 
              let ObjWithCoversation= user.conversations.find( ({ ConnectedUserID }) => ConnectedUserID == id)
              let index = user.conversations.findIndex(({ConnectedUserID}) => ConnectedUserID == id);
                   
                         if(!ObjWithCoversation)
                        {console.log(ObjWithCoversation);
                          const userFields = {
                            ...user,
                            conversations: [...user.conversations,newConversation],
                          };
                       
                          await  User.findByIdAndUpdate(
                            recipients[0],
                            { $set: userFields },
                            { new: true }
                          );
                      
                          }else{
      console.log('Available');
      
   
       let tempo=user
       tempo.conversations[index].Topic=[...user.conversations[index].Topic,text]
       
      console.log(tempo.conversations);
      
      await  User.findByIdAndUpdate(
        recipients[0],
        { $set: tempo },
        { new: true }
      );
     
      
                          }
                          
                          
           //MyUser
           let ObjWithCoversation2= MyUser.conversations.find( ({ ConnectedUserID }) => ConnectedUserID == recipients[0])
           let index2 = MyUser.conversations.findIndex(({ConnectedUserID}) => ConnectedUserID == recipients[0]);
                
                      if(!ObjWithCoversation2)
                     {
                   
                       const userFields2 = {
                         ...MyUser,
                         conversations: [...MyUser.conversations,MyNewConversation],
                       };
                       
                       await  User.findByIdAndUpdate(
                         id,
                         { $set: userFields2 },
                         { new: true }
                       );
                    
                       }else{
      console.log('Available2');
      
     
      let tempo2=MyUser
       tempo2.conversations[index2].Topic=[...MyUser.conversations[index2].Topic,'@?FX56## '+text]
      console.log(tempo2.conversations);
     
      await  User.findByIdAndUpdate(
      id,
      { $set: tempo2 },
      { new: true }
      );
  
      
                       }
                                 
              
      
      //##################
    
          } catch (err) {
            console.error(err);
  
          }
 
      
    } // end fun

    SaveInDataBase(text,id,recipients)
    

    const emitData = async()=>{
   
      
      
      const userEmit = await (await User.findById(recipients[0])).toObject();
      const userEmit2 = await (await User.findById(id)).toObject();
      
      const data=userEmit.conversations
      const data2=userEmit2.conversations

     io.to(recipient).emit('receive-message', {recipients: newRecipients, sender: id,text:data
    
     
      } )
 
      io.to(id).emit('receive-message', {recipients: newRecipients, sender: id,text:data2
    
        // socket.to(recipient).emit('receive-message', {recipients: newRecipients, sender: id,text:data
        // recipients: newRecipients, sender: id, text
        // broadcast
      } )
 
    }
    setTimeout(() => {
    emitData()
  
  }, 600);

    })
  })

})


const Message = require("./models/Messages")


const port = process.env.PORT || 9000;

//app.listen(PORT, () => {
//  Server.listen(port, () => {
  http.listen(port, () => {
  console.log("Server started on port " + port + "...");
});
// module.exports = httpServer;