import * as THREE from "three";

type GridPos = { x: number; z: number };

// const points = [];
// for (let i = 0; i < 10; i++) {
//   points.push(new THREE.Vector2(Math.sqrt(i), Math.sqrt(i)));
// }
// const geometry = new THREE.LatheGeometry(points);

export class Tree {
  modelTop: THREE.Mesh;
  modelBottom: THREE.Mesh;
  gridPosition: GridPos;

  constructor(x: number, y: number, z: number) {
    const heightMod = Math.random() * 2;

    this.modelTop = new THREE.Mesh(
      new THREE.ConeGeometry(5, 8, 8),
      new THREE.MeshToonMaterial({ color: 0xa2b38b })
    );

    this.modelBottom = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.2, 0.6 + 2 * heightMod),
      new THREE.MeshToonMaterial({ color: 0xe6ba95 })
    );

    this.gridPosition = { x, z };
    this.modelTop.position.set(x, y + 1 + heightMod, z);
    this.modelBottom.position.set(x, y + 0.5, z);

    this.modelTop.scale.multiplyScalar(0.08);
    // this.modelTop.position.y -= 0.064;
  }
}
