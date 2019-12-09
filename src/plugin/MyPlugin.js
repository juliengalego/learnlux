
export default  {
  install(Vue, options) {
  // 1. add global method or property
    Vue.NRegel = function (mot, motSuivant) {
        if (!["U", "N", "I", "T", "E", "D", "Z", "O", "A", "H"].includes(
                motSuivant.substring(0, 1).toUpperCase()))
          {
            if(mot.charAt(mot.length-1).toUpperCase() === "N")
            {
              mot.splice(0, mot.length-1);
            }
          }
          return mot;
    }
  }
}

