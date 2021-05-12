"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitBathroom = exports.DoHouseWork = exports.WifesGlobalState = void 0;
const EntityNames_1 = require("./EntityNames");
const chalk_1 = __importDefault(require("chalk"));
const log = console.log;
class WifesGlobalState {
    constructor() {
        if (WifesGlobalState._instance) {
            throw new Error("must use the getInstance.");
        }
        WifesGlobalState._instance = this;
    }
    static getInstance() {
        if (WifesGlobalState._instance === null) {
            WifesGlobalState._instance = new WifesGlobalState();
        }
        return WifesGlobalState._instance;
    }
    enter(wife) { }
    execute(wife) {
        if (Math.random() < 0.1) {
            wife.FSM.changeState(VisitBathroom.getInstance());
        }
    }
    exit(wife) { }
}
exports.WifesGlobalState = WifesGlobalState;
WifesGlobalState._instance = null;
class DoHouseWork {
    constructor() {
        if (DoHouseWork._instance) {
            throw new Error("must use the getInstance.");
        }
        DoHouseWork._instance = this;
    }
    static getInstance() {
        if (DoHouseWork._instance === null) {
            DoHouseWork._instance = new DoHouseWork();
        }
        return DoHouseWork._instance;
    }
    enter(wife) { }
    execute(wife) {
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                log(chalk_1.default `{green ${EntityNames_1.GetNameOfEntity(wife.ID)}: 床掃除をしています}`);
                break;
            case 1:
                log(chalk_1.default `{green ${EntityNames_1.GetNameOfEntity(wife.ID)}: 皿を洗っています}`);
                break;
            case 2:
                log(chalk_1.default `{green ${EntityNames_1.GetNameOfEntity(wife.ID)}: ベッドの用意をしています}`);
                break;
        }
    }
    exit(wife) { }
}
exports.DoHouseWork = DoHouseWork;
DoHouseWork._instance = null;
class VisitBathroom {
    constructor() {
        if (VisitBathroom._instance) {
            throw new Error("must use the getInstance.");
        }
        VisitBathroom._instance = this;
    }
    static getInstance() {
        if (VisitBathroom._instance === null) {
            VisitBathroom._instance = new VisitBathroom();
        }
        return VisitBathroom._instance;
    }
    enter(wife) {
        log(chalk_1.default `{green ${EntityNames_1.GetNameOfEntity(wife.ID)}: トイレに向かって歩いています。ちょっとお化粧を直してきます}`);
    }
    execute(wife) {
        log(chalk_1.default `{green ${EntityNames_1.GetNameOfEntity(wife.ID)}: あああ！ すっきりした！}`);
        wife.FSM.revertToPreviousState();
    }
    exit(wife) {
        log(chalk_1.default `{green ${EntityNames_1.GetNameOfEntity(wife.ID)}: トイレから離れています}`);
    }
}
exports.VisitBathroom = VisitBathroom;
VisitBathroom._instance = null;
