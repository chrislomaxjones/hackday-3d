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

// Add grid
// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);

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

const light2 = new THREE.PointLight(0xfffde0, 0.1, 100);
light2.position.set(-2, -5, 0);
scene.add(light2);

const light3 = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light3);

// Add cube

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshMatcapMaterial({ color: 0x00ffff });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Add a sphere

// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.4),
//   new THREE.MeshMatcapMaterial({ color: 0x97c4b8 })
// );

addCubes(scene, 0.075, new Vector3(-5, 0, -5));

// sphere.position.setX(3);

// scene.add(sphere);

// Animate cube

// Add player

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const player = new Player(
  new THREE.Mesh(
    new THREE.SphereGeometry(0.4),
    new THREE.MeshMatcapMaterial({ color: 0x97c4b8 })
  ),
  camera,
  { x: 0, z: 0 }
);

scene.add(player.model);

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
