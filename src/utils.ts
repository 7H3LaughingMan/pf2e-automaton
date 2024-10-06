export namespace Utils {
    export namespace ChatMessage {
        export function simplePredicate(message: ChatMessagePF2e, ...options: string[]): boolean {
            let rollOptions = message.flags.pf2e.context?.options ?? [];
            return options.every((option) => rollOptions.includes(option));
        }
    }

    export namespace Actor {
        export async function addEffect(actor: ActorPF2e, effect: PreCreate<EffectSource>): Promise<ItemPF2e[]> {
            return actor.createEmbeddedDocuments("Item", [effect]);
        }

        export async function decreaseCondition(actor: ActorPF2e, conditionSlug: string, options?: { forceRemove: boolean; }) {
            if (!actor.canUserModify(game.user, "update")) {
                window.pf2eAutomaton.socket.executeAsGM("Actor.decreaseCondition", actor.id, conditionSlug, options);
                return;
            }
    
            await actor.decreaseCondition(conditionSlug, options);
        }
    
        export async function increaseCondition(actor: ActorPF2e, conditionSlug: string, options?: { max?: number; value?: number | null; }) {
            if (!actor.canUserModify(game.user, "update")) {
                window.pf2eAutomaton.socket.executeAsGM("Actor.increaseCondition", actor.id, conditionSlug, options);
                return;
            }
    
            await actor.increaseCondition(conditionSlug, options);
        }

        export function getClassDC(actor: ActorPF2e): CheckDC | number | undefined  {
            if (actor.type == "character") {
                let character = actor as CharacterPF2e;

                return (!character.classDC ? undefined : {
                    label: `${character.classDC.label} DC`,
                    value: character.classDC.dc.value
                });
            }

            if (actor.type == "npc") {
                let npc = actor as NPCPF2e;
                return npc.attributes.classDC.value;
            }
        }

        export async function rollSave(actor: ActorPF2e, save: SaveType, args?: StatisticRollParameters) {
            if (!actor.canUserModify(game.user, "update")) {
                window.pf2eAutomaton.socket.executeAsGM("Actor.rollSave", actor.id, save, (!args ? undefined : {
                    identifier: args.identifier,
                    action: args.action,
                    token: (!args.token ? undefined : args.token.id),
                    attackNumber: args.attackNumber,
                    target: (!args.target ? undefined : args.target.id),
                    origin: (!args.origin ? undefined : args.origin.id),
                    dc: args.dc,
                    label: args.label,
                    slug: args.slug,
                    title: args.title,
                    extraRollNotes: args.extraRollNotes,
                    modifiers: args.modifiers,
                    item: (!args.item ? undefined : args.item.id),
                    rollMode: args.rollMode,
                    skipDialog: args.skipDialog,
                    rollTwice: args.rollTwice,
                    traits: args.traits,
                    damaging: args.damaging,
                    melee: args.melee,
                    createMessage: args.createMessage
                }));
                return;
            }

            await actor.saves?.[save]?.roll(args);
        }
    }

    export namespace Effect {
        export function createEffect(): PreCreate<EffectSource> {
            return {
                _id: null,
                type: "effect",
                name: "",
            };
        }
    }
}

