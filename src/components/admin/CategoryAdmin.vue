<template>
  <div class="category-admin">

    <b-row>
      <b-col xs="12">
        <b-button v-if="mode === 'list'" variant="primary" @click="mode = 'save'">New</b-button>        
      </b-col>
    </b-row>

    <b-form v-if="mode !== 'list'">
      <input type="hidden" id="category-id" v-model="modelItem.id" />

      <b-row>
        <b-col xs="12">
          <b-form-group label="Name" label-for="category-name">
            <b-form-input
              :readonly="mode === 'remove'"
              id="category-name"
              type="text"
              v-model="modelItem.name"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-form-group label="Category parent" label-for="category-parent">
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

      <b-row>
        <b-col xs="12">
          <b-button v-if="mode === 'save'" variant="primary" @click="save">Save</b-button>
          <b-button v-if="mode === 'edit'" variant="primary" @click="save">Update</b-button>
          <b-button v-if="mode === 'remove'" variant="danger" @click="remove">Delete</b-button>
          <b-button variant="secondary" @click="reset" class="ml-2">Cancel</b-button>
        </b-col>
      </b-row>
    </b-form>
    
    <b-table hover striped :items="modelList" :fields="fields">
      <template v-slot:cell(actions)="data">
        <div class="action-buttons">
          <b-button variant="warning" @click="loadModelItem(data.item, 'edit')">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button class="ml-2" variant="danger" @click="loadModelItem(data.item, 'remove')">
            <i class="fa fa-trash"></i>
          </b-button>
        </div>
      </template>
    </b-table>
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
      fields: []
    }
  },
  computed: {
    categorieOptions: function () {
      let list = this.modelList.map(item => {
        return { ...item, value: item.id, text: item.path }
      })
      list = [{ value: null, text: "Select category parent..." }, ...list]
      return list
    }
  },
  methods: {
    listAll() {
      axios.get(`${baseApiUrl}/categories`)
        .then(list => {
          this.modelList = list.data;
        })
        .catch(showError)
    },
    loadModelItem(item, mode = 'save') {
      this.mode = mode
      this.modelItem = { ...item }
    },
    reset() {
      this.modelItem = { parentId: null },
        this.listAll()
      this.mode = 'list'
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
          { key: 'path', label: 'Path', sortable: true },
          { key: 'actions', label: 'Actions' }
        ] : [
          { key: 'id', label: 'Code', sortable: true },
          { key: 'name', label: 'Name', sortable: true },
          { key: 'path', label: 'Path', sortable: true },
          { key: 'actions', label: 'Actions' }
        ]
    }
  },
  mounted() {
    this.setFields()
    this.listAll()
    window.addEventListener('resize', this.setFields)    
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
</style>