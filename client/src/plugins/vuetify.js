import Vue from "vue"
import Vuetify from "vuetify/lib"
import '@fortawesome/fontawesome-free/css/all.css' 
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
  theme: {
    dark: false,
  },
  themes: {
    light: {
      primary: "#4682b4",
      secondary: "#4354FF",
      accent: "#8c9eff",
      error: "#b71c1c",
    },
  },
})