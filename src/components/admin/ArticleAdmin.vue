<template>
  <div class="article-admin">

    <b-row>
      <b-col xs="12">
        <b-button v-if="mode === 'list'" variant="primary" @click="mode = 'save'">New</b-button>        
      </b-col>
    </b-row>

    <b-form v-if="mode !== 'list'">
      <input type="hidden" id="article-id" v-model="article.id" />

      <b-row>
        <b-col xs="12">          
          <b-form-group label="Name" label-for="article-name">
            <b-form-input              
              :readonly="mode === 'remove'"
              id="article-name"
              type="text"
              v-model="article.name" required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col xs="12">          
          <b-form-group label="Description" label-for="article-description">
            <b-form-input              
              :readonly="mode === 'remove'"
              id="article-description"
              type="text"
              v-model="article.description" required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      
      <b-row>
        <b-col xs="12">          
          <b-form-group label="Image (URL)" label-for="article-image">
            <b-form-input              
              :readonly="mode === 'remove'"
              id="article-image"
              type="text"
              v-model="article.imageUrl" required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-form-group label="Category" label-for="article-category">
            <b-form-select v-if="mode === 'save'"
              id="article-category"              
              v-model="article.categorieId"
              :options="categoryOptions"            
            ></b-form-select>
            <b-form-input v-else              
              :readonly="mode === 'remove'"
              id="article-category"
              type="text"
              v-model="article.categorieId"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-form-group label="Author" label-for="article-user">
            <b-form-select v-if="mode === 'save'"
              id="article-user"              
              v-model="article.userId"
              :options="userOptions"            
            ></b-form-select>
            <b-form-input v-else              
              :readonly="mode === 'remove'"
              id="article-user"
              type="text"
              v-model="article.userId"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-form-group label="Contents" label-for="article-content">
            <VueEditor v-model="article.content" placeholder="Enter article contents..." :disabled="mode === 'remove'">
            </VueEditor>
          </b-form-group>
        </b-col>
      </b-row>


      <b-row>
        <b-col xs="12">
          <b-button v-if="mode === 'save'" variant="primary" @click="save">Save</b-button>
          <b-button v-if="mode === 'edit'" variant="primary" @click="save">Update</b-button>
          <b-button v-if="mode === 'remove'" variant="danger" @click="remove">Delete</b-button>
          <b-button variant="secondary" @click="reset" class="ml-2">Cancel</b-button>
        </b-col>
      </b-row>
    </b-form>
    
    <b-table hover striped :items="articles" :fields="fields">
      <template slot="actions" slot-scope="data">
        <div class="action-buttons">
          <b-button variant="warning" @click="loadArticle(data.item, 'edit')">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button class="ml-2" variant="danger" @click="loadArticle(data.item, 'remove')">
            <i class="fa fa-trash"></i>
          </b-button>
        </div>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />    
  </div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, showError } from '@/global'
import { VueEditor } from "vue2-editor"

export default {
  name: 'ArticleAdmin',
  components: {
    VueEditor
  },
  data: function () {
    return {
      mode: "list",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: []
    }
  },
  computed: {
    categoryOptions: function () {
       let list = this.categories.map(item => {
         return { ...item, value: item.id, text: item.path }
       })       
       return list
     },
     userOptions: function () {
       let list = this.users.map(item => {
         return { ...item, value: item.id, text: `${item.name} - ${item.email}` }
       })       
       return list
     }
  },
  methods: {
    loadArticles() {
      axios.get(`${baseApiUrl}/articles?page=${this.page}`)
        .then(res => {
          this.articles = res.data.data
          this.count = res.data.count
          this.limit = res.data.limit
        })
        .catch(showError)
    },
    loadArticle(item, mode) {
      const url = `${baseApiUrl}/articles/${item.id}`

      this.mode = mode
      axios.get(url)
        .then(res => {
          this.article = res.data          
        })
        .catch(showError)
      
    },   
    loadCategories() {
      axios.get(`${baseApiUrl}/categories`)
        .then(res => this.categories = res.data)
        .catch(showError)
    },
    loadUsers() {
      axios.get(`${baseApiUrl}/users`)
        .then(res => this.users = res.data)
        .catch(showError)
    },
    reset() {
      this.article = {},
      this.loadArticles()
      this.mode = 'list'
    },
    save() {
      const method = this.article.id ? 'put' : 'post'
      const id = this.article.id ? `/${this.article.id}` : ''
      const url = `${baseApiUrl}/articles${id}`      
      
      axios[method](url, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const url = `${baseApiUrl}/articles/${this.article.id}`
      axios.delete(url)
        .then(res => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    setFields() {
      this.fields = this.$mq === 'xs' || this.$mq === 'sm'  ?
      [
        { key: 'name', label: 'Name', sortable: true },        
        { key: 'actions', label: 'Actions' }
      ] : [
        { key: 'id', label: 'Code', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'description', label: 'Description', sortable: true},
        { key: 'actions', label: 'Actions' }
      ]
    }
  },
  mounted() {
    this.setFields()
    this.loadArticles()
    this.loadCategories()
    this.loadUsers()
    window.addEventListener('resize', this.setFields)    
  },
  watch: {
    page() {
      this.loadArticles()
    }
  }
}
</script>

<style>
.action-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.article-admin table{
  margin-top: 15px;
}
</style>