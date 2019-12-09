<template>
  <v-app id="app">
    <v-menu bottom origin="center center" transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">{{ selectedItem }}</v-btn>
      </template>

      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" @click="selectedExcercice(item)">
          <v-list-tile-title>
            <span>{{ item.title }}</span>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <component :is="selectedComponent"></component>
  </v-app>
</template>


<script>
import Vocabulaire from "./components/Vocabulaire.vue";
import Numbers from "./components/Numbers.vue";
import Heures from "./components/Heures.vue";
import Dates from "./components/Dates.vue";

export default {
  data: () => ({
    items: [
      { title: "D'Zuelen", component: "Numbers" },
      { title: "Den Datum", component: "Dates" },
      { title: "D'Auer", component: "Heures" },
      { title: "Vocabulaire", component: "Vocabulaire" }
    ],
    selectedItem: "--- SELECT ---",
    selectedComponent: ""
  }),
  methods: {
    selectedExcercice(item) {
      this.selectedItem = item.title;
      this.selectedComponent = item.component;
    }
  },
  name: "App",
  components: { Heures, Numbers, Dates, Vocabulaire }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
