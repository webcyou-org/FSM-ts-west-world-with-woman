import { State } from './State'
import { Miner, COMFORT_LEVEL } from './Miner'
import { LOCATION_TYPE } from './Locations'
import { GetNameOfEntity } from './EntityNames'

import chalk from 'chalk';
const log = console.log;


// 金鉱に入り金塊を掘る
export class EnterMineAndDigForNugget implements State {
    private static _instance: EnterMineAndDigForNugget | null = null;

    constructor() {
        if (EnterMineAndDigForNugget._instance) {
            throw new Error("must use the getInstance.");
        }
        EnterMineAndDigForNugget._instance = this;
    }

    public static getInstance():EnterMineAndDigForNugget {
        if(EnterMineAndDigForNugget._instance === null) {
            EnterMineAndDigForNugget._instance = new EnterMineAndDigForNugget();
        }
        return EnterMineAndDigForNugget._instance;
    }

    enter(miner: Miner): void {
        // 鉱夫がまだ金鉱にいない場合は、場所を金鉱に変えなければいけない
        if (miner.location != LOCATION_TYPE.GOLDMINE) {
            log(chalk`{red ${GetNameOfEntity(miner.ID)}: 金鉱に向かって歩いています}`);
            miner.changeLocation = LOCATION_TYPE.GOLDMINE;
        }
    }

    execute(miner: Miner): void {
        // 鉱夫が、MaxNuggets値を超える金塊を運べるようになるまで金を掘る。
        // 鉱夫が、掘っている途中で喉の渇きを覚えたら、作業を止めてステートを変更し、ウイスキーを飲みに酒場へ行く
        miner.addToGoldCarried(1);

        miner.increaseFatigue();
        log(chalk`{red ${GetNameOfEntity(miner.ID)}: 金塊を拾ってます}`);

        // 十分金を掘ったら、銀行に行って預ける
        if (miner.isPocketsFull()) {
            miner.FSM.changeState(VisitBankAndDepositGold.getInstance());
        }

        if (miner.thirsty()) {
            miner.FSM.changeState(QuenchThirst.getInstance());
        }
    }

    exit(miner: Miner): void {
        log(chalk`{red ${GetNameOfEntity(miner.ID)}: 金塊でポケットを一杯にして金鉱から離れています}`);
    }
}


// 銀行を訪れ金を預ける
export class VisitBankAndDepositGold implements State {
    private static _instance: VisitBankAndDepositGold | null = null;

    constructor() {
        if (VisitBankAndDepositGold._instance) {
            throw new Error("must use the getInstance.");
        }
        VisitBankAndDepositGold._instance = this;
    }

    public static getInstance(): VisitBankAndDepositGold {
        if(VisitBankAndDepositGold._instance === null) {
            VisitBankAndDepositGold._instance = new VisitBankAndDepositGold();
        }
        return VisitBankAndDepositGold._instance;
    }

    enter(miner: Miner): void {
        if (miner.location != LOCATION_TYPE.BANK) {
            log(chalk`{red ${GetNameOfEntity(miner.ID)}: 銀行に向かいます。イエッサー}`);
            miner.changeLocation = LOCATION_TYPE.BANK;
        }
    }

    execute(miner: Miner): void {
        // 金を預ける
        miner.addToWealth(miner.goldCarried);
        miner.goldCarried = 0;

        const message = `${GetNameOfEntity(miner.ID)}: 金を預けています。現在預けている合計: ${miner.wealth()}`;
        log(chalk`{red ${message}}`);

        // リッチな状態であれば、休息をとる
        if (miner.wealth() >= COMFORT_LEVEL) {
            log(chalk`{red ${GetNameOfEntity(miner.ID)}: やった！今のところ十分リッチになった。奥さんが待っている家へ帰ります}`);
            miner.FSM.changeState(GoHomeAndSleepTilRested.getInstance());
        } else {
            miner.FSM.changeState(EnterMineAndDigForNugget.getInstance());
        }
    }

    exit(miner: Miner): void {
        log(chalk`{red ${GetNameOfEntity(miner.ID)}: 銀行から離れています}`);
    }
}


// 家に帰って疲れが取れるまで眠る
export class GoHomeAndSleepTilRested implements State {
    private static _instance: GoHomeAndSleepTilRested | null = null;

    constructor() {
        if (GoHomeAndSleepTilRested._instance) {
            throw new Error("must use the getInstance.");
        }
        GoHomeAndSleepTilRested._instance = this;
    }

    public static getInstance(): GoHomeAndSleepTilRested {
        if(GoHomeAndSleepTilRested._instance === null) {
            GoHomeAndSleepTilRested._instance = new GoHomeAndSleepTilRested();
        }
        return GoHomeAndSleepTilRested._instance;
    }

    enter(miner: Miner): void {
        if (miner.location != LOCATION_TYPE.SHACK) {
            log(chalk`{red ${GetNameOfEntity(miner.ID)}: 家に向かっています}`);
            miner.changeLocation = LOCATION_TYPE.SHACK;
        }
    }

    execute(miner: Miner): void {
        // 鉱夫が疲れていなければ、再び金を掘り始める
        if (!miner.isFatigued()) {
            log(chalk`{red ${GetNameOfEntity(miner.ID)}: なんてすばらしい昼寝だったんだろう！もっと金を探す時間だ}`);
            miner.FSM.changeState(EnterMineAndDigForNugget.getInstance());
        } else {
            miner.decreaseFatigue();
            log(chalk`{red ${GetNameOfEntity(miner.ID)}: グーグーグー}`);
        }
    }

    exit(miner: Miner): void {
        log(chalk`{red ${GetNameOfEntity(miner.ID)}: 家から離れています}`);
    }
}


// 喉の乾きを癒す
export class QuenchThirst implements State {
    private static _instance: QuenchThirst | null = null;

    constructor() {
        if (QuenchThirst._instance) {
            throw new Error("must use the getInstance.");
        }
        QuenchThirst._instance = this;
    }

    public static getInstance(): QuenchThirst {
        if(QuenchThirst._instance === null) {
            QuenchThirst._instance = new QuenchThirst();
        }
        return QuenchThirst._instance;
    }

    enter(miner: Miner): void {
        if (miner.location != LOCATION_TYPE.SALOON) {
            miner.changeLocation = LOCATION_TYPE.SALOON;
            log(chalk`{red ${GetNameOfEntity(miner.ID)}: アアのどが渇いた！ 酒場に向かって歩いています}`);
        }
    }

    execute(miner: Miner): void {
        if (miner.thirsty()) {
            miner.buyAndDrinkAWhiskey();
            log(chalk`{red ${GetNameOfEntity(miner.ID)}: こいつはとびきり旨い酒だ}`);
            miner.FSM.changeState(EnterMineAndDigForNugget.getInstance());
        } else {
            log(chalk`{red \nERROR!\nERROR!\nERROR!}`);
        }
    }

    exit(miner: Miner): void {
        log(chalk`{red ${GetNameOfEntity(miner.ID)}: 酒場を離れています。良い気分です}`);
    }
}
