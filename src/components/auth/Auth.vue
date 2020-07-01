<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" alt="logo" width="200">
      <hr>
      <div class="auth-title">
        {{ showSignup ? 'Register' : 'Login'}}
      </div>

      <input type="text" v-if="showSignup" v-model="user.name" placeholder="Name">
      <input type="text" v-model="user.email" name="email" placeholder="E-mail"> 
      <input type="password" v-if="!showSignup" v-model="user.password" name="password" placeholder="Password" @keyup="signin">
      <input type="password" v-else v-model="user.password" name="password" placeholder="Password">
      <input type="password" v-if="showSignup" v-model="user.confirmPassword" placeholder="Confirm password">

      <button v-if="showSignup" @click="signup">Register</button>
      <button v-else @click="signin">Enter</button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Already registered? Access login!</span>
        <span v-else>Not registered? Register here!</span>
      </a>
      <div class="lang">
        <a @click.prevent="()=>setLang('us')" ><country-flag country='us' /></a>
        <a @click.prevent="()=>setLang('br')" ><country-flag country='br' /></a>
        <a @click.prevent="()=>setLang('de')" ><country-flag country='de' /></a>        
      </div>            
    </div>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
  name: 'Auth',
  components: {
    CountryFlag
  },
  data: function() {
    return{
      showSignup: false,
      user:{}
    }
  },
  methods: {
    signin(evt) {
      
      if(evt.key && evt.key !== 'Enter') {        
        return
      }
      
      axios.post(`${baseApiUrl}/signin`, this.user)
        .then(res => {
          this.$store.commit('setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({path: '/'})
        })
        .catch(err => {
          showError(err)
        })
    },
    signup() {
      axios.post(`${baseApiUrl}/signup`, this.user)
        .then(res => {
          this.$toasted.global.defaultSuccess()
          this.user = {}
          this.showSignup = false
        })
        .catch(showError)
    },
    setLang(lang) {
      localStorage.setItem('__user_lang', lang)
      location.reload()
      
    }
  },
  mounted() {
    window.scrollTo(0, 1)
  },
  created() {
    
  }
}
</script>

<style>
  .auth-content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth-modal {
    background-color: #FFF;
    width: 350px;
    padding: 35px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .auth-title {
    font-size: 1.2rem;
    font-weight: 100;
    margin-top: 10px;
    margin-bottom: 15px;
  }

  .auth-modal input {
    border: 1px solid #BBB;
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
  }

  .auth-modal button {
    align-self: flex-end;
    background-color: #03588C;
    color: #FFF;
    padding: 5px 15px;
  }

  .auth-modal button:active {
    background-color: #03588Ccc;
  }

  .auth-modal a {
    margin-top: 35px;
  }

  .auth-modal hr {
    border: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, 
      rgba(120, 120, 120, 0),
      rgba(120, 120, 120, 0.75),
      rgba(120, 120, 120, 0));
  }

  .lang {
    margin-top: 10px;
  }

</style>