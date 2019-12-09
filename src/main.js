import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
// import MyPlugin from './plugin/MyPlugin.js'

// Without options
// Vue.use(MyPlugin)
Vue.use(Vuetify);

Vue.prototype.$NRegel = function(mot, motSuivant) {
  if (
    !["U", "N", "I", "T", "E", "D", "Z", "O", "A", "H"].includes(
      motSuivant.substring(0, 1).toUpperCase()
    )
  ) {
    if (mot.charAt(mot.length - 1).toUpperCase() === "N") {
      mot = mot.slice(0, -1);
    }
  }
  return mot;
};

Vue.config.productionTip = false;
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
