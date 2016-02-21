import Fluxo from "fluxo-js";

export default class extends Fluxo.CollectionStore {
  constructor () {
    super(...arguments);
    this.loadBounds();
  }

  loadBounds () {
    for (let i = 0, l = this.data.width; i < l; i++) {
      this.addStores([
        { y: i, x: 0, type: "bound" },
        { y: i, x: (this.data.height - 1), type: "bound" }
      ]);
    }

    for (let i = 1, l = (this.data.height - 1); i < l; i++) {
      this.addStores([
        { y: 0, x: i, type: "bound" },
        { y: (this.data.width - 1), x: i, type: "bound" }
      ]);
    }
  }

  put (element) {
    element.myPlace = this;

    let freeCord = this.findFreeCord();

    if (freeCord) {
      element.set(freeCord);
      this.addStore(element);
    }
  }

  findFreeCord () {
    return { x: 3, y: 3 };
  }

  coordIsAvailable (coord) {
    return (typeof this.findWhere(coord) === "undefined");
  }
}
