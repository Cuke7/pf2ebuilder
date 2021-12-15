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
    return description;
  },
};

export const mutations = {
  updateSelection(state, infos) {
    let id = infos.id;
    let data = infos.data;
    state[id] = data;
  },
};
