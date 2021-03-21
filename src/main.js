import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';

Vue.config.productionTip = false

Vue.prototype.$http = axios;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
      users : [

      ]
  },
  getters: {
      
  },
  actions: {
    getusers({commit, getters}){
      axios.get('http://127.0.0.7/api/getusers')
      .then(response => {
        const users = response.data.data;
        commit('SET_USERS', {getters, users})
      });
    },
    // addusers({commit, getters}){
    //   console.log(commit)
    //   axios.post('http://127.0.0.7/api/sendinvitation')
    //   .then(response => {
    //     // console.log(response);
    //   })
    // }
  },
  mutations: {
    SET_USERS(state, {getters, users}) {
      const userstolist = [];
      users.forEach(function(e,i){
        userstolist.push({
          id: e.id,
          name: e.name,
          avatar: e.image256,
          email: e.email,
          signedup: e.is_signed_up
        });
      });
      state.users = userstolist;
    }
  }
});

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
