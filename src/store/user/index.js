var state = {
  name: localStorage.getItem('username') || '',
  isAdmin: localStorage.getItem('isAdmin') || false,
  HeadImg: ''
}

var mutations = {
  USER_NAME(state, payload){
    state.name = payload.name;
    state.isAdmin = payload.isAdmin;
    state.HeadImg = payload.HeadImg;
    if(payload.name === ''){
      localStorage.removeItem('username');
      localStorage.removeItem('isAdmin');
    }else{
      localStorage.setItem('username', payload.name);
      localStorage.setItem('isAdmin', payload.isAdmin);
    }
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