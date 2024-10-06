import { Utils } from "../../utils";
import { processCriticalSpecialization } from "./criticalSpecialization";

export async function processDamageRoll(message: ChatMessagePF2e) {
    if(message.actor == null || message.target?.actor == null)
        return;

    if (Utils.ChatMessage.simplePredicate(message, "critical-specialization", "check:outcome:critical-success")) {
        await processCriticalSpecialization(message);
    }
}