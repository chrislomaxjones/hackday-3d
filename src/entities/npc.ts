import * as THREE from "three";
import { Entity, GridPos } from "./entity";
import { Gubox } from "./gubox";
import { Player } from "./player";
import { Tree } from "./tree";

const cols = [0x655d8a, 0x7897ab, 0xd885a3, 0xfdceb9];

const chooseRandomCol = (): THREE.ColorRepresentation => {
  return cols[Math.round(Math.random() * cols.length)];
};

const increment = 0.075;

type World = [number, number, number][][];

export class NPC implements Entity {
  model: THREE.Mesh;
  modelTop: THREE.Mesh;
  //modelBottom: THREE.Mesh;
  gridPosition: GridPos;
  world: World;
  entities: Entity[];
  player: Player;

  constructor(
    x: number,
    y: number,
    z: number,
    entities: Entity[],
    world: World,
    player: Player
  ) {
    this.entities = entities;
    this.world = world;
    this.player = player;

    const color = chooseRandomCol();

    this.model = new THREE.Mesh(
      new THREE.SphereGeometry(0.4),
      new THREE.MeshToonMaterial({ color })
    );

    this.modelTop = new THREE.Mesh(
      new THREE.ConeGeometry(5, 8, 8),
      new THREE.MeshToonMaterial({ color })
    );

    this.gridPosition = { x, z };
    this.model.position.set(x, y + 1, z);
    this.model.scale.multiplyScalar(0.8);

    this.modelTop.position.set(x, y, z);
    this.modelTop.scale.multiplyScalar(0.05);

    this.move();
  }

  move() {
    const dir = Math.random() > 0.5 ? 1 : -1;
    const xOrZ = Math.random() > 0.5 ? "x" : "z";
    if (xOrZ === "x") {
      this.updatePosition({
        x: this.gridPosition.x + dir,
        z: this.gridPosition.z,
      });
    } else {
      this.updatePosition({
        x: this.gridPosition.x,
        z: this.gridPosition.z + dir,
      });
    }
    // Move again in a random time
    setTimeout(() => {
      this.move();
    }, Math.random() * 1_000 + 5_00);
  }

  updatePosition(newPos: GridPos) {
    // Don't fall off edge...
    if (newPos.x < 0 || newPos.z < 0 || newPos.x > 49 || newPos.z > 49) {
      return;
    }

    if (
      newPos.x === this.player.gridPosition.x &&
      newPos.z === this.player.gridPosition.z
    ) {
      return;
    }

    const collidingEntity = this.entities.find(
      (entity) =>
        entity.gridPosition.x === newPos.x && entity.gridPosition.z === newPos.z
    );

    if (
      collidingEntity instanceof Tree ||
      collidingEntity instanceof Gubox ||
      collidingEntity instanceof NPC
    ) {
      // Can't move into a space occupied by a tree or gubox or other npc
      return;
    }

    this.gridPosition = newPos;
  }

  render() {
    [this.model, this.modelTop].map((model, i) => {
      const isTop = i === 1;
      if (!(Math.abs(model.position.x - this.gridPosition.x) < increment)) {
        if (model.position.x > this.gridPosition.x) {
          model.position.x -= increment;
        } else {
          model.position.x += increment;
        }
      } else {
        model.position.x = this.gridPosition.x;
      }

      if (!(Math.abs(model.position.z - this.gridPosition.z) < increment)) {
        if (model.position.z > this.gridPosition.z) {
          model.position.z -= increment;
        } else {
          model.position.z += increment;
        }
      } else {
        model.position.z = this.gridPosition.z;
      }

      const ty =
        this.world[this.gridPosition.x][this.gridPosition.z][1] +
        1 +
        (isTop ? 0.5 : 0);
      if (!(Math.abs(model.position.y - ty) < increment)) {
        if (model.position.y > ty) {
          model.position.y -= 0.5 * increment;
        } else {
          model.position.y += 0.5 * increment;
        }
      } else {
        model.position.y = ty;
      }
    });
  }

  addToScene(scene: THREE.Scene) {
    scene.add(this.model, this.modelTop);
  }
}
