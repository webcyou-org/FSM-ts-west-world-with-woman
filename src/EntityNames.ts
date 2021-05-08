export enum ENTITY_NAMES {
    ENT_MINER_BOB,
    ENT_ELSA
}

export function GetNameOfEntity(n: number): string {
    switch(n) {
        case ENTITY_NAMES.ENT_MINER_BOB:
            return "鉱夫 ボブ";
        case ENTITY_NAMES.ENT_ELSA:
            return "エルサ";
        default:
            return "UNKNOWN!";
    }
}
