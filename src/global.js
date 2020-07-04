import Vue from 'vue'

const userKey = '__knowledge_user'
const baseApiUrl = process.env.NODE_ENV == 'test-local' ? 'http://localhost:3000' : 'https://knowledge-base-br.herokuapp.com'

function showError(err) {
  // console.log(err.response)
  if(err && err.response && err.response.data && err.response.data.statusText) {    
    // console.log("A1")
    Vue.toasted.global.defaultError({msg : err.response.data.statusText})
  } else if(err && err.response && err.response.data) {    
    // console.log("A2")
    Vue.toasted.global.defaultError({msg : err.response.data})
  } else if ( typeof err === 'string') {
    // console.log("A3")
    Vue.toasted.global.defaultError({msg : err})
  } else {
    // console.log("A4")
    Vue.toasted.global.defaultError()
  }
}

function setUserLocale(locale) {
  localStorage.setItem('__user_lang', locale)  
}

function getUserLocale() {
  return localStorage.getItem('__user_lang')  
}

export {
  baseApiUrl,
  showError,
  userKey,
  // setUserLocale,
  // getUserLocale 
}