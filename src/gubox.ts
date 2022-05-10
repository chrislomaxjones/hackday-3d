import * as THREE from "three";

type GridPos = { x: number; z: number };

export class Gubox {
  model: THREE.Mesh;

  gridPosition: GridPos;

  constructor(x: number, y: number, z: number) {
    this.model = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2),
      new THREE.MeshToonMaterial({ color: 0x506991 })
    );

    this.gridPosition = { x, z };
    this.model.position.set(x, y, z);
  }
}
