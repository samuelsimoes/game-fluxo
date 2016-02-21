import Place from "./stores/place";
import Player from "./stores/player";
import React from "react";
import Connector from "fluxo-react-connect-stores";
import Space from "./components/space";
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

place.put(player);

window.addEventListener("keydown", function (evt) {
  let direction;

  switch (evt.keyCode) {
    case 37:
      direction = "w";
      break;
    case 38:
      direction = "s";
      break;
    case 39:
      direction = "e";
      break;
    case 40:
      direction = "n";
      break;
    default:
      direction = null;
      break;
  }

  if (direction) {
    player.step(direction);
  }
});

let ConnectedSpace = Connector(Space, { place: place });

render(
  <ConnectedSpace/>,
  document.getElementById("root")
);
