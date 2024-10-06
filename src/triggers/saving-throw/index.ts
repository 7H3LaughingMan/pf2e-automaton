import { criticalSpecialization } from "./critical-specialization";

export async function processSavingThrow(trigger: string, rollOptions: Set<string>, actor: ActorPF2e | null, target: ActorPF2e | null) {
    if (rollOptions.has("origin:critical-specialization") && (rollOptions.has("check:outcome:critical-failure") || rollOptions.has("check:outcome:failure")))
        await criticalSpecialization(trigger, rollOptions, actor, target);
}