import { State } from './State'

export class StateMachine {
    // このインスタンスを所有するエージェント
    private _owner: any;
    private _currentState: State | null = null;
    // エージェントの直前のステートの記録
    private _previousState: State | null = null;
    // FSMが更新されるたびに呼ばれる
    private _globalState: State | null = null;

    constructor(owner: any) {
        this._owner = owner;
    }

    // FSMの初期化
    set currentState(state: State | null) {
        this._currentState = state;
    }
    set globalState(state: State | null) {
        this._globalState = state;
    }
    set previousState(state: State | null) {
        this._previousState = state;
    }

    get currentState(): State | null {
        return this._currentState;
    }
    get globalState(): State | null {
        return this._globalState;
    }
    get previousState(): State | null {
        return this._previousState;
    }

    // FSMの更新するときにこれを呼ぶ
    update(): void {
        // グローバルステートがあるなら、そのメソッドを実行する
        if (this._globalState) this._globalState.execute(this._owner);
        // 現在のステートと同じ
        if (this._currentState) this._currentState.execute(this._owner);
    }

    // 新しいステートに変更
    changeState(newState: State) {
        if (!newState || !this._currentState) {
            throw new Error("NULLステートに変更しようとしています");
        }

        // 以前のステートを記録する
        this._previousState = this._currentState;
        // 存在するステートの終了メソッドを呼ぶ
        this._currentState.exit(this._owner);
        // 新しいステートに変更
        this._currentState = newState;
        // 新しいステートの開始メソッドを呼ぶ
        this._currentState.enter(this._owner);
    }

    // 以前のステートに変更する
    revertToPreviousState(): void {
        if (!this._previousState) return;
        this.changeState(this._previousState);
    }

    // 現在のステートの型とパラメータで渡されたクラスの型が同じならtrueを返す
    isInState(st: any): boolean {
        return this._currentState instanceof st;
    }
}