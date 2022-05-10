import * as THREE from "three";
import { Gubox } from "./gubox";

type GridPos = { x: number; z: number };

type World = [number, number, number][][];

const increment = 0.075;
let controlsEnabled = true;

export class Player {
  model: THREE.Mesh;
  camera: THREE.Camera;
  gridPosition: GridPos;
  world: World;
  guboxes: Gubox[];

  constructor(
    model: THREE.Mesh,
    camera: THREE.Camera,
    gridPosition: GridPos,
    world: World,
    guboxes: Gubox[]
  ) {
    this.model = model;
    this.camera = camera;
    this.gridPosition = gridPosition;
    this.world = world;
    this.guboxes = guboxes;

    // Set initial position
    this.model.position.set(this.gridPosition.x, 0.5, this.gridPosition.z);
    this.camera.position.set(this.gridPosition.x, 3, this.gridPosition.z + 5);
    this.camera.rotateX(-0.5);

    // Setup controls
    this.setupControls();
  }

  private setupControls() {
    document.onkeydown = (e) => {
      if (controlsEnabled) {
        switch (e.key) {
          case "ArrowRight": {
            controlsEnabled = false;

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

    // hmm
    const ty = this.world[this.gridPosition.x][this.gridPosition.z][1] + 0.5;
    if (!(Math.abs(this.model.position.y - ty) < increment)) {
      if (this.model.position.y > ty) {
        this.model.position.y -= increment;
        this.camera.position.y -= increment;
      } else {
        this.model.position.y += increment;
        this.camera.position.y += increment;
      }
    } else {
      this.model.position.y = ty;
      this.camera.position.y = ty + 2.5;
    }

    if (
      this.model.position.x == this.gridPosition.x &&
      this.model.position.z === this.gridPosition.z
    ) {
      // Set height according to world tile
      // const [tx, ty, tz] = this.world[this.gridPosition.x][this.gridPosition.z];
      // this.model.position.setY(ty + 0.5);
      // this.camera.position.setY(ty + 2.5);
      controlsEnabled = true;
    }
  }

  updatePosition(newPos: GridPos) {
    this.gridPosition = newPos;

    const capturedGubox = this.guboxes.find(
      (gubox) =>
        gubox.gridPosition.x === this.gridPosition.x &&
        gubox.gridPosition.z === this.gridPosition.z
    );

    if (capturedGubox) {
      capturedGubox.capture();
    }
  }
}
