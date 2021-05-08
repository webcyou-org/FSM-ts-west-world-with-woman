import { BaseGameEntity } from './BaseGameEntity'
import { StateMachine } from './StateMachine'
import { LOCATION_TYPE } from './Locations'
import { DoHouseWork, WifesGlobalState } from './MinersWifeOwnedStates'

export class MinersWife extends BaseGameEntity {
    private _stateMachine: StateMachine;
    private _location: LOCATION_TYPE;

    constructor(id: number) {
        super(id);

        this._location = LOCATION_TYPE.SHACK;
        this._stateMachine = new StateMachine(this);
        this._stateMachine.currentState = DoHouseWork.getInstance();
        this._stateMachine.globalState = WifesGlobalState.getInstance();
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

    update(): void {
        this._stateMachine.update();
    }
}