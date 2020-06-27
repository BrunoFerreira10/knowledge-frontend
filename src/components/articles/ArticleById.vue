<template>
  <div class="article-by-id">
    <PageTitle icon="fa fa-folder-o" :title="article.name" :subtitle="article.description"></PageTitle>
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'

export default {
  name: 'ArticlesById',
  components: {
    PageTitle
  },
  data: function () {
    return {
      article: {},      
    }
  },
  mounted() {
    const url = `${baseApiUrl}/articles/${this.$route.params.id}`
    axios.get(url).then(res => this.article = res.data)
  },
  updated(){
    document.querySelectorAll('.article-content pre').forEach(e => {
      hljs.highlightBlock(e)
    })
  }
}
</script>

<style>
  .article-content {
    background-color: #FFF;
    border-radius: 8px;
    padding: 25px;    
  }

  .article-content pre {
    font-size: 1.2rem;
    border-radius: 8px;
    padding: 20px;  
    background-color: #1e1e1e;  
    color: #FAFAFA;
  }

  .article-content image {
    max-width: 100%;     
  }

  .article-content :last-child {
    margin-bottom: 0px;
  }


</style>