import { ENTITY_NAMES } from "./EntityNames"
import { Miner } from "./Miner"
import { MinersWife } from "./MinersWife"

function sleep(milliseconds: number) {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), milliseconds);
  });
}

async function main() {
  const miner = new Miner(ENTITY_NAMES.ENT_MINER_BOB);
  const elsa = new MinersWife(ENTITY_NAMES.ENT_ELSA);

  for (let i = 0; i < 20; ++i) {
    miner.update();
    elsa.update();
    await sleep(800);
  }
}

main();