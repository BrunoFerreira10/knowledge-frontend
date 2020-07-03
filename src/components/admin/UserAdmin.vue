<template>
  <div class="user-admin">

    <b-row>
      <b-col xs="12">
        <b-button v-if="mode === 'list'" variant="primary" @click="mode = 'save'">{{ $t('message.Add') }}</b-button>        
      </b-col>
    </b-row>

    <b-form v-if="mode !== 'list'">
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

      <b-row>
        <b-col xs="12">
          <b-button v-if="mode === 'save'" variant="primary" @click="save">{{ $t('message.Save') }}</b-button>
          <b-button v-if="mode === 'edit'" variant="primary" @click="save">{{ $t('message.Update') }}</b-button>
          <b-button v-if="mode === 'remove'" variant="danger" @click="remove">{{ $t('message.Delete') }}</b-button>
          <b-button variant="secondary" @click="reset" class="ml-2">{{ $t('message.Cancel') }}</b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-table hover striped :items="users" :fields="fields">
      <template v-slot:cell(actions)="data">
        <div class="actions-buttons">
          <b-button class="mr-2" variant="warning" @click="loadUser(data.item, 'edit')">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadUser(data.item, 'remove')">
            <i class="fa fa-trash"></i>
          </b-button>
        </div>
      </template>
    </b-table>
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
      fields: []
    }
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`
      axios.get(url).then(res => {
        this.users = res.data
        document.documentElement.scrollTop = 0;  
      })
    },
    reset() {
      this.mode = 'list'
      this.user = {},
        this.loadUsers()
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
    loadUser(user, mode = 'save') {
      this.mode = mode
      this.user = { ...user }
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
    }
  },
  mounted() {
    this.setFields()
    this.loadUsers()
    window.addEventListener('resize', this.setFields)    
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
</style>