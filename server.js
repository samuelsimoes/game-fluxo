var express = require("express"),
    app = express();

app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 3000);

var io = require("socket.io")(server);

var connectedPlayers = {};

io.on("connection", function (socket) {
  var players = [];

  for (var playerId in connectedPlayers) {
    players.push(connectedPlayers[playerId]);
  }

  socket.emit("connected", players);

  socket.on("playerExit", function (id) {
    delete connectedPlayers[id];
    socket.broadcast.emit("playerExit", id);
  });

  socket.on("enterNewPlayer", function (playerData) {
    connectedPlayers[playerData.id] = playerData;
    socket.broadcast.emit("playerEntered", playerData);
  });

  socket.on("playerMovement", function (playerData) {
    connectedPlayers[playerData.id] = playerData;
    socket.broadcast.emit("playerMovemented", playerData);
  });
});
