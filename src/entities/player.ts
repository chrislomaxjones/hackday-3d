import * as THREE from "three";
import { Entity, GridPos } from "./entity";
import { Gubox } from "./gubox";
import { Tree } from "./tree";

type World = [number, number, number][][];

const increment = 0.075;
let controlsEnabled = true;

const almostEqual = (a: number, b: number, delta = 0.01) =>
  Math.abs(a - b) < delta;

export class Player implements Entity {
  model: THREE.Mesh;
  camera: THREE.Camera;
  gridPosition: GridPos;
  world: World;
  entities: Entity[];

  constructor(
    model: THREE.Mesh,
    camera: THREE.Camera,
    gridPosition: GridPos,
    world: World,
    guboxes: Entity[]
  ) {
    this.model = model;
    this.camera = camera;
    this.gridPosition = gridPosition;
    this.world = world;
    this.entities = guboxes;

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

  scaleDown = false;

  render() {
    if (almostEqual(this.model.scale.x, 1.1)) {
      this.scaleDown = true;
    } else if (almostEqual(this.model.scale.x, 0.95)) {
      this.scaleDown = false;
    }

    if (this.scaleDown) {
      this.model.scale.multiplyScalar(0.99);
    } else {
      this.model.scale.multiplyScalar(1.01);
    }

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

    const ty = this.world[this.gridPosition.x][this.gridPosition.z][1] + 1;

    if (!(Math.abs(this.model.position.y - ty) < increment)) {
      if (this.model.position.y > ty) {
        this.model.position.y -= 0.5 * increment;
        this.camera.position.y -= 0.5 * increment;
      } else {
        this.model.position.y += 0.5 * increment;
        this.camera.position.y += 0.5 * increment;
      }
    } else {
      this.model.position.y = ty;
      this.camera.position.y = ty + 2.5;
    }

    if (
      this.model.position.x == this.gridPosition.x &&
      this.model.position.z === this.gridPosition.z &&
      this.model.position.y === ty
    ) {
      controlsEnabled = true;
    }
  }

  updatePosition(newPos: GridPos) {
    // Don't fall off edge...
    if (newPos.x < 0 || newPos.z < 0 || newPos.x > 49 || newPos.z > 49) {
      return;
    }

    const collidingEntity = this.entities.find(
      (entity) =>
        entity.gridPosition.x === newPos.x && entity.gridPosition.z === newPos.z
    );

    if (collidingEntity instanceof Tree) {
      // Can't move into a space occupied by a tree - do nothing
      return;
    }

    if (collidingEntity instanceof Gubox) {
      // Capture a Gubox and proceed
      collidingEntity.capture();
    }

    this.gridPosition = newPos;
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.model);
  }
}
