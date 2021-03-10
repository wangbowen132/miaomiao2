export default {
  namespace: true,
  state: {
    nm: localStorage.getItem("newNm") || '北京',
    id: localStorage.getItem("newId") || 1
  },
  mutations: {
    CITY_INFO(state, {newId, newNm}){
      state.nm = newNm;
      state.id = newId;
      localStorage.setItem('newNm', newNm);
      localStorage.setItem('newId', newId);
    }
  },
  actions: {
  }
}