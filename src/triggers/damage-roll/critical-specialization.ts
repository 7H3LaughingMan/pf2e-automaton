import { AutomatonMessage, AutomatonTrigger } from "../../data";

export default [
    {
        trigger: "damage-roll",
        predicate: [
            "critical-specialization",
            "check:outcome:critical-success",
            "item:group:brawling"
        ],
        process: async (message: AutomatonMessage) => {
            console.log("Brawling Critical Specialization!");
        }
    }
] as AutomatonTrigger[]