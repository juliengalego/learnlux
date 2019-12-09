<template>
  <div>
    <Question>
      <template v-slot:question>
        <v-icon large left>date_range</v-icon>
        <span class="title font-weight-light text-center">{{question.libelle}}</span>
      </template>
      <template>
        <v-flex xs12 class="mb-2">
          <v-date-picker v-model="devinette" locale="de-LZ" first-day-of-week="1" no-title readonly></v-date-picker>
        </v-flex>
      </template>
      <template v-slot:reponse>{{question.debutReponse}} {{repondu}}</template>
    </Question>
    <Propositions :liste="liste" :reponse="restant[0]" @bonneReponse="nextReponse"></Propositions>
  </div>
</template>

<script>
import { dateMixin } from "../mixins/dateMixin";
import Question from "./Question";
import Propositions from "./Propositions";
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function nextEvent(jours, mois) {
  var year = 1900 + new Date().getYear();
  var eventDate = new Date(Date.UTC(year, mois - 1, jours));
  if (new Date() > eventDate) {
    eventDate = new Date(Date.UTC(year + 1, mois - 1, jours));
  }
  return eventDate;
}
export default {
  data() {
    return {
      question: "",
      devinette: "",
      restant: [],
      repondu: "",
      fake: [],
      liste: [],
      index: -1,
      questions: [
        {
          libelle: "Wat fir en Dag ass haut?",
          valeur: new Date(),
          debutReponse: "Haut ass"
        },
        {
          libelle: "Wat fir en Dag ass muer?",
          valeur: addDays(new Date(), 1),
          debutReponse: "Muer ass"
        },
        {
          libelle: "Wat fir en Dag ass iwwermuer ?",
          valeur: addDays(new Date(), 2),
          debutReponse: "Iwwermuer ass"
        },
        {
          libelle: "Wat fir en Dag war gëschter ?",
          valeur: addDays(new Date(), -1),
          debutReponse: "Gëschter war"
        },
        {
          libelle: "Wat fir en Dag war virgëschter ?",
          valeur: addDays(new Date(), -2),
          debutReponse: "Virgëschter war"
        },
        {
          libelle: "Wat fir en Dag ass et ?",
          valeur: this.randomDate(new Date(1950, 1, 1), new Date())
        },
        {
          libelle: "Weini ass Chrëschtdag ?",
          valeur: nextEvent(25, 12),
          debutReponse: "Chrëschtdag ass"
        },
        {
          libelle: "Weini fänkt de Summer ?",
          valeur: nextEvent(21, 6),
          debutReponse: "De Summer fänkt"
        },
        {
          libelle: "Weini fänkt de Hierscht ?",
          valeur: nextEvent(21, 9),
          debutReponse: "Den Hierscht fänkt"
        },
        {
          libelle: "Weini fänkt d'Fréijoer ?",
          valeur: nextEvent(21, 3),
          debutReponse: "D'Fréijoer fänkt"
        },
        {
          libelle: "Weini fänkt de Wanter ?",
          valeur: nextEvent(21, 12),
          debutReponse: "De Wanter fänkt"
        }
      ]
    };
  },
  computed: {
    reponse() {
      var selecteDate = new Date(this.devinette);
      return this.dateEnLettre(selecteDate);
    }
  },
  methods: {
    randomDate(start, end) {
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
    },
    getRandom(max, except) {
      var tmp = null;
      do {
        tmp = Math.floor(Math.random() * max);
      } while (tmp === null || tmp === except);
      return tmp;
    },
    newQuestion() {
      const nbPropMax = 15;
      const yearStart = 1950;
      // Date qui doit être trouvée
      this.index = this.getRandom(this.questions.length, this.index);
      this.question = this.questions[this.index];
      this.devinette = this.question.valeur.toISOString().slice(0, 10);

      this.restant = this.dateEnLettre(this.question.valeur);
      //Placeholder pour la réponse
      this.repondu = "";
      this.restant.forEach(() => (this.repondu += "____"));

      // phrase aléatoire en plus
      for (var i = 0; i <= 3; i++) {
        var myFake = this.dateEnLettre(
          this.randomDate(new Date(yearStart, 1, 1), new Date())
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
  },
  components: { Question, Propositions },
  mixins: [dateMixin]
};
</script>



<style scoped>
</style>
