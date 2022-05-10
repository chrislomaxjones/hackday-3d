import * as THREE from "three";
import { Vector3 } from "three";

const cols = [0xf9ebc8, 0xfefbe7, 0xdae5d0, 0xa0bcc2];

const chooseRandomCol = (): THREE.ColorRepresentation => {
  return cols[Math.round(Math.random() * cols.length)];
};

const chooseRandomY = () => {
  return 0.1 * Math.random();
};

const upto = (n: number) => [...Array(n).keys()];

const cubesIndexes = upto(30).map((i) => {
  return upto(30);
});

export const addCubes = (
  scene: THREE.Scene,
  gap: number = 0,
  start: THREE.Vector3 = new Vector3()
) => {
  cubesIndexes.map((row, x) => {
    row.map((z) => {
      const geometry = new THREE.BoxGeometry(1, 0.1);
      const material = new THREE.MeshLambertMaterial({
        color: chooseRandomCol(),
        reflectivity: 0.1,
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position
        .add(start)
        .add(new Vector3(x + gap * x, chooseRandomY(), z + gap * z));
      scene.add(cube);
    });
  });
};
