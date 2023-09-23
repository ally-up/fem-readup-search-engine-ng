export const environment = {
  production: true,
  app_title: "ALLY UP",
  app_subtitle: "Veranstaltungs-Suchmaschine",
  theme: "fem-readup-red-theme",
  defaultImageUrl: "/assets/images/humans_default.svg",

  firebase: {
    apiKey: "AIzaSyAlx9J9srxQKBiF3I_7P8hv23Jfm-PoPVs",
    authDomain: "fem-readup.firebaseapp.com",
    projectId: "fem-readup",
    storageBucket: "fem-readup.appspot.com",
    messagingSenderId: "56848903230",
    appId: "1:56848903230:web:f075e6e2668cf713ea356f"
  },

  category_types : new Map([
    ["Gespräch", "/assets/images/humans_diskussion_2.svg"],
    ["Diskussion", "/assets/images/humans_diskussion_2.svg"],
    ["Talk", "/assets/images/humans_diskussion_2.svg"],
    ["Theater", "/assets/images/humans_diskussion_2.svg"],
    ["Online", "/assets/images/humans_online_4.svg"],
    ["Workshop", "/assets/images/humans_workshop.svg"],
    ["Seminar", "/assets/images/humans_workshop.svg"],
    ["Vortrag", "/assets/images/humans_vortrag.svg"]]
  
  )  };
