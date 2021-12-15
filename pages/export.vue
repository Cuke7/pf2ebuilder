<template>
  <v-row justify="start" align="center">
    <v-col cols="6">
      <v-row justify="start" align="center" class="mb-6">
        <v-col cols="12">
          <v-card color="primary" class="pa-2 white--text text-h6" width="100%">
            CAPACITÉS DE CLASSE
          </v-card>
        </v-col>
      </v-row>
      <div v-for="(item, index) in selection.classFeatures" :key="index">
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-card-title class="primary--text pa-0">
              {{ item.translations.fr.name }}
            </v-card-title>
          </v-col>
          <v-col cols="auto">
            <v-card-title class="primary--text pa-0">
              Niveau {{ item.level }}
            </v-card-title>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="auto"
            v-html="$store.getters.parse(item.translations.fr.description)"
            class="text-justify"
          >
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    selection() {
      let selection = {};
      selection.classFeatures = this.$store.state.selectedClassFeatures;
      selection.ancestryFeatures = this.$store.state.selectedAncestryFeatures;
      selection.feats = this.$store.state.selectedFeats;
      selection.spells = this.$store.state.selectedSpells;
      return selection;
    },
  },
};
</script>
