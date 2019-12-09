<template>
  <div>
    <v-container grid-list-md text-xs-center>
      <Question>
        <template v-slot:question>
          <v-subheader class="pl-0">Max</v-subheader>
          <v-slider v-model="maxValue" max="999" min="10" thumb-label="always"></v-slider>
        </template>
        <template>{{this.devinette}}</template>
        <template v-slot:reponse>{{repondu}}</template>
      </Question>
    </v-container>
    <Propositions :liste="liste" :reponse="restant[0]" @bonneReponse="nextReponse"></Propositions>
  </div>
</template>

<script>
import { numberMixin } from "../mixins/numberMixin";
import Question from "./Question";
import Propositions from "./Propositions";
export default {
  name: "Bubbles",
  data() {
    return {
      devinette: 0,
      restant: [],
      repondu: "",
      fake: [],
      liste: [],
      maxValue: 10
    };
  },
  mixins: [numberMixin],
  components: {
    Question,
    Propositions
  },
  methods: {
    getRandom(max, except) {
      var tmp = null;
      do {
        tmp = Math.floor(Math.random() * max);
      } while (tmp === null || tmp === except);
      return tmp;
    },
    newQuestion() {
      // nombre qui doit être trouvé
      this.devinette = this.getRandom(this.maxValue, this.devinette);
      this.restant = this.nombreEnLettre(this.devinette);
      //Placeholder pour la réponse
      this.repondu = "";
      this.restant.forEach(() => (this.repondu += "____"));

      // phrase aléatoire en plus
      for (var i = 0; i <= 3; i++) {
        var myFake = this.nombreEnLettre(
          this.getRandom(this.maxValue, this.devinette)
        );
        this.fake = this.fake.concat(myFake);
      }
      // on mélange le tableau
      var tmp = [...this.restant];
      this.fake.forEach(element =>
        !tmp.includes(element) &&
        tmp.length < this.devinette.toString().length * 4
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
      this.repondu = this.repondu.replace("____", this.restant[0]);
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
