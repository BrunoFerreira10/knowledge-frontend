<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" alt="logo" width="200">
      <hr>
      <div class="auth-title">
        {{ showSignup ? $t('message.Register') : 'Login'}}
      </div>
      <form>
      <input type="text" v-if="showSignup" v-model="user.name" :placeholder="$t('message.Name')">
      <input type="text" autoComplete="username" v-model="user.email" name="email" placeholder="E-mail"> 
      <input type="password" autoComplete="current-password" v-if="!showSignup" v-model="user.password" name="Password" :placeholder="$t('message.Password')" @keyup="signin">
      <input type="password" v-else v-model="user.password" name="Password" :placeholder="$t('message.Password')">
      <input type="password" v-if="showSignup" v-model="user.confirmPassword" :placeholder="$t('message.ConfirmPassword')">
      </form>
      <button v-if="showSignup" @click="signup">{{ $t('message.Register') }}</button>
      <button v-else @click="signin">{{ $t('message.Enter') }}</button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">{{ $t('message.AlreadyRegisteredAccessLogin') }}</span>
        <span v-else>{{ $t('message.NotRegisteredRegisterHere') }}</span>
      </a>
                  
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'
import { setLocale, getLocale } from '@/global'
import { mapState,mapActions } from 'vuex'

export default {
  name: 'Auth',
  components: {

  },
  data: function() {
    return{
      showSignup: false,
      user:{}      
    }
  },
  computed: {
    ...mapState(['locales','locale'])
  },
  methods: {
    ...mapActions(['setLocale']),
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
    },localeChange(evt) {
      this.setLocale(evt.selectedLocale)
    }
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

  .locale-dropdown {
    z-index: 1;
  }

</style>