import * as THREE from "three";

type GridPos = { x: number; z: number };

type State = "free" | "capturing" | "captured";

export class Gubox<T = unknown> {
  model: THREE.Mesh;
  state: State;
  gridPosition: GridPos;
  payload;

  constructor(payload: T, x: number, y: number, z: number) {
    this.payload = payload;

    this.model = new THREE.Mesh(
      new THREE.BoxGeometry(1, 2),
      new THREE.MeshToonMaterial({ color: 0x506991 })
    );

    this.gridPosition = { x, z };
    this.model.position.set(x, y, z);

    this.state = "free";
  }

  capture() {
    this.state = "capturing";

    const prizeUrl = document.querySelector<HTMLAnchorElement>("#prize-url");
    if (prizeUrl) {
      prizeUrl.innerText = this.payload as unknown as string;
    }
    const prizeContainer =
      document.querySelector<HTMLDivElement>("#prize-container");

    prizeContainer?.classList.remove("hidden");
    prizeContainer?.classList.add("bounceIn");

    setTimeout(() => {
      prizeContainer?.classList.remove("bounceIn");
      prizeContainer?.classList.add("hidden");
    }, 5_000);
  }

  render() {
    if (this.state === "capturing") {
      this.model.scale.multiplyScalar(0.8);
    }

    if (this.model.scale.x < 0.001) {
      this.state = "captured";
    }
  }
}
