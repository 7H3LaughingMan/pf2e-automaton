import { MODULE } from "foundry-pf2e";
import { Utils } from "./utils";

export function onceSocketLibReady() {
    window.pf2eAutomaton.socket = socketlib.registerModule(MODULE.id);
    window.pf2eAutomaton.socket.register("Actor.increaseCondition", Actor.increaseActorCondition);
    window.pf2eAutomaton.socket.register("Actor.decreaseCondition", Actor.decreaseActorCondition);
    window.pf2eAutomaton.socket.register("Actor.rollSave", Actor.rollSave);
}

namespace Actor {
    export async function rollSave(actorId:string, save: SaveType, args: Utils.Actor.AutomatonStatisticRollParameters) {
        await Utils.Actor.rollSave(await fromUuid(actorId) as ActorPF2e, save, args);
    }

    export async function increaseActorCondition(actorId: string, conditionSlug: string, options?: { max?: number; value?: number | null; } | undefined) {
        await Utils.Actor.increaseCondition(await fromUuid(actorId) as ActorPF2e, conditionSlug, options);
    }
    
    export async function decreaseActorCondition(actorId: string, conditionSlug: string, options?: { forceRemove: boolean; }) {
        await Utils.Actor.decreaseCondition(await fromUuid(actorId) as ActorPF2e, conditionSlug, options);
    }
}

