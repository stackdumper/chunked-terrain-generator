import Generator, { mapObjectToArray } from "./index";

const generator = new Generator({
  seed: 1,
  minHeight: 0,
  maxHeight: 256
});
generator.updateMap({
  userPosition: [0, 0, 0],
  renderDistance: 1
});

console.log(generator.map);

console.log(mapObjectToArray(generator.map));