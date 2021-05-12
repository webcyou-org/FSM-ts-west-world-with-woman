"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntityNames_1 = require("./EntityNames");
const Miner_1 = require("./Miner");
const MinersWife_1 = require("./MinersWife");
function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), milliseconds);
    });
}
async function main() {
    const miner = new Miner_1.Miner(EntityNames_1.ENTITY_NAMES.ENT_MINER_BOB);
    const elsa = new MinersWife_1.MinersWife(EntityNames_1.ENTITY_NAMES.ENT_ELSA);
    for (let i = 0; i < 20; ++i) {
        miner.update();
        elsa.update();
        await sleep(800);
    }
}
main();
