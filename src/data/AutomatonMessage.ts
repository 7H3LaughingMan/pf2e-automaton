const CHECK_TYPE = [
    "attack-roll",
    "check",
    "counteract-check",
    "flat-check",
    "initiative",
    "perception-check",
    "saving-throw",
    "skill-check"
];

export class AutomatonMessage {
    trigger?: string;
    rollOptions?: string[];
    checkRoll?: CheckRoll;
    item?: ItemPF2e<ActorPF2e>;
    speaker?: AutomatonActor;
    origin?: AutomatonActor;
    target?: AutomatonActor;

    static async initialize(chatMessage: ChatMessagePF2e): Promise<AutomatonMessage> {
        let message = new AutomatonMessage();
        message.trigger = chatMessage.flags.pf2e.context?.type ?? "";
        message.item = chatMessage.item ?? undefined;

        const rollOptions = new Set(chatMessage.flags.pf2e.context?.options ?? []);
        const outcome = chatMessage.flags.pf2e.context?.outcome;
        if (outcome) rollOptions.add(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

        if (chatMessage.actor && chatMessage.token) {
            message.speaker = {
                actor: chatMessage.actor,
                token: chatMessage.token
            };
        }

        if (chatMessage.target?.actor && chatMessage.target.token) {
            message.target = {
                actor: chatMessage.target.actor,
                token: chatMessage.target.token
            };
        }

        if (chatMessage.flags.pf2e.context?.type && CHECK_TYPE.includes(chatMessage.flags.pf2e.context.type)) {
            let checkContext = chatMessage.flags.pf2e.context as CheckContextChatFlag;

            if (checkContext.origin) {
                message.origin = {
                    actor: await fromUuid(checkContext.origin.actor) as ActorPF2e,
                    token: !checkContext.origin.token ? undefined : await fromUuid(checkContext.origin.token) as TokenDocumentPF2e
                };
            }
        }

        if (chatMessage.flags.pf2e.strike) {
            let strike = chatMessage.flags.pf2e.strike;

            let actor = await fromUuid(strike.actor) as ActorPF2e;
            message.item = actor.system.actions?.[strike.index].item;
        }

        if(chatMessage.isCheckRoll) {
            message.checkRoll = chatMessage.rolls.at(0) as CheckRoll;
        }
        
        message.rollOptions = Array.from(rollOptions).sort();
        return message;
    }

    predicate(predicate?: PredicateStatement[]): boolean {
        return game.pf2e.Predicate.test(predicate, this.rollOptions);
    }
}

interface AutomatonActor {
    actor: ActorPF2e;
    token?: TokenDocumentPF2e | null;
}