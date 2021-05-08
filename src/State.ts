import { Miner } from './Miner'
import { MinersWife } from './MinersWife'

export interface State {
    enter(miner: Miner | MinersWife): void;
    execute(miner: Miner | MinersWife): void;
    exit(miner: Miner | MinersWife): void;
}