import { AutomatonMessage } from "../../data";

window.pf2eAutomaton.storage.addTrigger({
    trigger: "damage-roll",
    predicate: [
        "critical-specialization",
        "check:outcome:critical-success",
        "item:group:brawling"
    ],
    process: async (message: AutomatonMessage) => {
        console.log("Brawling Critical Specialization!");
    }
});