<template>
  <div class="category-admin">

    <button class="fbtn fbtn-add" v-if="mode === 'list'" @click="mode = 'save'">
      <i class="material-icons">add</i>
    </button>

    <button class="fbtn fbtn-save" v-if="mode === 'save'" @click="save">
      <i class="material-icons">save</i>
    </button>

    <button class="fbtn fbtn-update" v-if="mode === 'edit'" @click="save">
      <i class="material-icons">cached</i>
    </button>

    <button class="fbtn fbtn-delete" v-if="mode === 'remove'" @click="remove">
      <i class="material-icons">delete_forever</i>
    </button>

    <button class="fbtn fbtn-edititem" v-if="mode === 'itemSelected'" @click="loadModelItem(selectedItem, 'edit')">
      <i class="material-icons">edit</i>
    </button>

    <button class="fbtn fbtn-deleteitem" v-if="mode === 'itemSelected'" @click="loadModelItem(selectedItem, 'remove')">
      <i class="material-icons">delete</i>
    </button>

    <button class="fbtn fbtn-cancel" v-if="mode !== 'list'" @click="reset">
      <i class="material-icons">clear</i>
    </button> 

    <b-form v-if="mode !== 'list' && mode !== 'itemSelected'">
      <input type="hidden" id="category-id" v-model="modelItem.id" />

      <b-row>
        <b-col xs="12">
          <b-form-group :label="$t('message.Name')" label-for="category-name">
            <b-form-input
              :readonly="mode === 'remove'"
              id="category-name"
              type="text"
              v-model="modelItem.name"
              required
              :placeholder="$t('message.Category')"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-form-group :label="$t('message.CategoryParent')" label-for="category-parent">
            <b-form-select
              v-if="mode === 'save'"
              id="category-parent"
              v-model="modelItem.parentId"
              :options="categorieOptions"
            ></b-form-select>
            <b-form-input
              v-else
              :readonly="mode === 'remove'"
              id="category-parent"
              type="text"
              v-model="modelItem.path"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      
    </b-form>
    
    <b-table v-if="mode === 'list' || mode ==='itemSelected'" hover striped selectable select-mode="single"
      :items="modelList" :fields="fields" @row-selected="onRowSelected">      
    </b-table>
    <b-pagination v-if="mode === 'list'" class="paginator" size="md" v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, showError } from '@/global'
import Vue from 'vue'

export default {
  name: 'CategoryAdmin',
  data: function () {
    return {
      mode: "list",
      modelItem: { parentId: null },
      modelList: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [],
      selectedItem: {}
    }
  },
  computed: {
    categorieOptions: function () {
      let list = this.modelList.map(item => {
        return { ...item, value: item.id, text: item.path }
      })
      list = [{ value: null, text: this.$i18n.t('message.CategoryParent') }, ...list]
      return list
    }
  },
  methods: {
    listAll() {
      axios.get(`${baseApiUrl}/categories?page=${this.page}`)
        .then(list => {
          this.modelList = list.data.data;
          this.count = list.data.count
          this.limit = list.data.limit
        })
        .catch(showError)
    },
    loadModelItem(item, mode) {
      this.mode = mode
      this.modelItem = { ...item }
      document.documentElement.scrollTop = 0;  
    },
    reset() {
      this.modelItem = { parentId: null },
      this.listAll()
      this.mode = 'list'
      this.selectedItem = {}
    },
    save() {
      const method = this.modelItem.id ? 'put' : 'post'
      const id = this.modelItem.id ? `/${this.modelItem.id}` : ''
      const url = `${baseApiUrl}/categories${id}`

      axios[method](url, this.modelItem)
        .then(res => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const url = `${baseApiUrl}/categories/${this.modelItem.id}`
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
          { key: 'path', label: this.$i18n.t('message.Path'), sortable: true },
          { key: 'actions', label: this.$i18n.t('message.Actions') }
        ] : [
          { key: 'name', label: this.$i18n.t('message.Name'), sortable: true },
          { key: 'path', label: this.$i18n.t('message.Path'), sortable: true },
          { key: 'actions', label: this.$i18n.t('message.Actions') }
        ]
    },
    onRowSelected(items){
      this.selectedItem = items[0] || null
      this.mode = 'itemSelected'
    }
  },
  mounted() {
    this.setFields()
    this.listAll()
    window.addEventListener('resize', this.setFields)        
  },
  watch: {
    page() {
      this.listAll()
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

.category-admin table{
  margin-top: 15px;
}

.article-admin button {
  font-size: 0.9rem;
}

.paginator button {
  font-size: 1rem;
}


.b-table > thead > tr > th > div {
  font-size: 0.95rem;
}

.b-table > tbody > tr > td {
  font-size: 0.9rem;
}
</style>