import { criticalSpecialization } from "./critical-specialization";

export async function processDamageRoll(trigger: string, rollOptions: Set<string>, actor: ActorPF2e | null, target: ActorPF2e | null) {
    if (actor == null || target == null)
        return;

    if (rollOptions.has("critical-specialization") && rollOptions.has("check:outcome:critical-success"))
        await criticalSpecialization(trigger, rollOptions, actor, target);
}