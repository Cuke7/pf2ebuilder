<template>
  <v-row justify="center" align="center">
    <v-col cols="6">
      <v-row justify="center" class="my-12">
        <div class="primary--text text-h1">Pathbuilder</div>
      </v-row>

      <v-row align="center">
        <v-col cols="6">
          <v-select
            :items="classList"
            label="Classe"
            v-model="selectedClasse"
            color="primary"
            item-text="translations.fr.name"
            return-object
          ></v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            :items="ancestryList"
            label="Héritage"
            v-model="selectedAncestry"
            color="primary"
            item-text="translations.fr.name"
            return-object
          ></v-select>
        </v-col>
      </v-row>

      <Picker
        :items="getClassFeatures"
        title="Capacités de classes"
        id="selectedClassFeatures"
      ></Picker>

      <Picker
        :items="getAncestryFeatures"
        title="Capacités d'héritage"
        id="selectedAncestryFeatures"
      ></Picker>

      <Picker :items="getFeats" title="Dons" id="selectedFeats"></Picker>

      <Picker :items="getSpells" title="Sorts" id="selectedSpells"></Picker>
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn color="primary" nuxt to="/export"> Exporter </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <!-- <v-col cols="6">
      <v-row justify="center" class="my-12">
        <div class="primary--text text-h1">Sélection</div>
      </v-row>
      <div class="ml-12">
        <v-card-title class="primary--text pl-0">
          Capacités de classe
        </v-card-title>
        <v-row v-for="(item, index) in selection.classFeatures" :key="index">
          <v-col cols="12">
            {{ item.translations.fr.name }}
          </v-col>
          <v-col
            cols="12"
            v-html="$store.getters.parse(item.translations.fr.description)"
          >
          </v-col>
        </v-row>
      </div>
    </v-col> -->
  </v-row>
</template>

<script>
export default {
  mouted() {
    this.selectedClasse = this.classList[0];
    this.selectedAncestry = this.ancestryList[0];
  },
  data: () => ({
    selectedClasse: null,
    selectedAncestry: null,
    classFeatures: [],
    ancestryFeatures: [],
    feats: [],
    maxLevel: 6,
  }),
  computed: {
    selection() {
      let selection = {};
      selection.classFeatures = this.$store.state.selectedClassFeatures;
      selection.ancestryFeatures = this.$store.state.selectedAncestryFeatures;
      selection.feats = this.$store.state.selectedFeats;
      selection.spells = this.$store.state.selectedSpells;
      return selection;
    },
    classList() {
      return this.$store.state.classeList;
    },
    ancestryList() {
      return this.$store.state.ancestries;
    },
    getClassFeatures() {
      if (this.selectedClasse) {
        let donsClasse = this.sort(
          this.$store.state.classFeatures.filter(
            (item) =>
              item.traits.includes(this.selectedClasse.name.toLowerCase()) &&
              item.level <= this.maxLevel
          )
        );
        return donsClasse;
      } else {
        return [];
      }
    },
    getAncestryFeatures() {
      if (this.selectedAncestry) {
        let donsClasse = this.sort(
          this.$store.state.ancestryFeatures.filter((item) =>
            item.traits.includes(this.selectedAncestry.name.toLowerCase())
          )
        );
        let dons = this.sort(
          this.$store.state.feats.filter((item) =>
            item.traits.includes(this.selectedAncestry.name.toLowerCase())
          )
        );

        return [].concat.apply([], [donsClasse, dons]);
      } else {
        return [];
      }
    },
    getFeats() {
      if (this.selectedClasse) {
        let generalFeats = this.sort(
          this.$store.state.feats.filter(
            (item) =>
              (item.traits.includes(this.selectedClasse.name.toLowerCase()) ||
                item.traits.includes("multiclass")) &&
              item.level <= this.maxLevel
          )
        );
        let feats = [];
        for (let i = 1; i < this.maxLevel + 1; i++) {
          feats.push({ header: "Niveau " + i });
          for (const feat of generalFeats) {
            if (feat.level == i) {
              feats.push(feat);
            }
          }
        }
        return feats;
      } else {
        return [];
      }
    },

    getSpells() {
      let spellsAll = this.sort(
        this.$store.state.spells.filter((item) => item.level <= this.maxLevel)
      );
      let spells = [];
      for (let i = 1; i < this.maxLevel + 1; i++) {
        spells.push({ header: "Niveau " + i });
        for (const spell of spellsAll) {
          if (spell.level == i) {
            spells.push(spell);
          }
        }
      }
      return spells;
    },
  },
  methods: {
    sort(arr) {
      return arr.sort((a, b) =>
        a.translations.fr.name.localeCompare(b.translations.fr.name)
      );
    },
  },
};
</script>
