import * as THREE from "three";
import { Entity, GridPos } from "./entity";

export class Lamp implements Entity {
  model: THREE.Mesh;
  light: THREE.Light;
  gridPosition: GridPos;

  constructor(x: number, y: number, z: number) {
    this.model = new THREE.Mesh(
      new THREE.SphereGeometry(0.25),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    this.light = new THREE.PointLight(0xfffde0, 0.2, 30);

    this.gridPosition = { x, z };
    this.light.position.set(x, y + 4, z);
    this.model.position.set(x, y, z);
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.model, this.light);
  }
}
