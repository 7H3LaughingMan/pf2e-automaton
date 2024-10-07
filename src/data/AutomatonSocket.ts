import { MODULE } from "foundry-pf2e";
import { Utils } from "../utils";

export class AutomatonSocket {
    #socket: SocketlibSocket;

    constructor() {
        this.#socket = socketlib.registerModule(MODULE.id);
        this.#socket.register("decreaseCondition", this.#decreaseCondition);
        this.#socket.register("increaseCondition", this.#increaseCondition);
    }

    async decreaseCondition(actor: ActorPF2e, conditionSlug: string, options?: { forceRemove: boolean; }) {
        if (!actor.canUserModify(game.user, "update")) {
            this.#socket.executeAsGM("decreaseCondition", actor.uuid, conditionSlug, options);
            return;
        }

        await actor.decreaseCondition(conditionSlug, options);
    }

    async #decreaseCondition(actorUuid: ActorUUID, conditionSlug: string, options?: { forceRemove: boolean; }) {
        await this.decreaseCondition(fromUuidSync(actorUuid) as ActorPF2e, conditionSlug, options);
    }

    async increaseCondition(actor: ActorPF2e, conditionSlug: string, options?: { max?: number; value?: number | null; }) {
        if (!actor.canUserModify(game.user, "update")) {
            this.#socket.executeAsGM("increaseCondition", actor.uuid, conditionSlug, options);
            return;
        }

        await actor.increaseCondition(conditionSlug, options);
    }

    async #increaseCondition(actorUuid: ActorUUID, conditionSlug: string, options?: { max?: number; value?: number | null; }) {
        await this.increaseCondition(fromUuidSync(actorUuid) as ActorPF2e, conditionSlug, options);
    }
}