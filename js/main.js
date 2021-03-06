import Place from "./stores/place";
import Player from "./stores/player";
import React from "react";
import Connector from "fluxo-react-connect-stores";
import Space from "./components/space";
import SocketIO from "socket.io-client";
import { render } from "react-dom";

let innerBounds = [
  { type: "bound", x: 5, y: 5 },
  { type: "bound", x: 5, y: 6 },
  { type: "bound", x: 5, y: 7 },
  { type: "bound", x: 9, y: 8 },
  { type: "bound", x: 9, y: 9 },
  { type: "bound", x: 9, y: 10 }
];

let place = new Place(innerBounds, { width: 20, height: 15 }),
    player = new Player();

let socket = SocketIO.connect();

window.addEventListener("beforeunload", function() {
  socket.emit("playerExit", player.data.id);
});

player.on(["change:x", "change:y"], function () {
  socket.emit("playerMovement", this.data);
});

socket.on("connected", function (playersData) {
  place.addStores(playersData);
  place.put(player);
  socket.emit("enterNewPlayer", player.data);
});

socket.on("playerMovemented", (data) => {
  if (data.id === player.data.id) { return; }
  place.setStores([data]);
});

socket.on("playerEntered", (data) => {
  if (data.id === player.data.id) { return; }
  place.addStore(data);
});

socket.on("playerExit", (id) => {
  place.remove(place.find(id));
});

let directions = { 37: "w", 38: "s", 39: "e", 40: "n" };

window.addEventListener("keydown", (evt) => {
  let direction = directions[evt.keyCode];

  if (direction) {
    player.step(direction);
  }
});

let ConnectedSpace = Connector(Space, { place: place });

render(
  <ConnectedSpace/>,
  document.getElementById("root")
);
