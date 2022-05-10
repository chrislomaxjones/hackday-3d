import * as THREE from "three";
import { Color, Vector3 } from "three";
import { Gubox } from "./gubox";
import { Lamp } from "./lamp";
import { Player } from "./player";
import { Tree } from "./tree";
import { addCubes } from "./world";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup scene and camera

const scene = new THREE.Scene();

scene.background = new Color(0x150036);

const color = 0x150036;
const density = 0.05;
scene.fog = new THREE.FogExp2(color, density);

// Setup renderer

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
document.body.appendChild(renderer.domElement);

// Add a point light

// const light = new THREE.PointLight(0xfffde0, 1, 100);
// light.position.set(2, 5, 0);
// scene.add(light);

const light3 = new THREE.AmbientLight(0x404040, 0.5); // soft white light
scene.add(light3);

const world = addCubes(scene, /* 0.075 */ 0, new Vector3(-5, 0, -5));

for (const row of world) {
  for (const [tx, ty, tz] of row) {
    if (Math.random() < 0.01) {
      console.log("Creating lamp at ", tx, ty, tz);
      const lamp = new Lamp(tx, ty + 1.5, tz);
      scene.add(lamp.model, lamp.light);
    }
  }
}

for (const row of world) {
  for (const [tx, ty, tz] of row) {
    if (Math.random() < 0.05) {
      console.log("Creating tree at ", tx, ty, tz);
      const tree = new Tree(tx, ty, tz);
      scene.add(tree.modelTop, tree.modelBottom);
    }
  }
}

const guboxes: Gubox[] = [];

for (const row of world) {
  for (const [tx, ty, tz] of row) {
    if (Math.random() < 0.01) {
      console.log("Creating Gubox at ", tx, ty, tz);
      const gubox = new Gubox("https://gu.com", tx, ty + 1.25, tz);
      guboxes.push(gubox);
      scene.add(gubox.model);
    }
  }
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
  guboxes
);

scene.add(player.model);

function animate() {
  requestAnimationFrame(animate);

  player.render();
  guboxes.forEach((gubox) => gubox.render());

  renderer.render(scene, camera);
}

animate();
