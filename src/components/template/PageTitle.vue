<template>
  <div class="page-title">
    <h1>
      <i v-if="icon" :class="icon"/> {{ title }}
    </h1>
    <h2>
      {{ subtitle }}
    </h2>
    <hr>    
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['icon', 'title', 'subtitle']
}
</script>

<style>
  .page-title h1 {
    margin: 0;
    font-size: 1.4rem;
  }

  .page-title h2 {
    color: #777;
    margin-top: 5px;
    font-size: 1.0rem;
  }
  
</style>