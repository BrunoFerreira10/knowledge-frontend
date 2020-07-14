<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/logo.png" alt="logo" width="200">
      <hr>
      <div class="auth-title">
        {{ showSignup ? $t('message.Register') : 'Login'}}
      </div>
      <form>
        <input type="text" v-if="showSignup" v-model="user.name" :placeholder="$t('message.Name')" spellcheck="false">
        <input type="text" autoComplete="username" v-model="user.email" name="email" placeholder="E-mail" spellcheck="false"> 
        
        <div class="password-group">
          <input id="password-field" :type="showPassword ? 'text' : 'password'" v-if="!showSignup" autoComplete="current-password"
            v-model="user.password" name="Password" :placeholder="$t('message.Password')" @keyup="signin" spellcheck="false">      
          <input id="password-field" :type="showPassword ? 'text' : 'password'" v-else 
            v-model="user.password" name="Password" :placeholder="$t('message.Password')" spellcheck="false">      
            <i class="show-hide-icon fa" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" @click="showHidePassword(false)"></i>

          <b-popover :show.sync="isVisiblePasswordHelp" target="password-field" title="Password rules" placement="leftbottom" :disabled="true">
            Minimum 6 characters. <br>
            At least one lower case letter. <br>
            At least one upper case letter. <br>
            At least one number. <br>
          </b-popover>

        </div>

        <div v-if="showSignup" class="password-group">
          <input :type="showConfirmPassword ? 'text' : 'password'" v-model="user.confirmPassword" 
            :placeholder="$t('message.ConfirmPassword')" spellcheck="false">
          <i class="show-hide-icon fa" :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'" @click="showHidePassword(true)"></i>
        </div> 

      </form>
      <div class="button-group">
        <b-button pill :pressed="false" v-if="showSignup" @click="signup">{{ $t('message.Register') }}</b-button>
        <b-button active-class="button-active" pill v-else @click="signin">{{ $t('message.Enter') }}</b-button>        
        <i v-if="showSignup" class="password-info-icon fa fa-info-circle" @click="showPasswordHelp()"></i>
      </div>

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
      showPassword: false,
      showConfirmPassword: false,
      isVisiblePasswordHelp: false,
      user:{}      
    }
  },
  computed: {
    ...mapState(['locales','locale'])
  },
  methods: {
    ...mapActions(['setLocale']),
    signin(evt) {
      
      this.showPassword = false
      this.showConfirmPassword = false        
      
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
      this.showPassword = false
      this.showConfirmPassword = false

      axios.post(`${baseApiUrl}/signup`, this.user)
        .then(res => {
          this.$toasted.global.defaultSuccess()
          this.user = {}
          this.showSignup = false
        })
        .catch(showError)
    },
    localeChange(evt) {
      this.setLocale(evt.selectedLocale)
    },
    showHidePassword(confirmPassword = false){
      if(!confirmPassword){
        this.showPassword = !this.showPassword
      } else {
        this.showConfirmPassword = !this.showConfirmPassword
      }
    },
    showPasswordHelp() {      
      this.isVisiblePasswordHelp = true
      setTimeout(()=>{
        this.isVisiblePasswordHelp = false
      },7000)
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
    border: none;
    border-bottom: 1px solid #CCC; 
    width: 100%;
    margin-bottom: 15px;
    padding: 3px 8px;
    outline: none;
    color: #777;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active  {
    box-shadow: none;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  input:-webkit-autofill {
    -webkit-text-fill-color: #777 !important;
  }

  .auth-modal .button-group button {
    background-color: #006bb5;
    color: #FFF;
    padding: 5px 15px;
  }

  .auth-modal .button-group button:hover {    
    background-color: #006bb5dd;    
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

  .auth-modal > form {
    width: 100%;
  }
  
  .password-group {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;    
    position: relative;
  }

  .show-hide-icon {
    position: absolute;
    color: #3336;
    font-size: 1.4rem;
    z-index: 1;
    right: 5px;
    top: 5px;
  }

  .auth-modal .button-group {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    width: 100%;    
  }

  .password-info-icon{
    font-size: 2rem;
    color: #3337;    
    margin-left: 5px;
  }

  .password-info-icon:hover{
    color: #333c; 
  }

</style>