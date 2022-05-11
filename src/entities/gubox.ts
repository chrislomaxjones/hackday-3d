import * as THREE from "three";
import { onPrizeWon } from "../prizes";
import { Entity, GridPos } from "./entity";

type State = "free" | "capturing" | "captured";

let guboxId = 0;

const getNewId = () => {
  const id = guboxId;
  guboxId += 1;
  return id;
};

export class Gubox implements Entity {
  id: number;
  model: THREE.Mesh;
  state: State;
  gridPosition: GridPos;

  constructor(x: number, y: number, z: number) {
    this.id = getNewId();

    this.model = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2),
      new THREE.MeshToonMaterial({ color: 0x506991 })
    );

    this.gridPosition = { x, z };
    this.model.position.set(x, y, z);

    this.state = "free";
  }

  capture() {
    this.state = "capturing";
    onPrizeWon(this.id);
  }

  render() {
    if (this.state === "capturing") {
      this.model.scale.multiplyScalar(0.8);
    }

    if (this.model.scale.x < 0.001) {
      this.state = "captured";
    }
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.model);
  }
}
