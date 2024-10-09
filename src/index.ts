import { MODULE } from "foundry-pf2e";
import { AutomatonSocket } from "./data/AutomatonSocket";
import { AutomatonStorage } from "./data/AutomatonStorage";
import { AutomatonMessage } from "./data/AutomatonMessage";

MODULE.register("pf2e-automaton", "PF2e Automation");

declare global {
    interface Window {
        pf2eAutomaton: PF2eAutomaton;
    }

    interface PF2eAutomaton {
        socket: AutomatonSocket;
        storage: AutomatonStorage;
    }
}

Object.assign(window, {
    pf2eAutomaton: {
        socket: undefined,
        storage: new AutomatonStorage()
    }
});

Hooks.once("socketlib.ready", function () {
    window.pf2eAutomaton.socket = new AutomatonSocket();
});

Hooks.on("createChatMessage", async function (chatMessage: ChatMessagePF2e) {
    if (!chatMessage.isAuthor)
        return;

    window.pf2eAutomaton.storage.process(await AutomatonMessage.initialize(chatMessage));
});