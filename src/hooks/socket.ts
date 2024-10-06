import { MODULE, RollNotePF2e } from "foundry-pf2e";
import { Utils } from "../utils";

Hooks.once("socketlib.ready", function () {
    window.pf2eAutomaton.socket = socketlib.registerModule(MODULE.id);
    window.pf2eAutomaton.socket.register("Actor.increaseCondition", Actor.increaseActorCondition);
    window.pf2eAutomaton.socket.register("Actor.decreaseCondition", Actor.decreaseActorCondition);
    window.pf2eAutomaton.socket.register("Actor.rollSave", Actor.rollSave);
});

namespace Actor {
    export async function rollSave(actorId: string, save: SaveType, args?: Types.StatisticRollParameters) {
        await Utils.Actor.rollSave(await fromUuid(actorId) as ActorPF2e, save, (!args ? undefined : {
            identifier: args.identifier,
            action: args.action,
            token: (!args.token ? undefined : await fromUuid(args.token) as TokenDocumentPF2e),
            attackNumber: args.attackNumber,
            target: (!args.target ? undefined : await fromUuid(args.target) as ActorPF2e),
            origin: (!args.origin ? undefined : await fromUuid(args.origin) as ActorPF2e),
            dc: args.dc,
            label: args?.label,
            slug: args.slug,
            title: args.title,
            extraRollNotes: args.extraRollNotes,
            extraRollOptions: args.extraRollOptions,
            modifiers: args.modifiers,
            item: (!args.item ? undefined : await fromUuid(args.item) as ItemPF2e<ActorPF2e>),
            rollMode: args.rollMode,
            skipDialog: args.skipDialog,
            rollTwice: args.rollTwice,
            traits: args.traits,
            damaging: args.damaging,
            melee: args.melee,
            createMessage: args.createMessage
        }));
    }

    export async function increaseActorCondition(actorId: string, conditionSlug: string, options?: { max?: number; value?: number | null; } | undefined) {
        await Utils.Actor.increaseCondition(await fromUuid(actorId) as ActorPF2e, conditionSlug, options);
    }

    export async function decreaseActorCondition(actorId: string, conditionSlug: string, options?: { forceRemove: boolean; }) {
        await Utils.Actor.decreaseCondition(await fromUuid(actorId) as ActorPF2e, conditionSlug, options);
    }
}

namespace Types {
    export interface StatisticRollParameters {
        identifier?: string;
        action?: string;
        token?: string;
        attackNumber?: number;
        target?: string;
        origin?: string;
        dc?: CheckDC | CheckDCReference | number | null;
        label?: string;
        slug?: string;
        title?: string;
        extraRollNotes?: (RollNotePF2e | RollNoteSource)[];
        extraRollOptions?: string[];
        modifiers?: ModifierPF2e[];
        item?: string;
        rollMode?: RollMode | "roll";
        skipDialog?: boolean;
        rollTwice?: RollTwiceOption;
        traits?: (TraitViewData | string)[];
        damaging?: boolean;
        melee?: boolean;
        createMessage?: boolean;
    }
}