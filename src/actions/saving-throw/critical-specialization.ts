
import { AutomatonMessage } from "../../data/AutomatonMessage";
import { Utils } from "../../utils";

export default [
    {
        trigger: "saving-throw",
        predicate: [
            {
                "or": [
                    "check:outcome:failure",
                    "check:outcome:critical-failure"
                ]
            },
            "critical-specialization",
            "item:group:brawling"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.origin?.actor)
                return;

            await Utils.Actor.addEffect(message.speaker?.actor, {
                _id: null,
                type: "effect",
                img: "systems/pf2e/icons/effects/critical-effect.webp",
                name: "Critical Specialization (Brawling)",
                system: {
                    context: {
                        origin: {
                            actor: message.origin.actor.uuid,
                            token: message.origin.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null
                        },
                        target: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null
                        },
                        roll: {
                            total: 0,
                            degreeOfSuccess: 0
                        }
                    },
                    duration: {
                        expiry: "turn-end",
                        unit: "rounds",
                        value: 1
                    },
                    rules: [{
                        key: "GrantItem",
                        // @ts-expect-error
                        onDeleteActions: {
                            grantee: "restrict"
                        },
                        uuid: "Compendium.pf2e.conditionitems.Item.xYTAsEpcJE1Ccni3"
                    }]
                }
            });
        }
    }
]