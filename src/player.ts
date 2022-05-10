import * as THREE from "three";

type GridPos = { x: number; z: number };

const increment = 0.1;
let controlsEnabled = true;

export class Player {
  model: THREE.Mesh;
  camera: THREE.Camera;
  gridPosition: GridPos;

  constructor(model: THREE.Mesh, camera: THREE.Camera, gridPosition: GridPos) {
    this.model = model;
    this.camera = camera;
    this.gridPosition = gridPosition;

    // Set initial position
    this.model.position.set(this.gridPosition.x, 0.5, this.gridPosition.z);
    this.camera.position.set(this.gridPosition.x, 3, this.gridPosition.z + 5);
    this.camera.rotateX(-0.5);

    // Setup controls
    this.setupControls();
  }

  private setupControls() {
    document.onkeydown = (e) => {
      console.log(controlsEnabled);
      if (controlsEnabled) {
        switch (e.key) {
          case "ArrowRight": {
            controlsEnabled = false;
            console.log(controlsEnabled);
            this.updatePosition({
              x: this.gridPosition.x + 1,
              z: this.gridPosition.z,
            });
            return;
          }
          case "ArrowLeft": {
            controlsEnabled = false;
            this.updatePosition({
              x: this.gridPosition.x - 1,
              z: this.gridPosition.z,
            });
            return;
          }
          case "ArrowUp": {
            controlsEnabled = false;
            this.updatePosition({
              x: this.gridPosition.x,
              z: this.gridPosition.z - 1,
            });
            return;
          }
          case "ArrowDown": {
            controlsEnabled = false;
            this.updatePosition({
              x: this.gridPosition.x,
              z: this.gridPosition.z + 1,
            });
            return;
          }
        }
      }
    };
  }

  render() {
    if (!(Math.abs(this.model.position.x - this.gridPosition.x) < increment)) {
      if (this.model.position.x > this.gridPosition.x) {
        this.model.position.x -= increment;
        this.camera.position.x -= increment;
      } else {
        this.model.position.x += increment;
        this.camera.position.x += increment;
      }
    } else {
      this.model.position.x = this.gridPosition.x;
      this.camera.position.x = this.gridPosition.x;
    }

    if (!(Math.abs(this.model.position.z - this.gridPosition.z) < increment)) {
      if (this.model.position.z > this.gridPosition.z) {
        this.model.position.z -= increment;
        this.camera.position.z -= increment;
      } else {
        this.model.position.z += increment;
        this.camera.position.z += increment;
      }
    } else {
      this.model.position.z = this.gridPosition.z;
      this.camera.position.z = this.gridPosition.z + 5;
    }

    if (
      this.model.position.x == this.gridPosition.x &&
      this.model.position.z === this.gridPosition.z
    ) {
      controlsEnabled = true;
    }
  }

  updatePosition(newPos: GridPos) {
    this.gridPosition = newPos;
  }
}
