import { MODULE } from "foundry-pf2e";
import { AutomatonMessage, AutomatonSocket, AutomatonStorage } from "./data";

// @ts-ignore
import * as TriggerData from "./triggers/**/*.ts";

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

Hooks.once("init", function () {
    for (const triggers of TriggerData.default) {
        window.pf2eAutomaton.storage.data.push(...triggers.default);
    }
});

Hooks.once("socketlib.ready", function () {
    window.pf2eAutomaton.socket = new AutomatonSocket();
});

Hooks.on("createChatMessage", async function (chatMessage: ChatMessagePF2e) {
    if (!chatMessage.isAuthor)
        return;

    window.pf2eAutomaton.storage.process(new AutomatonMessage(chatMessage));
});