import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recordDrawer : false,
    records : [],
    userAccount : '',
    userId: '',
    permissions : [],
  },
  mutations: {
    setRecordDrawer(state, status){
      state.recordDrawer = status
    },
    setRecord(state, records){
      state.records = records
    },
    setUsername(state, userAccount){
      state.userAccount = userAccount
    },
    setPermission(state, permissions){
      state.permissions = permissions
    },
    setUserId(state, userId){
      state.userId = userId
    }
  },
  actions: {

  },
});
