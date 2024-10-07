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
    trigger: string;
    rollOptions: string[];
    speaker?: AutomatonActor;
    origin?: AutomatonActor;
    target?: AutomatonActor;

    constructor(message: ChatMessagePF2e) {
        this.trigger = message.flags.pf2e.context?.type ?? "";

        const rollOptions = new Set(message.flags.pf2e.context?.options ?? []);
        const outcome = message.flags.pf2e.context?.outcome;
        if (outcome) rollOptions.add(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

        if (message.actor) {
            this.speaker = {
                actor: message.actor,
                token: !message.token ? undefined : message.token
            };

            message.actor.getRollOptions()
        }

        if (message.flags.pf2e.context?.type && CHECK_TYPE.includes(message.flags.pf2e.context.type)) {
            let checkContext = message.flags.pf2e.context as CheckContextChatFlag;

            if (checkContext.origin) {
                this.origin = {
                    actor: fromUuidSync(checkContext.origin.actor) as ActorPF2e,
                    token: !checkContext.origin.token ? undefined : (fromUuidSync(checkContext.origin.token) as unknown) as TokenDocumentPF2e
                }
            }

            if (checkContext.target) {
                this.target = {
                    actor: fromUuidSync(checkContext.target.actor) as ActorPF2e,
                    token: !checkContext.target.token ? undefined : (fromUuidSync(checkContext.target.token) as unknown) as TokenDocumentPF2e
                }
            }
        }

        this.rollOptions = Array.from(rollOptions).sort();
    }

    predicate(predicate?: PredicateStatement[]): boolean {
        return game.pf2e.Predicate.test(predicate, this.rollOptions);
    }
}

interface AutomatonActor {
    actor: ActorPF2e;
    token?: TokenDocumentPF2e | null;
}