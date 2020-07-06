<template>
  <div v-if="user" class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User" />
      </div>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <router-link to="/admin" v-if="user.admin">
        <i class="fa fa-cogs" /> {{ $t('message.Administration') }}
      </router-link>
      <a href @click.prevent="logout">
        <i class="fa fa-sign-out" /> {{ $t('message.SignOut') }}
      </a>
    </div>
  </div>

  <div v-else class="login-pane">
    <router-link to="/auth" class="login-button">
      <i class="fa fa-user login-icon-xs d-none d-sm-block"></i>
      <i class="fa fa-user login-icon-gtxs d-block d-sm-none"></i>
      <span class="d-none d-sm-block"> {{ $t('message.RegisterOrLogin') }}</span>      
    </router-link>    
  </div>
  
</template>

<script>
import { mapState } from "vuex";
import Gravatar from "vue-gravatar";
import { userKey } from '@/global'

export default {
  name: "UserDropdown",
  components: { Gravatar },
  computed: mapState(["user"]),
  methods:{
    logout() {
      localStorage.removeItem(userKey)
      this.$store.commit('setUser', null)
      this.$router.push({name: 'auth'})
    }
  }
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.login-button,
.login-button:hover,
.user-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 10px;  
}

.user-button span {
  font-size: 0.9rem;
}

.login-button span {
  font-size: 0.9rem;
  margin-left: 10px;
}

.login-icon-gtxs {
  font-size: 1.4rem;
  margin-right: 10px;
}

.user-button:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.user-dropdown-img {
  margin: 0px 10px;
}

.user-dropdown-img > img {
  max-height: 30px;
  border-radius: 5px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  transition: visibility 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content{
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {  
  text-decoration: none;
  color: #000;
  padding: 5px;
}

.user-dropdown-content a:hover {  
  text-decoration: none;
  color: #000;
  padding: 5px;
  background-color: #ededed;
}

</style>