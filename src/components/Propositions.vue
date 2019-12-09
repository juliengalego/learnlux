<template>
  <v-layout row wrap>
    <v-flex xs12>
      <transition-group name="bubble">
        <v-btn
          round
          color="primary"
          class="bubble"
          v-for="l in liste"
          :key="l.index"
          :class="l.class"
          @click="bubbleClick(l)"
        >{{l.valeur}}</v-btn>>
      </transition-group>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  props: ["liste", "reponse"],
  methods: {
    bubbleClick(word) {
      if (this.reponse === word.valeur) {
        word.class = "bubble-hidden";
        this.$emit("bonneReponse");
      } else {
        word.class = "bubble-shake";
        //réinitialise si la personne fait 2 fois l'erreur
        setTimeout(function() {
          word.class = null;
        }, 500);
      }
    }
  }
};
</script>


<style scoped>
.bubble-hidden {
  animation: depop 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

.bubble {
  text-transform: none;
  display: inline-block;
  transition: all 0.5s;
}
.bubble-enter-to {
  opacity: 1;
  transform: scale(1);
}
.bubble-shake {
  background-color: red;
  animation: shake 0.5s;
  animation-iteration-count: 1;
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

@keyframes depop {
  0% {
    background-color: green;
    color: white;
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(0.8);
  }
  75% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
