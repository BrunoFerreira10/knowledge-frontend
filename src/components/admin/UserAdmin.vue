<template>
  <div class="user-admin">

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

    <button class="fbtn fbtn-edititem" v-if="mode === 'itemSelected'" @click="loadUser(selectedItem, 'edit')">
      <i class="material-icons">edit</i>
    </button>

    <button class="fbtn fbtn-deleteitem" v-if="mode === 'itemSelected'" @click="loadUser(selectedItem, 'remove')">
      <i class="material-icons">delete</i>
    </button>

    <button class="fbtn fbtn-cancel" v-if="mode !== 'list'" @click="reset">
      <i class="material-icons">clear</i>
    </button> 

    <b-form v-if="mode !== 'list' && mode !== 'itemSelected'">
      <input type="hidden" id="user-id" v-model="user.id" />

      <b-row>
        <b-col md="6" sm="12">
          <b-form-group :label="$t('message.Name')" label-for="user-name">
            <b-form-input
              id="user-name"
              type="text"
              v-model="user.name"
              :readonly="mode === 'remove'"
              required
              :placeholder="$t('message.Name')"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="E-mail:" label-for="user-email">
            <b-form-input
              id="user-email"
              type="text"
              v-model="user.email"
              :readonly="mode === 'remove'"
              required
              placeholder="E-mail..."
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-checkbox
        id="user-admin"
        v-model="user.admin"
        :disabled="mode === 'remove'"
        class="mt-3 mb-3"
      >Administrator</b-form-checkbox>

      <b-row v-show="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group :label="$t('message.Password')" label-for="user-password">
            <b-form-input
              id="user-password"
              type="password"
              v-model="user.password"
              required
              :placeholder="$t('message.Password')"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group :label="$t('message.ConfirmPassword')" label-for="user-confirm-password">
            <b-form-input
              id="user-confirm-password"
              type="password"
              v-model="user.confirmPassword"
              required
              :placeholder="$t('message.ConfirmPassword')"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      
    </b-form>

    <b-table v-if="mode === 'list' || mode ==='itemSelected'" hover striped selectable select-mode="single"
      :items="users" :fields="fields" @row-selected="onRowSelected">      
    </b-table>
    <b-pagination v-if="mode === 'list'" class="paginator" size='md' v-model="page" :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import axios from "axios"
import { baseApiUrl, showError } from "@/global"

export default {
  name: "UserAdmin",
  data: function () {
    return {
      mode: "list",
      user: {},
      users: [],
      page: 1,
      count: 0,
      limit: 0,
      fields: [],
      selectedItem: {}
    }
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users?page=${this.page}`
      axios.get(url).then(res => {
        this.users = res.data.data
        this.count = res.data.count
        this.limit = res.data.limit        
      })
    },
    reset() {
      this.mode = 'list'
      this.user = {},
      this.loadUsers()
      this.selectedItem = {}
    },
    save() {
      const method = this.user.id ? 'put' : 'post'
      const id = this.user.id ? `/${this.user.id}` : ''
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess('User saved or updated successfully!')
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const id = this.user.id
      axios.delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess('Use deleted successfully...')
          this.reset()
        })
        .catch(showError)
    },
    loadUser(user, mode) {
      this.mode = mode
      this.user = { ...user }
      document.documentElement.scrollTop = 0;  
    },
    setFields() {
      this.fields = this.$mq === 'xs' || this.$mq === 'sm'  ?
      [
        { key: 'name', label: this.$i18n.t('message.Name'), sortable: true },
        { key: 'admin', label: 'Admin', sortable: true,
          formatter: value => value ? 'Yes' : 'No'},
        { key: 'actions', label: this.$i18n.t('message.Actions') }
      ] : [
        { key: 'name', label: this.$i18n.t('message.Name'), sortable: true },
        { key: 'email', label: 'E-mail', sortable: true },
        { key: 'admin', label: 'Admin', sortable: true,
          formatter: value => value ? 'Yes' : 'No'},
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
    this.loadUsers()
    window.addEventListener('resize', this.setFields)    
  },
  watch: {
    page() {
      this.loadUsers()      
    }
  }
}
</script>

<style>
.actions-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-admin table{
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