import { processTrigger } from "../triggers/index.js";

Hooks.on("createChatMessage", async function(message: ChatMessagePF2e) {
    if(!message.isAuthor)
        return;

    const rollOptions = new Set(message.flags.pf2e.context?.options ?? []);
    let trigger = message.flags.pf2e.context?.type as string;

    const outcome = message.flags.pf2e.context?.outcome;
    if (outcome) rollOptions.add(`check:outcome:${game.pf2e.system.sluggify(outcome)}`);

    const actor = message.actor ?? null;
    const target = message.target?.actor ?? null;

    processTrigger(trigger, rollOptions, actor, target);
});