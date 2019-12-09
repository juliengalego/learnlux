import { numberMixin } from "./numberMixin";
export const dateMixin = {
  data() {
    return {
      jours: [
        "Sonndeg",
        "Méindeg",
        "Dënschdeg",
        "Mëttwoch",
        "Donneschdeg",
        "Freideg",
        "Samschdeg"
      ],
      mois: [
        "Januar",
        "Februar",
        "Mäerz",
        "Abrëll",
        "Mee",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
      ],
      numeros: [
        "",
        "éischten",
        "zweeten",
        "drëtten",
        "véierten",
        "fënnefen",
        "sechsten",
        "siwenten",
        "aachten",
        "néngten",
        "zéngten",
        "eeleften",
        "zwieleften",
        "dräizéngten",
        "véierzéngten",
        "fofzéngten",
        "siechzéngten",
        "siwwenzéngten",
        "uechtzéngten",
        "nonzéngten",
        "zwanzegsten",
        "eenanzwanzegsten",
        "zweeanzwanzegsten",
        "dräianzwanzegsten",
        "véieranzwanzegsten",
        "fënnefanzwanzegsten",
        "sechsanzwanzegsten",
        "siwenanzwanzegsten",
        "aachtanzwanzegsten",
        "nénganzwanzegsten",
        "dressëgsten",
        "eenandressëgsten"
      ]
    };
  },
  mixins: [numberMixin],
  methods: {
    anneeEnLettre(valeur) {
      var nombre = valeur;
      var result = [];
      if (nombre >= 2000) {
        result.push("zweedausend");
        nombre -= 2000;
      } else {
        var centaines = Math.floor(nombre / 100);
        result.push(this.chiffres[centaines].join(""));
        result.push("honnert");
        nombre -= centaines * 100;
      }
      result.push(this.nombreEnLettreInf100(nombre).join(""));
      return result;
    },
    dateEnLettre(valeur) {
      var result = [];
      var mois = this.mois[valeur.getMonth()];
      var jours = this.jours[valeur.getDay()];
      var numero = this.numeros[valeur.getDate()];
      var year = 1900 + valeur.getYear();
      var anneeLettre = this.anneeEnLettre(year);
      result.push(jours + ", ");
      result.push(this.$NRegel("den", numero) + " ");
      result.push(this.$NRegel(numero, mois) + " ");
      result.push(this.$NRegel(mois, anneeLettre[0]) + " ");
      result = result.concat(this.anneeEnLettre(year));

      return result;
    }
  }
};
