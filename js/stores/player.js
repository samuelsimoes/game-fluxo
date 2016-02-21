import Fluxo from "fluxo-js";
import uuid from "node-uuid";

export default class extends Fluxo.ObjectStore {
  static defaults = {
    type: "player"
  };

  constructor () {
    super(...arguments);
    this.setAttribute("id", uuid.v1());
  }

  step (direction) {
    let intendedCoord = { x: this.data.x, y: this.data.y };

    if (direction === "n") {
      intendedCoord.x += 1;
    } else if (direction === "s") {
      intendedCoord.x -= 1;
    } else if (direction === "e") {
      intendedCoord.y += 1;
    } else {
      intendedCoord.y -= 1;
    }

    if (this.myPlace.coordIsAvailable(intendedCoord)) {
      this.set(intendedCoord);
    }
  }
}
