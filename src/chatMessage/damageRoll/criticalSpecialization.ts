import { Utils } from "../../utils";

export async function processCriticalSpecialization(message: ChatMessagePF2e) {
    if (Utils.ChatMessage.simplePredicate(message, "item:group:brawling")) {
        Utils.Actor.rollSave(message.target!.actor, "fortitude", { dc: Utils.Actor.getClassDC(message.actor!) });
    }
}