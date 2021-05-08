import { Miner } from './Miner'

export interface State {
    enter(miner: Miner): void;
    execute(miner: Miner): void;
    exit(miner: Miner): void;
}