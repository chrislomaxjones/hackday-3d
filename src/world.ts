import * as THREE from "three";
import { Vector3 } from "three";
import { generateHeight } from "./voxel";
import * as noise from "./noise.json";

const cols = [0xf9ebc8, 0xfefbe7, 0xdae5d0, 0xa0bcc2];

const chooseRandomCol = (): THREE.ColorRepresentation => {
  return cols[Math.round(Math.random() * cols.length)];
};

const upto = (n: number) => [...Array(n).keys()];

const cubesIndexes = upto(50).map((i) => {
  return upto(50);
});

// const heights = generateHeight(50, 50);
const heights = noise as number[];

function getY(x: number, z: number) {
  const y = (heights[x + z * 50] * 0.3) | 0;

  if (y < -10) {
    return -10;
  }

  if (y > 10) {
    return 10;
  }

  return y / 2;
}

export const addCubes = (
  scene: THREE.Scene,
  gap: number = 0,
  start: THREE.Vector3 = new Vector3()
) => {
  return cubesIndexes.map((row, x) =>
    row.map((z) => {
      const geometry = new THREE.BoxGeometry(1, 0.5);
      const material = new THREE.MeshToonMaterial({
        color: chooseRandomCol(),
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.scale.multiply(new THREE.Vector3(0.95, 1, 0.95));

      const y = getY(x, z);

      cube.position
        // .add(start)
        .add(new Vector3(x + gap * x, y, z + gap * z));

      scene.add(cube);

      return [x, y, z] as const;
    })
  );
};
