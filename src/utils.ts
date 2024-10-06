import { ACTOR_TYPES } from "foundry-pf2e";

export namespace Utils {
    export namespace ChatMessage {
        export function simplePredicate(message: ChatMessagePF2e, ...options: string[]): boolean {
            let rollOptions = message.flags.pf2e.context?.options ?? [];
            return options.every((option) => rollOptions.includes(option));
        }
    }

    export namespace Actor {
        export async function decreaseCondition(actor: ActorPF2e, conditionSlug: string, options?: { forceRemove: boolean; }) {
            if (!actor.canUserModify(game.user, "update")) {
                window.pf2eAutomaton.socket.executeAsGM("Actor.decreaseCondition", actor.id, conditionSlug, options);
            }
    
            await actor.decreaseCondition(conditionSlug, options);
        }
    
        export async function increaseCondition(actor: ActorPF2e, conditionSlug: string, options?: { max?: number; value?: number | null; }) {
            if (!actor.canUserModify(game.user, "update")) {
                window.pf2eAutomaton.socket.executeAsGM("Actor.increaseCondition", actor.id, conditionSlug, options);
            }
    
            await actor.increaseCondition(conditionSlug, options);
        }

        export function getClassDC(actor: ActorPF2e): number | undefined {
            if (actor.type == "character") {
                return (actor as CharacterPF2e).system.attributes.classDC?.value;
            }

            if (actor.type == "npc") {
                return (actor as NPCPF2e).system.attributes.classDC.value;
            }
        }

        export async function rollSave(actor: ActorPF2e, save: SaveType, args: AutomatonStatisticRollParameters) {
            if (!actor.canUserModify(game.user, "update")) {
                window.pf2eAutomaton.socket.executeAsGM("Actor.rollSave", actor.id, save);
                return;
            }

            await actor.saves?.[save]?.roll({
                dc: args.dc
            });
        }

        export interface AutomatonStatisticRollParameters {
            dc?: CheckDC | CheckDCReference | number | null;
        }
    }
}

