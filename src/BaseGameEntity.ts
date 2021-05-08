export class BaseGameEntity {
    // どのエンティティも一意のID番号を持つ
    private _ID: number = 0;
    // 次に有効なID。BaseGameEntityがインスタンス化されるたびにこの値は更新される
    private static iNextValidID: number = 0;

    constructor(id: number) {
        this.setID(id);
    }

    private setID(val: number): void {
        // 次の利用可能なIDと同等以上の値であることを確認する
        if (!(val >= BaseGameEntity.iNextValidID)) {
            throw new Error("無効なID");
        }
        this._ID = val;
        BaseGameEntity.iNextValidID = this._ID + 1;
    }

    get ID(): number {
        return this._ID;
    }
}