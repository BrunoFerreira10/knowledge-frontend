<template>
<div class="article-item">
  <router-link :to="{name: 'articleById', params: { id: article.id }}">
    <div class="article-item-image" d-none d-sm-block>
      <img alt="Article" v-if="article.imageUrl" :src="article.imageUrl" height="150" width="150">
      <img src="@/assets/article.png" alt="Article" height="150" width="150" v-else>
    </div>
    <div class="article-item-info">
      <h2>{{ article.name }}</h2>
      <p> {{ article.description }}</p>
      <span class="article-item-author">
        <strong>Author: </strong> {{ article.author }}
      </span>
    </div>
  </router-link>
</div>
  
</template>

<script>
export default {
  name: 'ArticleItem',
  props: ['article']
}
</script>

<style>
  .article-item {    
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #FFF;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-shadow: 0 1x 5px rgba(0, 0, 0, 0.15);
  }
  
  .article-item a {    
    display: flex;        
    align-items: flex-start;    
    text-decoration: none;
    color: #000;    
  }

  .article-item-info h2 {
    font-size: 1.4rem;
  }

  .article-item-image {
    padding-right: 20px;
    margin-right: 20px;
    border-right: 1px solid #AAA;
  }

  .article-item-image img {
    border-radius: 5px;
  }

  .article-item-info{
    display: block;    
    display: flex;
    flex-direction: column;
    align-self: stretch;
  }

  .article-item-info p {
    flex: 1;
  }

  @media (max-width: 576px){
    .article-item a {            
      flex-direction: column;        
    }

    .article-item-image {
      border-right: 0px;
      border-bottom: 1px solid #AAA;
      padding-right: 0px;
      margin-right: 0px;
      width: 100%;
      height: 100%;
    }

    .article-item-image img {
      width: 100%;
      height: 100%;
    }

    .article-item-info h2 {
      margin-top: 15px;
    }
  }

</style>