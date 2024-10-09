import { AutomatonMessage } from "./AutomatonMessage";
import { AutomatonAction } from "./AutomatonAction";

const actions = import.meta.glob('../actions/**/*.ts', { import: "default" });

export class AutomatonStorage {
    #data: AutomatonAction[] = [];

    constructor() {
        for (const path in actions) {
            actions[path]().then((mod) => {
                // @ts-expect-error
                this.#data.push(...mod);
            });
        }
    }

    async process(message: AutomatonMessage) {
        let actions = this.#data.filter((x) => x.trigger == message.trigger && message.predicate(x.predicate));

        actions.forEach(action => {
            action.process(message)
        });
    }
}