import { processDamageRoll } from "./damageRoll";

export async function onCreateChatMessage(message: ChatMessagePF2e) {
    switch (message.flags.pf2e.context?.type) {
        case "damage-roll":
            processDamageRoll(message);
            break;
    }
}