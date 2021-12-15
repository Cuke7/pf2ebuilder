<template>
  <v-autocomplete
    v-model="selection"
    :items="items"
    chips
    color="primary"
    outlined
    :label="title"
    item-text="translations.fr.name"
    return-object
    multiple
    item-color="primary"
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
        color="primary"
      >
        {{ data.item.translations.fr.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-content>
          <v-list-item-title
            v-html="data.item.translations.fr.name"
          ></v-list-item-title>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  props: ["items", "title", "id"],

  data: () => ({
    selection: [],
  }),

  watch: {
    selection(newVal) {
      this.$store.commit("updateSelection", { id: this.id, data: newVal });
    },
  },

  methods: {
    remove(item) {
      let arr = [...this.selection];
      arr.splice(arr.indexOf(item), 1);
      this.selection = arr;
    },
  },
};
</script>
