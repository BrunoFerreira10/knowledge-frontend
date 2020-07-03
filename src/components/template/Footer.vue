<template>
  <footer class="footer">
    <span> {{ $t('message.Copyright') }} <strong>mun-dev</strong> © 2020</span>  
  </footer>
</template>

<script>
export default {
  name: 'Footer'}
</script>

<style>
  .footer {
    grid-area: footer;
    background-color: #DDD;
    color: #333;

    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 10px;
  }
</style>