<template>
  <footer class="footer">
    <span>
      {{ $t('message.Copyright') }}
      <strong>mun-dev</strong> © 2020
    </span>
    
    <div class="locale-dropdown">
      <LocaleDropdown :locales="['us','br','de']" v-on:change="localeChange" 
        :selectedLocale='locale' direction='top' :defaultLocale='locale'> 
      </LocaleDropdown>    
    </div>
      
  </footer>
</template>

<script>
import LocaleDropdown from '../footer/LocaleDropdown'
import { mapState,mapActions } from 'vuex'

export default {
  name: 'Footer',
  components: {
    LocaleDropdown
  },
  data: function() {
    return {      
    }
  },
  computed: {
    ...mapState(['locale']),
  },
  methods: {
    ...mapActions(['setLocale']),    
    localeChange(evt) {
      this.setLocale(evt.selectedLocale)
    }
  }
}
</script>

<style>
.footer {
  grid-area: footer;
  background-color: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;

  position: relative;

}

.footer .locale-dropdown {
  position: absolute;
  right: 0px;  
}

</style>