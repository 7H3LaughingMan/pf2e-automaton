import { MODULE } from "foundry-pf2e";

import { onCreateChatMessage } from "./chatMessage";
import { onceSocketLibReady } from "./socket";

declare global {
    interface Window {
        pf2eAutomaton: PF2eAutomaton;
    }

    interface PF2eAutomaton {
        socket: SocketlibSocket;
    }
}

Object.assign(window, {
    pf2eAutomaton: {}
});

MODULE.register("pf2e-automaton", "PF2e Automation");

Hooks.once("socketlib.ready", onceSocketLibReady);
Hooks.on("createChatMessage", onCreateChatMessage);

