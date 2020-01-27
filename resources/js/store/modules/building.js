import BuildingModel from "./../../model/building.model";

export default {
  namespaced: true,
  state: {
    fetched: false,
    authenticating: false,
    authenticationErrorCode: 0,
    authenticationError: '',
    itemList: []
  },
  getters: {
    authenticationErrorCode: (state) => {
      return state.authenticationErrorCode
    },

    authenticationError: (state) => {
      return state.authenticationError
    },

    authenticating: (state) => {
      return state.authenticating
    },

    itemList: (state) => {
      return state.itemList
    },
  },
  actions: {
    async fetchData({commit}) {
      commit('request');
      const items = await BuildingModel.fetchData();
      commit('setOrganization', items);
    },
    async postItem({dispatch, commit, state}, data) {
      commit('request');
      const resultItem = await BuildingModel.post(data);
      commit('postSuccess', resultItem);
      dispatch('fetchData');
    },
    async putItem({dispatch, commit, state}, data) {
      commit('request');
      const resultItem = await BuildingModel.put(data);
      commit('postSuccess', resultItem);
      dispatch('fetchData');
    },
    async updateProfile({dispatch, commit, state}, data) { // TODO: update profile + adress
      commit('request');
      const resultItem = await BuildingModel.putProfile(data);
      commit('postSuccess', resultItem);
      dispatch('fetchData');
    },
    async delItem({dispatch, commit, state}, data) {
      data.status = 'disabled';
      const resultItem = await BuildingModel.put(data);
      commit('postSuccess', resultItem);
      dispatch('fetchData');
    },
  },
  mutations: {

    request(state) {
      state.authenticating = true;
      state.fetched = false;
      state.authenticationError = '';
      state.authenticationErrorCode = 0;
    },

    setOrganization(state, items) {
      state.itemList = items;
      state.fetched = false;
      state.authenticationError = '';
      state.authenticating = false;
      state.authenticationErrorCode = 0;
    },

    postSuccess(state, resultItem) {
      console.log(3, resultItem)
      console.log('Update LIST');
    },

  }
}
