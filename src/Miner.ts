import { BaseGameEntity } from './BaseGameEntity'
import { StateMachine } from './StateMachine'
import { LOCATION_TYPE } from './Locations'
import { GoHomeAndSleepTilRested } from './MinerOwnedStates'

// 鉱夫が安心して採掘するために必要な金塊の量
export const COMFORT_LEVEL: number = 5;
// 鉱夫が運ぶことのできる金塊の量
const MAX_NUGGETS: number = 3;
// この値より上では、鉱夫は喉が渇く。
const THIRST_LEVEL: number = 5;
// この値を超えると鉱夫は眠くなる
const TIREDNESS_THRESHOLD: number = 5;


export class Miner extends BaseGameEntity {
    // ステートマシンクラスのインスタンス
    private _stateMachine: StateMachine;
    // 鉱夫が現在いる場所
    private _location: LOCATION_TYPE;
    // 鉱夫がポケットに持っている金塊の数
    private _goldCarried: number = 0;
    // 鉱夫が銀行に預けている金額
    private _moneyInBank: number = 0;
    // この値が高いほど、鉱夫の喉が渇く
    private _thirst: number = 0;
    // この値が高いほど、鉱夫は疲れる
    private _fatigue: number = 0;

    constructor(id: number) {
        super(id);

        this._location = LOCATION_TYPE.SHACK;
        this._stateMachine = new StateMachine(this);
        this._stateMachine.currentState = GoHomeAndSleepTilRested.getInstance();
        // this._stateMachine.globalState = MinerGlobalState.getInstance();
    }

    get FSM(): StateMachine {
        return this._stateMachine;
    }

    get location(): LOCATION_TYPE {
        return this._location
    }

    set changeLocation(location: LOCATION_TYPE) {
        this._location = location;
    }

    increaseFatigue(): void {
        this._fatigue += 1;
    }

    decreaseFatigue(): void {
        this._fatigue -= 1;
    }

    isPocketsFull(): boolean {
        return this._goldCarried >= MAX_NUGGETS;
    }

    get goldCarried(): number {
        return this._goldCarried;
    }

    set goldCarried(val: number) {
        this._goldCarried = val;
    }

    wealth(): number {
        return this._moneyInBank;
    }

    buyAndDrinkAWhiskey(): void {
        this._thirst = 0;
        this._moneyInBank-=2;
    }

    addToGoldCarried(val: number): void {
        this._goldCarried += val;
        if (this._goldCarried < 0) this._goldCarried = 0;
    }

    addToWealth(val: number): void {
        this._moneyInBank += val;
        if (this._moneyInBank < 0) this._moneyInBank = 0;
    }

    thirsty(): boolean {
        return this._thirst >= THIRST_LEVEL;
    }

    update(): void {
        this._thirst += 1;
        this._stateMachine.update();
    }

    isFatigued(): boolean {
        return (this._fatigue > TIREDNESS_THRESHOLD);
    }
}