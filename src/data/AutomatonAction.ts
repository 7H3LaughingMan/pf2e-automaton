import { AutomatonMessage } from "./AutomatonMessage"

export interface AutomatonAction {
    trigger: string;
    predicate: PredicateStatement[];
    process(message: AutomatonMessage): Promise<void>;
}