
import { AutomatonMessage } from "../../data/AutomatonMessage";
import { Utils } from "../../utils";

export default [
    {
        trigger: "damage-roll",
        predicate: [
            "check:outcome:critical-success",
            "critical-specialization",
            "item:group:brawling"
        ],
        process: async (message: AutomatonMessage) => {
            if(!message.speaker?.actor || !message.target?.actor)
                return;

            window.pf2eAutomaton.socket.rollSave(message.target.actor, "fortitude", {
                origin: message.speaker?.actor,
                dc: Utils.Actor.getClassDC(message.speaker.actor),
                extraRollOptions: ["critical-specialization"],
                item: message.item
            })
        }
    }
]