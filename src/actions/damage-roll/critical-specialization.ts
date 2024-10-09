
import { AutomatonMessage } from "../../data/AutomatonMessage";
import { Utils } from "../../utils";

export default [
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:axe"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;


        }
    },
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:bow"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;

            await window.pf2eAutomaton.socket.createEmbeddedItem(message.target?.actor, {
                _id: null,
                type: "effect",
                img: "systems/pf2e/icons/effects/critical-effect.webp",
                name: `${game.i18n.localize("PF2E.Actor.Creature.CriticalSpecialization")} (${game.i18n.localize("PF2E.WeaponGroupBow")})`,
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null
                        },
                        target: {
                            actor: message.target.actor.uuid,
                            token: message.target.token?.uuid ?? null
                        },
                        roll: {
                            degreeOfSuccess: 3
                        }
                    },
                    description: {
                        value: game.i18n.localize("PF2E.Item.Weapon.CriticalSpecialization.bow")
                    },
                    rules: [{
                        key: "GrantItem",
                        // @ts-expect-error
                        onDeleteActions: {
                            grantee: "restrict"
                        },
                        uuid: Utils.CONDITIONS["immobilized"]
                    }]
                }
            });
        }
    },
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:brawling"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;

            window.pf2eAutomaton.socket.rollSave(message.target.actor, "fortitude", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["critical-specialization", "item:group:brawling"],
            });
        }
    },
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:firearm"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;

            window.pf2eAutomaton.socket.rollSave(message.target.actor, "fortitude", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["critical-specialization", "item:group:firearm"],
            });
        }
    },
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:flail"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;

            window.pf2eAutomaton.socket.rollSave(message.target.actor, "reflex", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["critical-specialization", "item:group:flail"],
            });
        }
    },
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:hammer"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;

            window.pf2eAutomaton.socket.rollSave(message.target.actor, "fortitude", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["critical-specialization", "item:group:hammer"],
            });
        }
    },
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:sling"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;

            window.pf2eAutomaton.socket.rollSave(message.target.actor, "reflex", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["critical-specialization", "item:group:sling"],
            });
        }
    },
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:spear"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;

            await window.pf2eAutomaton.socket.createEmbeddedItem(message.target?.actor, {
                _id: null,
                type: "effect",
                img: "systems/pf2e/icons/effects/critical-effect.webp",
                name: `${game.i18n.localize("PF2E.Actor.Creature.CriticalSpecialization")} (${game.i18n.localize("PF2E.WeaponGroupSpear")})`,
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null
                        },
                        target: {
                            actor: message.target.actor.uuid,
                            token: message.target.token?.uuid ?? null
                        },
                        roll: {
                            degreeOfSuccess: 3
                        }
                    },
                    description: {
                        value: game.i18n.localize("PF2E.Item.Weapon.CriticalSpecialization.spear")
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
                        uuid: Utils.CONDITIONS["clumsy"]
                    }]
                }
            });
        }
    },
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:sword"
        ],
        process: async (message: AutomatonMessage) => {
            if (!message.speaker?.actor || !message.target?.actor)
                return;

            await window.pf2eAutomaton.socket.createEmbeddedItem(message.target?.actor, {
                _id: null,
                type: "effect",
                img: "systems/pf2e/icons/effects/critical-effect.webp",
                name: `${game.i18n.localize("PF2E.Actor.Creature.CriticalSpecialization")} (${game.i18n.localize("PF2E.WeaponGroupSword")})`,
                system: {
                    context: {
                        origin: {
                            actor: message.speaker.actor.uuid,
                            token: message.speaker.token?.uuid ?? null,
                            item: message.item?.uuid ?? null,
                            spellcasting: null
                        },
                        target: {
                            actor: message.target.actor.uuid,
                            token: message.target.token?.uuid ?? null
                        },
                        roll: {
                            degreeOfSuccess: 3
                        }
                    },
                    description: {
                        value: game.i18n.localize("PF2E.Item.Weapon.CriticalSpecialization.sword")
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
                        uuid: Utils.CONDITIONS["off-guard"]
                    }]
                }
            });
        }
    }
]