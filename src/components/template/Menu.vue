<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input type="text" class="filter-field" placeholder="Type to filter..." v-model="treeFilter">
    </div>
    <Tree :data="treeData" :options="treeOptions" :filter="treeFilter" ref="tree">      
    </Tree>
  </aside>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
  name: 'Menu',
  components: {
    Tree
  },
  data: function() {
    return {
      treeFilter: '',
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: {
          'text' : 'name',          
        },
        filter: {
          emptyText: 'Category not found...'
        }
      }
    }
  },
  computed: mapState(['isMenuVisible']),
  methods: {
    ...mapMutations(['toggleMenu']),
    getTreeData() {
      const url = `${baseApiUrl}/categories/tree`
      return axios(url).then(res => res.data)
    },
    onNodeSelect(node) {
      this.$router.push({
        name: 'articlesByCategory',
        params: { id: node.id }
      })

      if(this.$mq === 'xs' || this.$mq === 'sm'){
         this.toggleMenu(false)
      } 
    }
  },
  mounted() {
    this.$refs.tree.$on('node:selected', this.onNodeSelect)
  }
}
</script>

<style>
  .menu {
    grid-area: menu;
    background: linear-gradient(to right, #232526, #414345);
    
    position: fixed;
    top: 45px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;    
    width: 260px;
    height: 100%;
    z-index: 10;    
  }

  .menu .tree-anchor,
  .menu .tree-anchor:hover {
    color: #FFF;
    text-decoration: none;    
  }

  .menu .tree-anchor{
    font-size: 0.8rem;
  }

  .menu .tree-node:not(.selected) > .tree-content:hover {
    background-color: rgba(255, 255, 255, 0.2);
  } 

  .menu .tree-node.selected > .tree-content {
    background-color: rgba(255, 255, 255, 0.2);
  }   

  .tree-arrow.has-child { 
    filter: brightness(2);    
  }
  
  .menu .menu-filter {
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #AAA;
  }
  .menu .menu-filter i {
    color: #AAA;
    margin-right: 10px;
    font-size: 0.8rem;
  }

  .menu input {
    color: #CCC;
    font-size: 0.8rem;
    border: 0;
    outline: 0;
    width: 100%;
    background: transparent;
  }
  
  .menu .tree-filter-empty {
    color: #CCC;
    font-size: 0.8rem;
    margin-left: 20px;
    /* WOW */
  }
  

</style>