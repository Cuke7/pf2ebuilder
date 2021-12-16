<template>
  <v-row justify="center" align="center">
    <v-col cols="8">
      <!------------------>
      <!--CLASS FEATURES-->
      <!------------------>
      <v-row justify="start" align="center" class="mb-6">
        <v-col cols="12">
          <v-card color="primary" class="pa-2 white--text text-h6" width="100%">
            CAPACITÉS DE CLASSE
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="space-around" align="start">
        <v-col
          cols="12"
          v-for="(item, index) in selection.classFeatures"
          :key="index"
        >
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
        </v-col>
      </v-row>

      <!--------------------->
      <!--ANCESTRY FEATURES-->
      <!--------------------->
      <v-row justify="start" align="center" class="mb-6">
        <v-col cols="12">
          <v-card color="primary" class="pa-2 white--text text-h6" width="100%">
            CAPACITÉS D'HÉRITAGE
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="space-around" align="start">
        <v-col
          cols="12"
          v-for="(item, index) in selection.ancestryFeatures"
          :key="index"
        >
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-card-title class="primary--text pa-0">
                {{ item.translations.fr.name }}
              </v-card-title>
            </v-col>
            <v-col cols="auto" v-if="item.level">
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
        </v-col>
      </v-row>
      <!-------->
      <!--DONS-->
      <!-------->
      <v-row justify="start" align="center" class="mb-6">
        <v-col cols="12">
          <v-card color="primary" class="pa-2 white--text text-h6" width="100%">
            DONS
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="space-around" align="start">
        <v-col cols="12" v-for="(item, index) in selection.feats" :key="index">
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-card-title class="primary--text pa-0">
                {{ item.translations.fr.name }}
              </v-card-title>
            </v-col>
            <v-col cols="auto" v-if="item.level">
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
        </v-col>
      </v-row>
      <!---------->
      <!--SPELLS-->
      <!---------->
      <v-row justify="start" align="center" class="mb-6">
        <v-col cols="12">
          <v-card color="primary" class="pa-2 white--text text-h6" width="100%">
            SORTS
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="space-around" align="start">
        <v-col cols="12" v-for="(item, index) in selection.spells" :key="index">
          <v-row justify="space-between">
            <v-col cols="auto">
              <v-card-title class="primary--text pa-0">
                {{ item.translations.fr.name }}
              </v-card-title>
            </v-col>
            <v-col cols="auto" v-if="item.level">
              <v-card-title class="primary--text pa-0">
                Niveau {{ item.level }}
              </v-card-title>
            </v-col>
          </v-row>
          <v-chip-group class="mt-2 mb-5">
            <v-chip
              v-for="(trait, index) in item.traits"
              :key="index"
              outlined
              color="primary"
            >
              {{ translate(trait) }}
            </v-chip>
          </v-chip-group>

          <v-row v-if="item.traditions" justify="start" align="center">
            <v-col cols="auto" class="pr-0 py-0">
              <span class="font-weight-bold">Traditions :</span>&nbsp;
            </v-col>
            <v-col
              cols="auto"
              v-for="(tradition, index) in item.traditions"
              :key="index"
              class="pl-0 py-0"
            >
              {{ translate(tradition) }}&nbsp;
            </v-col>
          </v-row>
          <v-row v-if="item.school">
            <v-col class="py-0">
              <span class="font-weight-bold">École : </span>&nbsp;{{
                item.school
              }}
            </v-col>
          </v-row>
          <v-row v-if="item.incantation.time">
            <v-col class="py-0">
              <span class="font-weight-bold">Incantation :&nbsp;</span
              >{{ item.incantation.time }}
            </v-col>
          </v-row>
          <v-row
            v-if="item.translations.fr.range || item.translations.fr.target"
            justify="start"
          >
            <v-col cols="auto" v-if="item.translations.fr.range" class="py-0">
              <span class="font-weight-bold">Portée : </span>
              {{ item.translations.fr.range }} ;&nbsp;
            </v-col>
            <v-col cols="auto" v-if="item.translations.fr.target" class="py-0">
              <span class="font-weight-bold">Cible(s) : </span>
              {{ item.translations.fr.target }}
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
        </v-col>
      </v-row>
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
  methods: {
    translate(text) {
      return this.$store.getters.translate(text);
    },
  },
};
</script>
