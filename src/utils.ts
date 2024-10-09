export namespace Utils {
    export namespace Actor {
        export async function addEffect(actor: ActorPF2e, effect: PreCreate<EffectSource>): Promise<ItemPF2e[]> {
            return actor.createEmbeddedDocuments("Item", [effect]);
        }

        export function getClassDC(actor: ActorPF2e): CheckDC | number | undefined {
            if (actor.type == "character") {
                let character = actor as CharacterPF2e;

                return (!character.classDC ? undefined : {
                    label: `${character.classDC.label} DC`,
                    value: character.classDC.dc.value
                });
            }

            if (actor.type == "npc") {
                let npc = actor as NPCPF2e;
                return npc.attributes.classDC.value;
            }
        }

        export async function getItem(itemUuid: ItemUUID): Promise<ItemPF2e<ActorPF2e> | undefined> {
            let item = await fromUuid(itemUuid) as ItemPF2e<ActorPF2e>;
            if(!item) {
                let parts = itemUuid.split(".");
                let actor = await fromUuid(parts.slice(0, -2).join(".")) as ActorPF2e;
                if(actor) {
                    item = actor.system.actions?.find((x) => x.item.id == parts.at(-1))?.item as ItemPF2e<ActorPF2e>;
                }
            }

            if(item)
                return item;
        }
    }

    export namespace Effect {
        export function createEffect(): PreCreate<EffectSource> {
            return {
                _id: null,
                type: "effect",
                name: "",
            };
        }
    }
}

