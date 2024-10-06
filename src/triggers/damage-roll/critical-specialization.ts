import { Utils } from "../../utils";

export async function criticalSpecialization(trigger: string, rollOptions: Set<string>, actor: ActorPF2e, target: ActorPF2e) {
    if (rollOptions.has("item:group:brawling"))
        Utils.Actor.rollSave(target, "fortitude", {
            origin: actor,
            dc: Utils.Actor.getClassDC(actor),
            extraRollOptions: ["origin:critical-specialization", "origin:item:group:brawling"]
        });
}