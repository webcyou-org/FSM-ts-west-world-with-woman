"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Miner = exports.COMFORT_LEVEL = void 0;
const BaseGameEntity_1 = require("./BaseGameEntity");
const StateMachine_1 = require("./StateMachine");
const Locations_1 = require("./Locations");
const MinerOwnedStates_1 = require("./MinerOwnedStates");
// 鉱夫が安心して採掘するために必要な金塊の量
exports.COMFORT_LEVEL = 5;
// 鉱夫が運ぶことのできる金塊の量
const MAX_NUGGETS = 3;
// この値より上では、鉱夫は喉が渇く。
const THIRST_LEVEL = 5;
// この値を超えると鉱夫は眠くなる
const TIREDNESS_THRESHOLD = 5;
class Miner extends BaseGameEntity_1.BaseGameEntity {
    constructor(id) {
        super(id);
        // 鉱夫がポケットに持っている金塊の数
        this._goldCarried = 0;
        // 鉱夫が銀行に預けている金額
        this._moneyInBank = 0;
        // この値が高いほど、鉱夫の喉が渇く
        this._thirst = 0;
        // この値が高いほど、鉱夫は疲れる
        this._fatigue = 0;
        this._location = Locations_1.LOCATION_TYPE.SHACK;
        this._stateMachine = new StateMachine_1.StateMachine(this);
        this._stateMachine.currentState = MinerOwnedStates_1.GoHomeAndSleepTilRested.getInstance();
    }
    get FSM() {
        return this._stateMachine;
    }
    get location() {
        return this._location;
    }
    set changeLocation(location) {
        this._location = location;
    }
    increaseFatigue() {
        this._fatigue += 1;
    }
    decreaseFatigue() {
        this._fatigue -= 1;
    }
    isPocketsFull() {
        return this._goldCarried >= MAX_NUGGETS;
    }
    get goldCarried() {
        return this._goldCarried;
    }
    set goldCarried(val) {
        this._goldCarried = val;
    }
    wealth() {
        return this._moneyInBank;
    }
    buyAndDrinkAWhiskey() {
        this._thirst = 0;
        this._moneyInBank -= 2;
    }
    addToGoldCarried(val) {
        this._goldCarried += val;
        if (this._goldCarried < 0)
            this._goldCarried = 0;
    }
    addToWealth(val) {
        this._moneyInBank += val;
        if (this._moneyInBank < 0)
            this._moneyInBank = 0;
    }
    thirsty() {
        return this._thirst >= THIRST_LEVEL;
    }
    update() {
        this._thirst += 1;
        this._stateMachine.update();
    }
    isFatigued() {
        return (this._fatigue > TIREDNESS_THRESHOLD);
    }
}
exports.Miner = Miner;
