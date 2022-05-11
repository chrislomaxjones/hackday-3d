import * as THREE from "three";
import { onPrizeWon } from "../prizes";
import { Entity, GridPos } from "./entity";

type State = "free" | "capturing" | "captured";

export class Gubox implements Entity {
  model: THREE.Mesh;
  state: State;
  gridPosition: GridPos;

  constructor(x: number, y: number, z: number) {
    this.model = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2.5),
      new THREE.MeshToonMaterial({ color: 0x506991 })
    );

    this.gridPosition = { x, z };
    this.model.position.set(x, y, z);
    this.model.scale.multiply(new THREE.Vector3(0.8, 1, 0.8));

    this.state = "free";
  }

  capture() {
    if (this.state !== "captured") {
      this.state = "capturing";
      onPrizeWon();
    }
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
