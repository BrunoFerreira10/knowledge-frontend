<template>
  <div class="loc-drop">
    
    <div @click="showLocales" 
      :class="isContentVisible ? 'loc-drop-button-active' : 'loc-drop-button'">
      <country-flag :country='currentLocale' />   
    </div>
    
    <div ref="loc-drop-content" :class="isContentVisible ? 'loc-drop-content-visible' : 'loc-drop-content'">
      <div v-for="locale in locales" :key="locale"       
        @click.prevent="evt => localeSelected(locale)">
        <country-flag v-if="locale !== currentLocale"  :country='locale'/>          
      </div>
    </div>

  </div>
  
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: "LocaleDropdown",
  props: {
    direction: String,
    locales: Array,
    selectedLocale: String
  },
  components: {
    CountryFlag
  },
  data: function(){
    return {
      currentLocale: this.selectedLocale || this.locales[0],  // *******
      isContentVisible: false
    }
  },
  computed:{},
  methods:{    
    showLocales() {
      this.isContentVisible = !this.isContentVisible      
    },
    localeSelected(locale) {
      this.isContentVisible = false
      this.currentLocale = locale
      this.$emit('change', {...this.$data})
    }
  },mounted() {    
    if(this.direction === 'top'){
      this.$refs['loc-drop-content'].style.top = 'calc(-250% + 8px)'
    } else {
      this.$refs['loc-drop-content'].style.top = '100%'
    }
  }
};
</script>

<style>
.loc-drop {
  position: relative;
  
  display: flex;
  align-items: center;
}

.loc-drop-button-active,
.loc-drop-button {
  display: flex;
  align-items: center;
  justify-content: center;  
}

.loc-drop-button-active {
  background-color: rgba(0, 0, 0, 0.4);
}

.loc-drop-button:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.loc-drop-content-visible,
.loc-drop-content {
  position: absolute;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.2);
  /* top: calc(-250% + 8px); */

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  transition: visibility 0s, opacity 0.5s linear;
}

.loc-drop-content-visible{
  visibility: visible;  
  opacity: 1;  
}

</style>