var app = require("express")(); 
var http = require("http").Server(app); 
var io = require("socket.io")(http); 
var Usercounter = 0; 
var elma;
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("Client connected");

  socket.on("disconnect", function() {
    console.log("Client Left");
  });


socket.on("availability", function(sfrequency,message) {
   socket.to(sfrequency).emit("availability", message);
   console.log(sfrequency,message)

  });


  socket.on("voicedata", function(ses,frequency) {
   if (isNaN(frequency) || frequency < 1000000 || frequency > 9999999) {
   console.log("Client try something new.")
  } else {
   socket.join(frequency);
   socket.to(frequency).emit("voicedata", ses);
   console.log("Sended to",frequency)
  }

  });
});
http.listen(80, function() {
  console.log(":80 listening");
});
