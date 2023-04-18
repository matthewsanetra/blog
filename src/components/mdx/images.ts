// Importing assets within MDX files didn't work for me,
// so I created this file to import them and export them as a module.

import muminekSitting from "@assets/moomins/muminek-sitting.svg";

import alpaca_confused_svg from "@assets/characters/alpaca-confused.svg";
import alpaca_excited_svg from "@assets/characters/alpaca-excited.svg";
import alpaca_intrigued_svg from "@assets/characters/alpaca-intrigued.svg";

import frog_confused_svg from "@assets/characters/frog-confused.svg";
import frog_excited_svg from "@assets/characters/frog-excited.svg";
import frog_intrigued_svg from "@assets/characters/frog-intrigued.svg";

import rabbit_confused_svg from "@assets/characters/rabbit-confused.svg";
import rabbit_excited_svg from "@assets/characters/rabbit-excited.svg";
import rabbit_intrigued_svg from "@assets/characters/rabbit-intrigued.svg";

export default {
  muminek: muminekSitting,

  "alpaca-confused": {
    image: alpaca_confused_svg,
    side: "left",
    alt: "Confused Alpaca",
  },
  "alpaca-excited": {
    image: alpaca_excited_svg,
    side: "left",
    alt: "Excited Alpaca",
  },
  "alpaca-intrigued": {
    image: alpaca_intrigued_svg,
    side: "right",
    alt: "Intrigued Alpaca",
  },

  "frog-confused": {
    image: frog_confused_svg,
    side: "left",
    alt: "Confused Frog",
  },
  "frog-excited": {
    image: frog_excited_svg,
    side: "right",
    alt: "Excited Frog",
  },
  "frog-intrigued": {
    image: frog_intrigued_svg,
    side: "left",
    alt: "Intrigued Frog",
  },

  "rabbit-confused": {
    image: rabbit_confused_svg,
    side: "left",
    alt: "Confused Rabbit",
  },
  "rabbit-excited": {
    image: rabbit_excited_svg,
    side: "right",
    alt: "Excited Rabbit",
  },
  "rabbit-intrigued": {
    image: rabbit_intrigued_svg,
    side: "right",
    alt: "Intrigued Rabbit",
  },
};
