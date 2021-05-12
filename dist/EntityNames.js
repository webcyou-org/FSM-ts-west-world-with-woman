"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNameOfEntity = exports.ENTITY_NAMES = void 0;
var ENTITY_NAMES;
(function (ENTITY_NAMES) {
    ENTITY_NAMES[ENTITY_NAMES["ENT_MINER_BOB"] = 0] = "ENT_MINER_BOB";
    ENTITY_NAMES[ENTITY_NAMES["ENT_ELSA"] = 1] = "ENT_ELSA";
})(ENTITY_NAMES = exports.ENTITY_NAMES || (exports.ENTITY_NAMES = {}));
function GetNameOfEntity(n) {
    switch (n) {
        case ENTITY_NAMES.ENT_MINER_BOB:
            return "鉱夫 ボブ";
        case ENTITY_NAMES.ENT_ELSA:
            return "エルザ";
        default:
            return "UNKNOWN!";
    }
}
exports.GetNameOfEntity = GetNameOfEntity;
