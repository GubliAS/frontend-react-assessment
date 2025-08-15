/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
 
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           50:  '#e9f5f2',   // Light
//           100: '#def0eb',   // Light :hover
//           200: '#bae1d5',   // Light :active
//           300: '#209d78',   // Normal
//           400: '#1d8d6c',   // Normal :hover
//           500: '#1a7e60',   // Normal :active
//           600: '#18765a',   // Dark
//           700: '#135e48',   // Dark :hover
//           800: '#0e4736',   // Dark :active
//           900: '#0b372a',   // Darker
//         },
//       },
//       fontFamily: {
//         sans: ['Inter', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ebony: "var(--ebony)",
        "foundation-reddark": "var(--foundation-reddark)",
        "foundation-reddark-active": "var(--foundation-reddark-active)",
        "foundation-reddark-hover": "var(--foundation-reddark-hover)",
        "foundation-reddarker": "var(--foundation-reddarker)",
        "foundation-redlight": "var(--foundation-redlight)",
        "foundation-redlight-active": "var(--foundation-redlight-active)",
        "foundation-redlight-hover": "var(--foundation-redlight-hover)",
        "foundation-rednormal": "var(--foundation-rednormal)",
        "foundation-rednormal-active": "var(--foundation-rednormal-active)",
        "foundation-rednormal-hover": "var(--foundation-rednormal-hover)",
        "gth-color-stylesbluedark": "var(--gth-color-stylesbluedark)",
        "gth-color-stylesbluedark-active":
          "var(--gth-color-stylesbluedark-active)",
        "gth-color-stylesbluedark-hover":
          "var(--gth-color-stylesbluedark-hover)",
        "gth-color-stylesbluedarker": "var(--gth-color-stylesbluedarker)",
        "gth-color-stylesbluelight": "var(--gth-color-stylesbluelight)",
        "gth-color-stylesbluelight-active":
          "var(--gth-color-stylesbluelight-active)",
        "gth-color-stylesbluelight-hover":
          "var(--gth-color-stylesbluelight-hover)",
        "gth-color-stylesblueneutraldark":
          "var(--gth-color-stylesblueneutraldark)",
        "gth-color-stylesblueneutraldark-active":
          "var(--gth-color-stylesblueneutraldark-active)",
        "gth-color-stylesblueneutraldark-hover":
          "var(--gth-color-stylesblueneutraldark-hover)",
        "gth-color-stylesblueneutraldarker":
          "var(--gth-color-stylesblueneutraldarker)",
        "gth-color-stylesblueneutrallight":
          "var(--gth-color-stylesblueneutrallight)",
        "gth-color-stylesblueneutrallight-active":
          "var(--gth-color-stylesblueneutrallight-active)",
        "gth-color-stylesblueneutrallight-hover":
          "var(--gth-color-stylesblueneutrallight-hover)",
        "gth-color-stylesblueneutralnormal":
          "var(--gth-color-stylesblueneutralnormal)",
        "gth-color-stylesblueneutralnormal-active":
          "var(--gth-color-stylesblueneutralnormal-active)",
        "gth-color-stylesblueneutralnormal-hover":
          "var(--gth-color-stylesblueneutralnormal-hover)",
        "gth-color-stylesbluenormal": "var(--gth-color-stylesbluenormal)",
        "gth-color-stylesbluenormal-active":
          "var(--gth-color-stylesbluenormal-active)",
        "gth-color-stylesbluenormal-hover":
          "var(--gth-color-stylesbluenormal-hover)",
        "gth-color-stylesgolddark": "var(--gth-color-stylesgolddark)",
        "gth-color-stylesgolddark-active":
          "var(--gth-color-stylesgolddark-active)",
        "gth-color-stylesgolddark-hover":
          "var(--gth-color-stylesgolddark-hover)",
        "gth-color-stylesgolddarker": "var(--gth-color-stylesgolddarker)",
        "gth-color-stylesgoldlight": "var(--gth-color-stylesgoldlight)",
        "gth-color-stylesgoldlight-active":
          "var(--gth-color-stylesgoldlight-active)",
        "gth-color-stylesgoldlight-hover":
          "var(--gth-color-stylesgoldlight-hover)",
        "gth-color-stylesgoldnormal": "var(--gth-color-stylesgoldnormal)",
        "gth-color-stylesgoldnormal-active":
          "var(--gth-color-stylesgoldnormal-active)",
        "gth-color-stylesgoldnormal-hover":
          "var(--gth-color-stylesgoldnormal-hover)",
        "gth-color-stylesgreendark": "var(--gth-color-stylesgreendark)",
        "gth-color-stylesgreendark-active":
          "var(--gth-color-stylesgreendark-active)",
        "gth-color-stylesgreendark-hover":
          "var(--gth-color-stylesgreendark-hover)",
        "gth-color-stylesgreenlight": "var(--gth-color-stylesgreenlight)",
        "gth-color-stylesgreenlight-active":
          "var(--gth-color-stylesgreenlight-active)",
        "gth-color-stylesgreenlight-hover":
          "var(--gth-color-stylesgreenlight-hover)",
        "gth-color-stylesgreennormal": "var(--gth-color-stylesgreennormal)",
        "gth-color-stylesgreennormal-active":
          "var(--gth-color-stylesgreennormal-active)",
        "gth-color-stylesgreennormal-hover":
          "var(--gth-color-stylesgreennormal-hover)",
        "river-bed": "var(--river-bed)",
      },
      fontFamily: {
        "inter-bold": "var(--inter-bold-font-family)",
        "inter-medium": "var(--inter-medium-font-family)",
        "inter-regular": "var(--inter-regular-font-family)",
        "semantic-button": "var(--semantic-button-font-family)",
        "semantic-heading-1": "var(--semantic-heading-1-font-family)",
        "semantic-heading-2": "var(--semantic-heading-2-font-family)",
        "semantic-heading-3": "var(--semantic-heading-3-font-family)",
        "semantic-input": "var(--semantic-input-font-family)",
        "times-new-roman-regular": "var(--times-new-roman-regular-font-family)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
