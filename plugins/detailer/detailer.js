import { Noise } from "noisejs";

export default class DetailerPlugin {
  constructor(size, maxHeight) {
    this.size = size;
    this.maxHeight = maxHeight;
    this.noise = new Noise(Math.random());
  }

  _setMap({ map, x, z, value, force }) {
    if (!map[x]) map[x] = {};
    if (!map[x][z] || force) {
      map[x][z] = value;
    }

    return map;
  }

  _generateNoise({ x, z }) {
    return this.noise.perlin2(x / 100, z / 100) * 100 + this.maxHeight / 2;
  }

  onAfterMapUpdate({ map, added, deleted }) {
    map = Object.keys(map).map(x => {
      return Object.keys(map[x]).map(z => {
        const detailed = {};

        for (let i = 0; i < this.size; i++) {
          for (let j = 0; j < this.size; j++) {
            if (!detailed[i]) detailed[i] = {};
            detailed[i][j] = this._generateNoise({
              x: x * this.size + i,
              z: z * this.size + j
            });
          }
        }

        return detailed;
      });
    });

    return map;
  }
}