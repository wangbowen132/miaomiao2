var state = {
  nm: localStorage.getItem("newNm") || '北京',
  id: localStorage.getItem("newId") || 1
}

var mutations = {
  CITY_INFO(state, {newId, newNm}){
    state.nm = newNm;
    state.id = newId;
    localStorage.setItem('newNm', newNm);
    localStorage.setItem('newId', newId);
  }
}

var actions = {
}

export default {
  namespace: true,
  state,
  mutations,
  actions
}