<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible}">
    <Header :title="$t('message.appTitle')"></Header>
    <Menu v-show="isMenuVisible"></Menu>
    <Loading v-if="isValidatingToken"></Loading>
    <Content v-else></Content>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is the src path
import Vue from 'vue'
import axios from 'axios'
import { baseApiUrl, userKey, getUserLocale } from '@/global'

import { mapState, mapActions } from 'vuex'
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "./components/template/Content"
import Footer from "./components/template/Footer"
import Loading from "./components/template/Loading"

export default {
  name: "App",
  components: { Header, Menu, Content, Footer, Loading },
  computed: {
    ...mapState(['isMenuVisible', 'user','isValidatingToken', 'isToggleMenuButtonVisible'])
  },
  data: function () {
    return {      
    }
  },
  methods: {
    ...mapActions(['validateToken','setLocale']),
    
  },
  created() {    
      this.validateToken()                  
  }
};
</script>

<style>
:root {
  --kb--baseblue1-solid: "#03588C";
  --kb--baseblue1-transp: "#03588CEE";
  --kb--baseblue2-solid: "#006bb5";
  --kb--baseblue2-transp: "#006bb5EE";
}

* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;  
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;

  height: 100vh;
  display: grid;
  grid-template-rows: 45px 1fr 40px;
  grid-template-columns: 300px 1fr;

  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}

.content {
  margin-bottom: 40px;
}

.footer {
  position: fixed;
  bottom: 0px;
  height: 40px;
  width: 100%;  
  z-index: 10;
}

.fbtn {
  position: fixed;
  bottom: 25px;
  right: 35px;

  display: flex;
  align-items: center;
  justify-content: center;
  
  border: none;
  border-radius: 100%;    
  height: 50px;
  width: 50px;
  box-shadow: 0 10px 10px rgba(0,0,0,.2), 0 4px 4px rgba(0,0,0,.15);  
  outline: none;
  z-index: 999;
}

.fbtn:focus {
  outline: none;  
}

.fbtn.fbtn-add {
  background-color: #03588C;
  color: #FFF;
}

.fbtn.fbtn-save {
  background-color: #28a745;
  color: #FFF;
  right: 95px;
}

.fbtn.fbtn-update {
  background-color: #ffc107;
  color: #212529;    
  right: 95px;
}

.fbtn.fbtn-edititem {
  background-color: #ffc107;
  color: #212529;    
  right: 155px;
}

.fbtn.fbtn-delete {
  background-color: #dc3545;
  color: #FFF;
  right: 95px;
}

.fbtn.fbtn-deleteitem {
  background-color: #dc3545;
  color: #FFF;
  right: 95px;
}

.fbtn.fbtn-cancel {
  background-color: #6c757d;
  color: #FFF;
}

.fbtn > i {
  font-size: 1.5rem;  
}

</style>