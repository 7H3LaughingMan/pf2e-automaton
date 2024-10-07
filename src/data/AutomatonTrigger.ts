import { AutomatonMessage } from "./AutomatonMessage"

export interface AutomatonTrigger {
    trigger: string;
    predicate: PredicateStatement[];
    process(message: AutomatonMessage): Promise<void>;
}