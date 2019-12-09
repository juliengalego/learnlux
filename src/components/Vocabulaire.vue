<template>
  <v-container grid-list-md text-xs-center>
    <v-alert :value="true" type="warning">En développement</v-alert>
    <Question>
      <template v-slot:question>
        <v-rating
          v-model="difficulte"
          length="3"
          full-icon="whatshot"
          empty-icon="whatshot"
          color="red"
          background-color="grey lighten-1"
          @click.native="newQuestion"
        >test</v-rating>
      </template>
      <template>{{this.devinette.valeur}}</template>
      <template v-slot:reponse>{{repondu}}</template>
    </Question>
    <Propositions :liste="liste" :reponse="restant[0]" @bonneReponse="nextReponse"></Propositions>
  </v-container>
</template>

<script>
import Question from "./Question";
import Propositions from "./Propositions";
export default {
  data() {
    return {
      difficulte: 1,
      devinette: 0,
      score: 0,
      restant: [],
      repondu: "",
      fake: [],
      liste: [],
      mots: [{ valeur: "Patate", traduction: "D' Gromper" }]
    };
  },
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
      this.restant = [];
      var randomIndex = this.getRandom(this.mots.length, -1);
      this.devinette = this.mots[randomIndex];
      if (this.difficulte === 1) {
        this.restant = this.restant.concat(
          this.devinette.traduction.split(" ")
        );
      } else if (this.difficulte === 2) {
        this.devinette.traduction
          .split(" ")
          .forEach(
            part => (this.restant = this.restant.concat(part.match(/.{1,3}/g)))
          );
      } else if (this.difficulte === 3) {
        this.restant = [...this.devinette.traduction];
      }
      //Placeholder pour la réponse
      this.repondu = "";
      this.restant.forEach(part =>
        part.split("").forEach(e => (this.repondu += e === " " ? " " : "_"))
      );
      // // phrase aléatoire en plus
      // for (var i = 0; i <= 3; i++) {
      //   var fakeMinutesMultiplier = this.getRandom(12, minutesMultiplier);
      //   var myFake = this.heureEnLettre(
      //     heures + Math.min(i, 1),
      //     fakeMinutesMultiplier * 5
      //   );
      //   this.fake = this.fake.concat(myFake);

      // on mélange le tableau
      var tmp = [...this.restant];
      this.fake.forEach(element =>
        !tmp.includes(element) && tmp.length < nbPropMax
          ? tmp.push(element)
          : null
      );
      tmp.sort(() => Math.random() - 0.5);
      this.liste = [];
      for (var i = 0; i < tmp.length; i++) {
        this.liste.push({
          class: null,
          valeur: tmp[i],
          index: i
        });
      }
    },
    nextReponse() {
      this.repondu =
        this.restant[0] +
        this.repondu.substring(this.restant[0].length, this.repondu.length);
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
