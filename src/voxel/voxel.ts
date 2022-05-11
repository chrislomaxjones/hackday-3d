// From https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_terrain_raycast.html#L136-L158

import { ImprovedNoise } from "./noise";

export function generateHeight(width: number, height: number) {
  const data = [],
    perlin = ImprovedNoise(),
    size = width * height,
    z = Math.random() * 100;

  let quality = 2;

  for (let j = 0; j < 4; j++) {
    if (j === 0) for (let i = 0; i < size; i++) data[i] = 0;

    for (let i = 0; i < size; i++) {
      const x = i % width,
        y = (i / width) | 0;
      data[i] += perlin.noise(x / quality, y / quality, z) * quality;
    }

    quality *= 4;
  }

  return data;
}
