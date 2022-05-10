import * as THREE from "three";

type GridPos = { x: number; z: number };

export class Player {
  model: THREE.Mesh;
  camera: THREE.Camera;
  gridPosition: GridPos;

  constructor(model: THREE.Mesh, camera: THREE.Camera, gridPosition: GridPos) {
    this.model = model;
    this.camera = camera;
    this.gridPosition = gridPosition;

    // Set initial position
    this.model.position.set(this.gridPosition.x, 1, this.gridPosition.z);
    this.camera.position.set(this.gridPosition.x, 2, this.gridPosition.z + 5);

    // Setup controls
    this.setupControls();
  }

  private setupControls() {
    document.onkeydown = (e) => {
      switch (e.key) {
        case "ArrowRight": {
          this.updatePosition({
            x: this.gridPosition.x + 1,
            z: this.gridPosition.z,
          });
          return;
        }
        case "ArrowLeft": {
          this.updatePosition({
            x: this.gridPosition.x - 1,
            z: this.gridPosition.z,
          });
          return;
        }
        case "ArrowUp": {
          this.updatePosition({
            x: this.gridPosition.x,
            z: this.gridPosition.z - 1,
          });
          return;
        }
        case "ArrowDown": {
          this.updatePosition({
            x: this.gridPosition.x,
            z: this.gridPosition.z + 1,
          });
          return;
        }
      }
    };
  }

  updatePosition(newPos: GridPos) {
    this.gridPosition = newPos;
    this.model.position.set(newPos.x, 1, newPos.z);
    this.camera.position.set(newPos.x, 2, newPos.z + 5);
  }
}
