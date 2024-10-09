export namespace Utils {
    export const enum CONDITIONS {
        "blinded" = "Compendium.pf2e.conditionitems.Item.XgEqL1kFApUbl5Z2",
        "broken" = "Compendium.pf2e.conditionitems.Item.6dNUvdb1dhToNDj3",
        "clumsy" = "Compendium.pf2e.conditionitems.Item.i3OJZU2nk64Df3xm",
        "concealed" = "Compendium.pf2e.conditionitems.Item.DmAIPqOBomZ7H95W",
        "confused" = "Compendium.pf2e.conditionitems.Item.yblD8fOR1J8rDwEQ",
        "controlled" = "Compendium.pf2e.conditionitems.Item.9qGBRpbX9NEwtAAr",
        "cursebound" = "Compendium.pf2e.conditionitems.Item.zXZjC8HLaRoLR17U",
        "dazzled" = "Compendium.pf2e.conditionitems.Item.TkIyaNPgTZFBCCuh",
        "deafened" = "Compendium.pf2e.conditionitems.Item.9PR9y0bi4JPKnHPR",
        "doomed" = "Compendium.pf2e.conditionitems.Item.3uh1r86TzbQvosxv",
        "drained" = "Compendium.pf2e.conditionitems.Item.4D2KBtexWXa6oUMR",
        "dying" = "Compendium.pf2e.conditionitems.Item.yZRUzMqrMmfLu0V1",
        "encumbered" = "Compendium.pf2e.conditionitems.Item.D5mg6Tc7Jzrj6ro7",
        "enfeebled" = "Compendium.pf2e.conditionitems.Item.MIRkyAjyBeXivMa7",
        "fascinated" = "Compendium.pf2e.conditionitems.Item.AdPVz7rbaVSRxHFg",
        "fatigued" = "Compendium.pf2e.conditionitems.Item.HL2l2VRSaQHu9lUw",
        "fleeing" = "Compendium.pf2e.conditionitems.Item.sDPxOjQ9kx2RZE8D",
        "friendly" = "Compendium.pf2e.conditionitems.Item.v66R7FdOf11l94im",
        "frightened" = "Compendium.pf2e.conditionitems.Item.TBSHQspnbcqxsmjL",
        "grabbed" = "Compendium.pf2e.conditionitems.Item.kWc1fhmv9LBiTuei",
        "helpful" = "Compendium.pf2e.conditionitems.Item.v44P3WUcU1j0115l",
        "hidden" = "Compendium.pf2e.conditionitems.Item.iU0fEDdBp3rXpTMC",
        "hostile" = "Compendium.pf2e.conditionitems.Item.ud7gTLwPeklzYSXG",
        "immobilized" = "Compendium.pf2e.conditionitems.Item.eIcWbB5o3pP6OIMe",
        "indifferent" = "Compendium.pf2e.conditionitems.Item.fuG8dgthlDWfWjIA",
        "invisible" = "Compendium.pf2e.conditionitems.Item.zJxUflt9np0q4yML",
        "observed" = "Compendium.pf2e.conditionitems.Item.1wQY3JYyhMYeeV2G",
        "off-guard" = "Compendium.pf2e.conditionitems.Item.AJh5ex99aV6VTggg",
        "paralyzed" = "Compendium.pf2e.conditionitems.Item.6uEgoh53GbXuHpTF",
        "persistent-damage" = "Compendium.pf2e.conditionitems.Item.lDVqvLKA6eF3Df60",
        "petrified" = "Compendium.pf2e.conditionitems.Item.dTwPJuKgBQCMxixg",
        "prone" = "Compendium.pf2e.conditionitems.Item.j91X7x0XSomq8d60",
        "quickened" = "Compendium.pf2e.conditionitems.Item.nlCjDvLMf2EkV2dl",
        "restrained" = "Compendium.pf2e.conditionitems.Item.VcDeM8A5oI6VqhbM",
        "sickened" = "Compendium.pf2e.conditionitems.Item.fesd1n5eVhpCSS18",
        "slowed" = "Compendium.pf2e.conditionitems.Item.xYTAsEpcJE1Ccni3",
        "stunned" = "Compendium.pf2e.conditionitems.Item.dfCMdR4wnpbYNTix",
        "stupefied" = "Compendium.pf2e.conditionitems.Item.e1XGnhKNSQIm5IXg",
        "unconscious" = "Compendium.pf2e.conditionitems.Item.fBnFDH2MTzgFijKf",
        "undetected" = "Compendium.pf2e.conditionitems.Item.VRSef5y1LmL2Hkjf",
        "unfriendly" = "Compendium.pf2e.conditionitems.Item.I1ffBVISxLr2gC4u",
        "unnoticed" = "Compendium.pf2e.conditionitems.Item.9evPzg9E6muFcoSk",
        "wounded" = "Compendium.pf2e.conditionitems.Item.Yl48xTdMh3aeQYL2",
    };

    export namespace Actor {
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
            if (!item) {
                let parts = itemUuid.split(".");
                let actor = await fromUuid(parts.slice(0, -2).join(".")) as ActorPF2e;
                if (actor) {
                    item = actor.system.actions?.find((x) => x.item.id == parts.at(-1))?.item as ItemPF2e<ActorPF2e>;
                }
            }

            if (item)
                return item;
        }
    }
}

