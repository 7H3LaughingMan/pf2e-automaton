import { AutomatonMessage } from "./AutomatonMessage";
import { AutomatonTrigger } from "./AutomatonTrigger";

export class AutomatonStorage {
    #data: AutomatonTrigger[] = [];

    addTrigger(trigger: AutomatonTrigger) {
        this.#data.push(trigger);
    }

    getTriggers(trigger: string): AutomatonTrigger[] {
        return this.#data.filter((x) => x.trigger == trigger)
    }

    async process(message: AutomatonMessage) {
        let triggers = this.#data.filter((x) => x.trigger == message.trigger);
        let foundTriggers = triggers.filter((x) => message.predicate(x.predicate));

        for (const trigger of foundTriggers) {
            await trigger.process(message);
        }
    }
}