"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGameEntity = void 0;
class BaseGameEntity {
    constructor(id) {
        // どのエンティティも一意のID番号を持つ
        this._ID = 0;
        this.setID(id);
    }
    setID(val) {
        // 次の利用可能なIDと同等以上の値であることを確認する
        if (!(val >= BaseGameEntity.iNextValidID)) {
            throw new Error("無効なID");
        }
        this._ID = val;
        BaseGameEntity.iNextValidID = this._ID + 1;
    }
    get ID() {
        return this._ID;
    }
}
exports.BaseGameEntity = BaseGameEntity;
// 次に有効なID。BaseGameEntityがインスタンス化されるたびにこの値は更新される
BaseGameEntity.iNextValidID = 0;
