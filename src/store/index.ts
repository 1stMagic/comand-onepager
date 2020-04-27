import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sections: [],
    fancybox: true,
    content: ""
  },
  mutations: {
    setSections(state, sections) {
        state.sections = sections;
    },

    setFancybox(state, show) {
        state.fancybox = show;
    },

    setFancyboxContent(state, content) {
        state.content = content;
    }
  },
  actions: {
    loadSections(context) {
        axios.get(process.env.BASE_URL + 'templates/pages/data/content_sections.json')
            .then(response => context.commit('setSections', response.data))
            .catch(error => context.commit('setSections', []));
    },

    loadFancyboxContent(context, link) {
            axios.get(link.fancyboxContentURL)
                .then(response => context.commit('setFancyboxContent', response.data))
                .catch(error => context.commit('setFancyboxContent', ""));
    }
  },
  modules: {
  }
})
