<template>
  <footer class="footer">
    <span>
      {{ $t('message.Copyright') }}
      <strong>mun-dev</strong> © 2020
    </span>
    
    <LocaleDropdown class="ml-2" :locales="['us','br','de']" v-on:change="localeChange" 
      :selectedLocale='locale' direction='top'> 
    </LocaleDropdown>    
      
  </footer>
</template>

<script>
import LocaleDropdown from '../footer/LocaleDropdown'
import { setLocale, getLocale } from '@/global'

export default {
  name: 'Footer',
  components: {
    LocaleDropdown
  },
  data: function() {
    return {
      locale: getLocale()   
    }
  },
  methods: {
    localeChange(evt) {
      setLocale(evt.currentLocale)
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
}

</style>