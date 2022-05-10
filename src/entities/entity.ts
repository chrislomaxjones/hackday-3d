import * as THREE from "three";

export type GridPos = { x: number; z: number };

export interface Entity {
  gridPosition: GridPos;
  render?: () => void;
  addToScene: (scene: THREE.Scene) => void;
}
