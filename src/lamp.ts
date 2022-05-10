import * as THREE from "three";

type GridPos = { x: number; z: number };

export class Lamp {
  model: THREE.Mesh;
  light: THREE.Light;
  gridPosition: GridPos;

  constructor(x: number, y: number, z: number) {
    this.model = new THREE.Mesh(
      new THREE.SphereGeometry(0.25),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    this.light = new THREE.PointLight(0xfffde0, 0.5, 25);

    this.gridPosition = { x, z };
    this.light.position.set(x, y + 4, z);
    this.model.position.set(x, y, z);
  }
}
