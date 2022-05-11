import * as THREE from "three";
import { Color, Vector3 } from "three";
import { Entity } from "./entities/entity";
import { Gubox } from "./entities/gubox";
import { Lamp } from "./entities/lamp";
import { Moon } from "./entities/moon";
import { Player } from "./entities/player";
import { Tree } from "./entities/tree";
import { onPrizeWon, prizes } from "./prizes";
import { addCubes } from "./world";

// Setup scene and renderer

const scene = new THREE.Scene();
scene.background = new Color(0x150036);
const color = 0x150036;
const density = 0.05;
scene.fog = new THREE.FogExp2(color, density);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

// const light3 = new THREE.AmbientLight(0x404040, 1); // soft white light
// scene.add(light3);

const world = addCubes(scene, 0, new Vector3(0, 0, 0));

const entities: Entity[] = [];

const lamps: Lamp[] = [];

const addEntity = (tx: number, ty: number, tz: number) => {
  if (
    Math.random() < 0.01 // &&
    // !lamps.some(
    //   (l) =>
    //     Math.abs(l.gridPosition.x - tx) >= 10 &&
    //     Math.abs(l.gridPosition.z - tz) >= 10
    // )
  ) {
    console.log("Creating lamp at ", tx, ty, tz);
    const lamp = new Lamp(tx, ty + 1.5, tz);
    entities.push(lamp);
    lamps.push(lamp);
    return;
  }

  if (Math.random() < 0.01) {
    console.log("Creating Gubox at ", tx, ty, tz);
    const gubox = new Gubox(tx, ty + 1.25, tz);
    entities.push(gubox);
    return;
  }

  if (Math.random() < 0.05) {
    console.log("Creating tree at ", tx, ty, tz);
    const tree = new Tree(tx, ty, tz);
    entities.push(tree);
    return;
  }
};

for (const row of world) {
  for (const [tx, ty, tz] of row) {
    addEntity(tx, ty, tz);
  }
}

// Add all entities to scene
for (const entity of entities) {
  entity.addToScene(scene);
}

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const player = new Player(
  new THREE.Mesh(
    new THREE.SphereGeometry(0.4),
    new THREE.MeshToonMaterial({ color: 0x97c4b8 })
  ),
  camera,
  { x: 0, z: 0 },
  world as [number, number, number][][],
  entities
);

scene.add(player.model);

const moon = new Moon(20, 15, -30);
moon.addToScene(scene);

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

function animate() {
  requestAnimationFrame(animate);

  player.render();

  moon.render();

  for (const entity of entities) {
    if (entity.render) {
      entity.render();
    }
  }

  renderer.render(scene, camera);
}

animate();
