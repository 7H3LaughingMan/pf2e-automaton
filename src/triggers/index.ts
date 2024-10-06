import { processDamageRoll } from "./damage-roll";
import { processSavingThrow } from "./saving-throw";

export async function processTrigger(trigger: string, rollOptions: Set<string>, actor: ActorPF2e | null, target: ActorPF2e | null) {
    switch (trigger) {
        case "damage-roll":
            return await processDamageRoll(trigger, rollOptions, actor, target);
        case "saving-throw":
            return await processSavingThrow(trigger, rollOptions, actor, target);
    }
    
}