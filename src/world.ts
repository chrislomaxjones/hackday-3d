import * as THREE from "three";
import { Vector3 } from "three";
import { generateHeight } from "./voxel";

const cols = [0xf9ebc8, 0xfefbe7, 0xdae5d0, 0xa0bcc2];

const chooseRandomCol = (): THREE.ColorRepresentation => {
  return cols[Math.round(Math.random() * cols.length)];
};

const upto = (n: number) => [...Array(n).keys()];

const cubesIndexes = upto(50).map((i) => {
  return upto(50);
});

const heights = generateHeight(50, 50);

function getY(x: number, z: number) {
  const y = (heights[x + z * 50] * 0.3) | 0;
  console.log(y / 2);
  return y / 2;
}

export const addCubes = (
  scene: THREE.Scene,
  gap: number = 0,
  start: THREE.Vector3 = new Vector3()
) => {
  console.log(heights);
  cubesIndexes.map((row, x) => {
    row.map((z) => {
      const geometry = new THREE.BoxGeometry(1, 0.5);
      const material = new THREE.MeshLambertMaterial({
        color: chooseRandomCol(),
        reflectivity: 0.1,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.scale.multiply(new THREE.Vector3(0.95, 1, 0.95));
      cube.position
        // .add(start)
        .add(new Vector3(x + gap * x, getY(x, z), z + gap * z));

      scene.add(cube);
    });
  });
};
