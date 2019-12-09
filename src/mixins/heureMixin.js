import { numberMixin } from "./numberMixin";
export const heureMixin = {
  data() {
    return {
      heures: [
        [""],
        ["eng"],
        ["zwou"],
        ["dräi"],
        ["véier"],
        ["fënnef"],
        ["sechs"],
        ["siwen"],
        ["aacht"],
        ["néng"],
        ["zéng"],
        ["eelef"],
        ["zwielef"]
      ]
    };
  },
  mixins: [numberMixin],
  methods: {
    heureEnLettre(heure, minutes) {
      var result = [];
      if (minutes >= 25) heure++;
      if (minutes === 30) {
        result.push("hallwer");
      } else if (minutes === 25) {
        result.push("fënnef");
        result.push("vir");
        result.push("hallwer");
      } else if (minutes === 35) {
        result.push("fënnef");
        result.push("op");
        result.push("hallwer");
      } else if (minutes === 15) {
        result.push("Véierel");
        result.push("op");
      } else if (minutes === 45) {
        result.push("Véierel");
        result.push("vir");
      } else if (minutes > 30) {
        result.push(
          this.nombreEnLettre(60 - minutes)
            .join("")
            .toLowerCase()
        );
        // result.push("Minutte");
        // result.push("vir");
      } else if (minutes > 0) {
        result.push(
          this.nombreEnLettre(minutes)
            .join("")
            .toLowerCase()
        );
        // result.push("Minutten");
        // result.push("op");
      }
      if (heure > 12) heure = heure - 12;
      result = result.concat(this.heures[heure]);
      if (minutes === 0) {
        result.push("Auer");
      }
      return result;
    }
  }
};
