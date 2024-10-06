import { Utils } from "../../utils";

export async function criticalSpecialization(trigger: string, rollOptions: Set<string>, actor: ActorPF2e | null, target: ActorPF2e | null) {
    if (!actor)
        return;

    if (rollOptions.has("origin:item:group:brawling")) {
        const rule = {
            key: "GrantItem",
            onDeleteActions: {
                grantee: "restrict"
            },
            uuid: "Compendium.pf2e.conditionitems.Item.xYTAsEpcJE1Ccni3"
        };

        let effects = await Utils.Actor.addEffect(actor, {
            _id: null,
            type: "effect",
            img: "systems/pf2e/icons/effects/critical-effect.webp",
            name: "Brawling Critical Specialization",
            system: {
                duration: {
                    expiry: "turn-end",
                    unit: "rounds",
                    value: 1
                },
                rules: [rule]
            }
        });

        await effects[0].update({ 'system.start.initiative': game.combat?.combatant?.initiative });
    }
}