"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuenchThirst = exports.GoHomeAndSleepTilRested = exports.VisitBankAndDepositGold = exports.EnterMineAndDigForNugget = void 0;
const Miner_1 = require("./Miner");
const Locations_1 = require("./Locations");
const EntityNames_1 = require("./EntityNames");
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
// 金鉱に入り金塊を掘る
class EnterMineAndDigForNugget {
    constructor() {
        if (EnterMineAndDigForNugget._instance) {
            throw new Error("must use the getInstance.");
        }
        EnterMineAndDigForNugget._instance = this;
    }
    static getInstance() {
        if (EnterMineAndDigForNugget._instance === null) {
            EnterMineAndDigForNugget._instance = new EnterMineAndDigForNugget();
        }
        return EnterMineAndDigForNugget._instance;
    }
    enter(miner) {
        // 鉱夫がまだ金鉱にいない場合は、場所を金鉱に変えなければいけない
        if (miner.location != Locations_1.LOCATION_TYPE.GOLDMINE) {
            log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: 金鉱に向かって歩いています}`);
            miner.changeLocation = Locations_1.LOCATION_TYPE.GOLDMINE;
        }
    }
    execute(miner) {
        // 鉱夫が、MaxNuggets値を超える金塊を運べるようになるまで金を掘る。
        // 鉱夫が、掘っている途中で喉の渇きを覚えたら、作業を止めてステートを変更し、ウイスキーを飲みに酒場へ行く
        miner.addToGoldCarried(1);
        miner.increaseFatigue();
        log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: 金塊を拾ってます}`);
        // 十分金を掘ったら、銀行に行って預ける
        if (miner.isPocketsFull()) {
            miner.FSM.changeState(VisitBankAndDepositGold.getInstance());
        }
        if (miner.thirsty()) {
            miner.FSM.changeState(QuenchThirst.getInstance());
        }
    }
    exit(miner) {
        log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: 金塊でポケットを一杯にして金鉱から離れています}`);
    }
}
exports.EnterMineAndDigForNugget = EnterMineAndDigForNugget;
EnterMineAndDigForNugget._instance = null;
// 銀行を訪れ金を預ける
class VisitBankAndDepositGold {
    constructor() {
        if (VisitBankAndDepositGold._instance) {
            throw new Error("must use the getInstance.");
        }
        VisitBankAndDepositGold._instance = this;
    }
    static getInstance() {
        if (VisitBankAndDepositGold._instance === null) {
            VisitBankAndDepositGold._instance = new VisitBankAndDepositGold();
        }
        return VisitBankAndDepositGold._instance;
    }
    enter(miner) {
        if (miner.location != Locations_1.LOCATION_TYPE.BANK) {
            log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: 銀行に向かいます。イエッサー}`);
            miner.changeLocation = Locations_1.LOCATION_TYPE.BANK;
        }
    }
    execute(miner) {
        // 金を預ける
        miner.addToWealth(miner.goldCarried);
        miner.goldCarried = 0;
        const message = `${EntityNames_1.GetNameOfEntity(miner.ID)}: 金を預けています。現在預けている合計: ${miner.wealth()}`;
        log(chalk_1.default `{red ${message}}`);
        // リッチな状態であれば、休息をとる
        if (miner.wealth() >= Miner_1.COMFORT_LEVEL) {
            log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: やった！今のところ十分リッチになった。奥さんが待っている家へ帰ります}`);
            miner.FSM.changeState(GoHomeAndSleepTilRested.getInstance());
        }
        else {
            miner.FSM.changeState(EnterMineAndDigForNugget.getInstance());
        }
    }
    exit(miner) {
        log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: 銀行から離れています}`);
    }
}
exports.VisitBankAndDepositGold = VisitBankAndDepositGold;
VisitBankAndDepositGold._instance = null;
// 家に帰って疲れが取れるまで眠る
class GoHomeAndSleepTilRested {
    constructor() {
        if (GoHomeAndSleepTilRested._instance) {
            throw new Error("must use the getInstance.");
        }
        GoHomeAndSleepTilRested._instance = this;
    }
    static getInstance() {
        if (GoHomeAndSleepTilRested._instance === null) {
            GoHomeAndSleepTilRested._instance = new GoHomeAndSleepTilRested();
        }
        return GoHomeAndSleepTilRested._instance;
    }
    enter(miner) {
        if (miner.location != Locations_1.LOCATION_TYPE.SHACK) {
            log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: 家に向かっています}`);
            miner.changeLocation = Locations_1.LOCATION_TYPE.SHACK;
        }
    }
    execute(miner) {
        // 鉱夫が疲れていなければ、再び金を掘り始める
        if (!miner.isFatigued()) {
            log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: なんてすばらしい昼寝だったんだろう！もっと金を探す時間だ}`);
            miner.FSM.changeState(EnterMineAndDigForNugget.getInstance());
        }
        else {
            miner.decreaseFatigue();
            log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: グーグーグー}`);
        }
    }
    exit(miner) {
        log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: 家から離れています}`);
    }
}
exports.GoHomeAndSleepTilRested = GoHomeAndSleepTilRested;
GoHomeAndSleepTilRested._instance = null;
// 喉の乾きを癒す
class QuenchThirst {
    constructor() {
        if (QuenchThirst._instance) {
            throw new Error("must use the getInstance.");
        }
        QuenchThirst._instance = this;
    }
    static getInstance() {
        if (QuenchThirst._instance === null) {
            QuenchThirst._instance = new QuenchThirst();
        }
        return QuenchThirst._instance;
    }
    enter(miner) {
        if (miner.location != Locations_1.LOCATION_TYPE.SALOON) {
            miner.changeLocation = Locations_1.LOCATION_TYPE.SALOON;
            log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: アアのどが渇いた！ 酒場に向かって歩いています}`);
        }
    }
    execute(miner) {
        if (miner.thirsty()) {
            miner.buyAndDrinkAWhiskey();
            log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: こいつはとびきり旨い酒だ}`);
            miner.FSM.changeState(EnterMineAndDigForNugget.getInstance());
        }
        else {
            log(chalk_1.default `{red \nERROR!\nERROR!\nERROR!}`);
        }
    }
    exit(miner) {
        log(chalk_1.default `{red ${EntityNames_1.GetNameOfEntity(miner.ID)}: 酒場を離れています。良い気分です}`);
    }
}
exports.QuenchThirst = QuenchThirst;
QuenchThirst._instance = null;
