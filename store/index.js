import ancestries from "~/static/data/ancestries.json";
import ancestryfeatures from "~/static/data/ancestryfeatures.json";
import archetypes from "~/static/data/archetypes.json";
import classeList from "~/static/data/classeList.json";
import classfeatures from "~/static/data/classfeatures.json";
import feats_srd from "~/static/data/feats-srd.json";
import spells_srd from "~/static/data/spells-srd.json";

export const state = () => ({
  spells: spells_srd.filter((item) => item.translations.fr.status != "aucune"),
  //
  feats: feats_srd.filter((item) => item.translations.fr.status != "aucune"),
  //
  classeList: classeList.filter(
    (item) => item.translations.fr.status != "aucune"
  ),
  //
  classFeatures: classfeatures.filter(
    (item) => item.translations.fr.status != "aucune"
  ),
  ancestryFeatures: ancestryfeatures.filter(
    (item) => item.translations.fr.status != "aucune"
  ),
  ancestries: ancestries.filter(
    (item) => item.translations.fr.status != "aucune"
  ),

  // Selection
  selectedClassFeatures: [],
  selectedAncestryFeatures: [],
  selectedFeats: [],
  selectedSpells: [],
});

export const getters = {
  parse: (state) => (text) => {
    let regex =
      /@Compendium\[pf2e\.[ ]*?([A-z-0-9]*?)\.[ ]*?([A-z0-9]*?)\]\{(.*?)\}/gm;
    let description = text;
    let matchs = description.matchAll(regex);
    for (const match of matchs) {
      description = description.replace(match[0], match[3]);
    }
    description = description.replaceAll("[[/r ", "");
    description = description.replaceAll("#", "");
    description = description.replaceAll("]]", "");
    return description;
  },
  translate: (state) => (text) => {
    let dictionary = [
      ["water", "eau"],
      ["primal", "primale"],
      ["evocation", "évocation"],
      ["occult", "occulte"],
      ["necromancy", "nécromancie"],
      ["negative", "négative"],
      ["enchantment", "enchantement"],
      ["bard", "barde"],
      ["cleric", "clerc"],
      ["bard", "barde"],
      ["sorcerer", "sorcier"],
      ["druid", "druide"],
      ["wizard", "magicien"],
      ["teleportation", "téléportation"],
      ["concentrate", "concentration"],
      ["electricity", "électricité"],
      ["nonlethal", "non léthal"],
      ["prediction", "prédiction"],
      ["detection", "détection"],
      ["visual", "visuel"],
      ["litany", "litanie"],
      ["evil", "mauvais"],
      ["good", "bon"],
      ["fire", "feu"],
      ["cantrip", "tour de magie"],
      ["poison", "poison"],
      ["curse", "malédiction"],
      ["cursebound", "malédiction"],
      ["death", "mort"],
      ["morph", "métamorphose"],
      ["earth", "terre"],
      ["fear", "peur"],
      ["darkness", "obscurité"],
      ["hot", "chaleur"],
      ["cold", "froid"],
      ["uncommon", "peu commun"],
      ["shadow", "ombre"],
      ["healing", "soin"],
      ["attack", "attaque"],
      ["sonic", "son"],
    ];
    let newText = text;
    // console.log(newText);
    for (const word of dictionary) {
      newText = newText.replace(word[0], word[1]);
      // console.log(newText);
    }
    return newText;
  },
};

export const mutations = {
  updateSelection(state, infos) {
    let id = infos.id;
    let data = infos.data;
    state[id] = data;
  },
};
