<template>
  <v-container grid-list-md text-xs-center>
    <Question>
      <template v-slot:question>
        <v-icon large left>access_time</v-icon>
        <span class="title font-weight-light text-center">Wéi vill Auer ass et?</span>
      </template>
      <template>{{this.devinette}}</template>
      <template v-slot:reponse>Et ass {{repondu}}</template>
    </Question>
    <Propositions :liste="liste" :reponse="restant[0]" @bonneReponse="nextReponse"></Propositions>
  </v-container>
</template>

<script>
import { heureMixin } from "../mixins/heureMixin";
import Question from "./Question";
import Propositions from "./Propositions";
export default {
  name: "Heures",
  data() {
    return {
      devinette: 0,
      restant: [],
      repondu: "",
      fake: [],
      liste: []
    };
  },
  mixins: [heureMixin],
  components: { Question, Propositions },
  methods: {
    getRandom(max, except) {
      var tmp = null;
      do {
        tmp = Math.floor(Math.random() * max);
      } while (tmp === null || tmp === except);
      return tmp;
    },
    newQuestion() {
      const nbPropMax = 10;
      // nombre qui doit être trouvé
      var heures = this.getRandom(24, this.devinette);
      var minutesMultiplier = this.getRandom(12, -1);
      var minutes = minutesMultiplier * 5;

      this.devinette =
        ("0" + heures).slice(-2) + ":" + ("0" + minutes).slice(-2);
      this.restant = this.heureEnLettre(heures, minutes);
      //Placeholder pour la réponse
      this.repondu = "";
      this.restant.forEach(() => (this.repondu += "____"));

      // phrase aléatoire en plus
      for (var i = 0; i <= 3; i++) {
        var fakeMinutesMultiplier = this.getRandom(12, minutesMultiplier);
        var myFake = this.heureEnLettre(
          heures + Math.min(i, 1),
          fakeMinutesMultiplier * 5
        );
        this.fake = this.fake.concat(myFake);
      }
      // on mélange le tableau
      var tmp = [...this.restant];
      this.fake.forEach(element =>
        !tmp.includes(element) && tmp.length < nbPropMax
          ? tmp.push(element)
          : null
      );

      tmp.sort(() => Math.random() - 0.5);
      this.liste = [];
      for (i = 0; i < tmp.length; i++) {
        this.liste.push({
          class: null,
          valeur: tmp[i],
          index: i
        });
      }
    },
    nextReponse() {
      this.repondu = this.repondu.replace("____", this.restant[0] + " ");
      this.restant.splice(0, 1);
      if (this.restant.length === 0) {
        setTimeout(
          function() {
            this.newQuestion();
          }.bind(this),
          1000
        );
      }
    }
  },
  mounted() {
    this.newQuestion();
  }
};
</script>


<style scoped>
</style>
