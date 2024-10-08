import { MODULE, RollNotePF2e } from "foundry-pf2e";
import { Utils } from "../utils";

export class AutomatonSocket {
    #socket: SocketlibSocket;

    constructor() {
        this.#socket = socketlib.registerModule(MODULE.id);
        this.#socket.register("createEmbeddedItem", this.#createEmbeddedItem);
        this.#socket.register("decreaseCondition", this.#decreaseCondition);
        this.#socket.register("increaseCondition", this.#increaseCondition);
        this.#socket.register("toggleCondition", this.#toggleCondition);
        this.#socket.register("rollSave", this.#rollSave);
    }

    async createEmbeddedItem(actor: ActorPF2e, data: PreCreate<ItemSourcePF2e>) {
        if (!actor.canUserModify(game.user, "update")) {
            this.#socket.executeAsGM("createEmbeddedItem", actor.uuid, data);
            return;
        }

        await actor.createEmbeddedDocuments("Item", [data]);
    }

    async #createEmbeddedItem(actorUuid: ActorUUID, data: PreCreate<ItemSourcePF2e>) {
        await window.pf2eAutomaton.socket.createEmbeddedItem(await fromUuid(actorUuid) as ActorPF2e, data);
    }

    async decreaseCondition(actor: ActorPF2e, conditionSlug: ConditionSlug, options?: { forceRemove: boolean; }) {
        if (!actor.canUserModify(game.user, "update")) {
            this.#socket.executeAsGM("decreaseCondition", actor.uuid, conditionSlug, options);
            return;
        }

        await actor.decreaseCondition(conditionSlug, options);
    }

    async #decreaseCondition(actorUuid: ActorUUID, conditionSlug: ConditionSlug, options?: { forceRemove: boolean; }) {
        await window.pf2eAutomaton.socket.decreaseCondition(await fromUuid(actorUuid) as ActorPF2e, conditionSlug, options);
    }

    async increaseCondition(actor: ActorPF2e, conditionSlug: ConditionSlug, options?: { max?: number; value?: number | null; }) {
        if (!actor.canUserModify(game.user, "update")) {
            this.#socket.executeAsGM("increaseCondition", actor.uuid, conditionSlug, options);
            return;
        }

        await actor.increaseCondition(conditionSlug, options);
    }

    async #increaseCondition(actorUuid: ActorUUID, conditionSlug: ConditionSlug, options?: { max?: number; value?: number | null; }) {
        await window.pf2eAutomaton.socket.increaseCondition(await fromUuid(actorUuid) as ActorPF2e, conditionSlug, options);
    }

    async toggleCondition(actor: ActorPF2e, conditionSlug: ConditionSlug, options?: { active?: boolean}) {
        if (!actor.canUserModify(game.user, "update")) {
            this.#socket.executeAsGM("toggleCondition", actor.uuid, conditionSlug, options);
            return;
        }

        await actor.toggleCondition(conditionSlug, options);
    }

    async #toggleCondition(actorUuid: ActorUUID, conditionSlug: ConditionSlug, options?: { active?: boolean}) {
        await window.pf2eAutomaton.socket.toggleCondition(await fromUuid(actorUuid) as ActorPF2e, conditionSlug, options);
    }

    async rollSave(actor: ActorPF2e, save: SaveType, args?: StatisticRollParameters) {
        if (!actor.canUserModify(game.user, "update")) {
            this.#socket.executeAsGM("rollSave", actor.uuid, save, (!args ? undefined : {
                identifier: args.identifier,
                action: args.action,
                token: (!args.token ? undefined : args.token.uuid),
                attackNumber: args.attackNumber,
                target: (!args.target ? undefined : args.target.uuid),
                origin: (!args.origin ? undefined : args.origin.uuid),
                dc: args.dc,
                label: args.label,
                slug: args.slug,
                title: args.title,
                extraRollNotes: args.extraRollNotes,
                extraRollOptions: args.extraRollOptions,
                modifiers: args.modifiers,
                item: (!args.item ? undefined : args.item.uuid),
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

    async #rollSave(actorUuid: ActorUUID, save: SaveType, args?: Types.StatisticRollParameters) {
        await window.pf2eAutomaton.socket.rollSave(await fromUuid(actorUuid) as ActorPF2e, save, (!args ? undefined : {
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
            item: (!args.item ? undefined : await Utils.Actor.getItem(args.item)),
            rollMode: args.rollMode,
            skipDialog: args.skipDialog,
            rollTwice: args.rollTwice,
            traits: args.traits,
            damaging: args.damaging,
            melee: args.melee,
            createMessage: args.createMessage
        }));
    }
}

namespace Types {
    export interface StatisticRollParameters {
        identifier?: string;
        action?: string;
        token?: TokenDocumentUUID;
        attackNumber?: number;
        target?: ActorUUID;
        origin?: ActorUUID;
        dc?: CheckDC | CheckDCReference | number | null;
        label?: string;
        slug?: string;
        title?: string;
        extraRollNotes?: (RollNotePF2e | RollNoteSource)[];
        extraRollOptions?: string[];
        modifiers?: ModifierPF2e[];
        item?: ItemUUID;
        rollMode?: RollMode | "roll";
        skipDialog?: boolean;
        rollTwice?: RollTwiceOption;
        traits?: (TraitViewData | string)[];
        damaging?: boolean;
        melee?: boolean;
        createMessage?: boolean;
    }
}