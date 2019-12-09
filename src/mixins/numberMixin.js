export const numberMixin = {
  data() {
    return {
      chiffres: [
        ["null"],
        ["enn"],
        ["zwee"],
        ["dräi"],
        ["véier"],
        ["fënnef"],
        ["sechs"],
        ["siwen"],
        ["aacht"],
        ["néng"],
        ["zéng"],
        ["eelef"],
        ["zwielef"],
        ["dräi", "zéng"],
        ["véier", "zéng"],
        ["fof", "zéng"],
        ["siech", "zéng"],
        ["siwwen", "zéng"],
        ["uecht", "zéng"],
        ["non", "zéng"]
      ],
      dizaines: [
        ["zwan", "zeg"],
        ["dressëg"],
        ["véier", "zeg"],
        ["fof", "zeg"],
        ["sech", "zeg"],
        ["siwwen", "zeg"],
        ["acht", "zeg"],
        ["non", "zeg"]
      ]
    };
  },
  methods: {
    nombreEnLettreInf100(valeur) {
      var nombre = valeur;
      var result = [];
      if (nombre === 1) {
        result.push("eent");
        return result;
      } else if (nombre >= 20) {
        var dizaine = Math.floor(nombre / 10);
        result = [...this.dizaines[dizaine - 2]];
        nombre -= dizaine * 10;
        if (nombre > 0) {
          result.unshift(this.$NRegel("an", result[0]));
        }
      }
      if (nombre > 0) {
        result = [...this.chiffres[nombre]].concat(result);
      }
      return result;
    },
    nombreEnLettre(valeur) {
      var nombre = valeur;
      var result = [];
      if (nombre === 0) {
        result.push("null");
        return result;
      }
      if (nombre >= 1000000) {
      }
      if (nombre >= 1000) {
        result.push("honnert");
      }
      var centaines = Math.floor(nombre / 100);
      if (nombre >= 200) {
        result = result.concat(this.chiffres[centaines]);
        result.push("honnert");
        nombre -= centaines * 100;
      } else if (nombre >= 100) {
        result.unshift("honnert");
        nombre -= centaines * 100;
      }
      result = result.concat(this.nombreEnLettreInf100(nombre));
      return result;
    }
  }
};
