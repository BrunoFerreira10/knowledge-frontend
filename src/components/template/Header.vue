<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="isMenuToggleButtonVisible">
      <i class="fa fa-lg" :class="icon"></i>
    </a>
    <div class="overlap">
      <!-- <h1 class="title"> -->
        <router-link :to="'/'"> <img class="logo-header" src="@/assets/logo-header.png" alt="logo"> </router-link>
      <!-- </h1> -->
    </div>    
    <UserDropdown v-if="isDropdownMenuVisible" class="drop-menu"/>
  </header>
</template>

<script>
import UserDropdown from './UserDropdown'
import { mapState } from 'vuex'

export default {
  name: "Header",
  components: {
    UserDropdown
  },
  props: {
    title: String    
  },
  computed: {
    ...mapState([
      'user',
      'isMenuToggleButtonVisible',
      'isDropdownMenuVisible',
      'isMenuVisible'
    ]),
    icon() {      
      return  this.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
    }    
  },
  methods: {
    toggleMenu() {
      this.$store.commit('toggleMenu')
    }    
  }
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #03588C, #006bb5);

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  width: 100%;
  height: 45px;
  z-index: 1;
}

.overlap {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.1rem;
  color: #fff;
  font-weight: 100;
  /* flex-grow: 1; */
  text-align: center;
  margin: 0px;
}

.title a {
  color: #fff;
  text-decoration: none;  
}

.title a:hover {  
  color: #fff;
  text-decoration: none;  
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

header.header > a.toggle:hover {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}
.drop-menu {
  z-index: 1;
}
.logo-header {
  height: 31px;
}


</style>