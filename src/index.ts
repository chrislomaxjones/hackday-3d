import * as THREE from "three";
import { Color, Vector3 } from "three";
import { Player } from "./player";
import { addCubes } from "./world";

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

const light = new THREE.PointLight(0xfffde0, 1, 100);
light.position.set(2, 5, 0);
scene.add(light);

// const light3 = new THREE.AmbientLight(0x404040); // soft white light
// scene.add(light3);

addCubes(scene, 0.075, new Vector3(-5, 0, -5));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const player = new Player(
  new THREE.Mesh(
    new THREE.SphereGeometry(0.4),
    new THREE.MeshLambertMaterial({ color: 0x97c4b8 })
  ),
  camera,
  { x: 0, z: 0 }
);

scene.add(player.model);

function animate() {
  requestAnimationFrame(animate);

  player.render();

  renderer.render(scene, camera);
}

animate();
