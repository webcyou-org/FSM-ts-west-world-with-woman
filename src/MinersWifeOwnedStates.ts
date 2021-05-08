import { State } from './State'
import { MinersWife } from './MinersWife'
import { GetNameOfEntity } from './EntityNames'

import chalk from 'chalk';
const log = console.log;

export class WifesGlobalState implements State {
    private static _instance: WifesGlobalState | null = null;

    constructor() {
        if (WifesGlobalState._instance) {
            throw new Error("must use the getInstance.");
        }
        WifesGlobalState._instance = this;
    }

    public static getInstance(): WifesGlobalState {
        if(WifesGlobalState._instance === null) {
            WifesGlobalState._instance = new WifesGlobalState();
        }
        return WifesGlobalState._instance;
    }

    enter(wife: MinersWife): void {}

    execute(wife: MinersWife): void {
        if (Math.random() < 0.1) {
            wife.FSM.changeState(VisitBathroom.getInstance());
        }
    }

    exit(wife: MinersWife): void {}
}

export class DoHouseWork implements State {
    private static _instance: DoHouseWork | null = null;

    constructor() {
        if (DoHouseWork._instance) {
            throw new Error("must use the getInstance.");
        }
        DoHouseWork._instance = this;
    }

    public static getInstance(): DoHouseWork {
        if(DoHouseWork._instance === null) {
            DoHouseWork._instance = new DoHouseWork();
        }
        return DoHouseWork._instance;
    }

    enter(wife: MinersWife): void {}

    execute(wife: MinersWife): void {
        switch (Math.floor(Math.random()* 3)) {
            case 0:
                log(chalk`{green ${GetNameOfEntity(wife.ID)}: 床掃除をしています}`);
                break;
            case 1:
                log(chalk`{green ${GetNameOfEntity(wife.ID)}: 皿を洗っています}`);
                break;
            case 2:
                log(chalk`{green ${GetNameOfEntity(wife.ID)}: ベッドの用意をしています}`);
                break;
        }
    }

    exit(wife: MinersWife): void {}
}

export class VisitBathroom implements State {
    private static _instance: VisitBathroom | null = null;

    constructor() {
        if (VisitBathroom._instance) {
            throw new Error("must use the getInstance.");
        }
        VisitBathroom._instance = this;
    }

    public static getInstance(): VisitBathroom {
        if(VisitBathroom._instance === null) {
            VisitBathroom._instance = new VisitBathroom();
        }
        return VisitBathroom._instance;
    }

    enter(wife: MinersWife): void {
        log(chalk`{green ${GetNameOfEntity(wife.ID)}: トイレに向かって歩いています。ちょっとお化粧を直してきます}`);
    }

    execute(wife: MinersWife): void {
        log(chalk`{green ${GetNameOfEntity(wife.ID)}: あああ！ すっきりした！}`);
        wife.FSM.revertToPreviousState();
    }

    exit(wife: MinersWife): void {
        log(chalk`{green ${GetNameOfEntity(wife.ID)}: トイレから離れています}`);
    }
}