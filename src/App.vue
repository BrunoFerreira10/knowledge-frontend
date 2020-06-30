<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible}">
    <Header title="Knowledge base"></Header>
    <Menu v-if="isMenuVisible"></Menu>
    <Loading v-if="isValidatingToken"></Loading>
    <Content v-else></Content>
    <Footer></Footer>
  </div>
</template>

<script>
// @ is the src path
import Vue from 'vue'
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'

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
    ...mapActions(['validateToken']),
    
  },
  created() {    
    //if(this.user)    
      this.validateToken()
  }
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;

  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>