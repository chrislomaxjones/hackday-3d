import * as THREE from "three";

export class Moon {
  model: THREE.Mesh;
  ring: THREE.Mesh;
  light: THREE.DirectionalLight;
  constructor(x: number, y: number, z: number) {
    this.model = new THREE.Mesh(
      new THREE.OctahedronGeometry(12, 5),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    this.ring = new THREE.Mesh(
      new THREE.TorusGeometry(14, 1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );

    this.light = new THREE.DirectionalLight(0xffffff, 0.1);

    this.light.position.set(x, y + 20, z + 20);
    this.light.rotateX(-1.5);

    this.model.position.set(x, y, z);
    this.ring.position.set(x, y, z);
    this.ring.rotateX(1.2);
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.model, this.ring, this.light);
  }

  render() {
    this.ring.rotation.y += 0.005;
  }
}
