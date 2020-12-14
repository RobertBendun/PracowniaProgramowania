<template>
  <q-page>
    <q-btn @click="dialog=true" label="Dodaj użytkownika" />
    <q-table
      title="Użytkownicy"
      :data="users"
      :columns="columns"
    />
    <q-dialog
      v-model="dialog"
      maximized
      persisent
    >
      <q-card>
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <h6>Dodaj nowego użytkownika</h6>
          <q-form @submit="addUser">
            <q-input v-model="user.id" label="ID" />
            <q-input v-model="user.name" label="Imię" />
            <q-input v-model="user.surname" label="Nazwisko" />
            <q-input v-model="user.login" label="Nazwa użytkownika" />
            <q-input type="password" v-model="user.password" label="Hasło" />
            <q-input v-model="user.dateOfBirth" label="Data urodzenia" />
            <q-toggle v-model="user.isDeleted" label="Usunięty?" />
            <br />
            <q-btn color="primary" type="submit" label="Dodaj użytkownika" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import axios from 'axios'

export default defineComponent({
  name: 'PageIndex',
  data() {
    const columns = [
      { field: 'id', label: 'ID' },
      { field: 'name', label: 'Imię' },
      { field: 'surname', label: 'Nazwisko' },
      { field: 'login', label: 'Login' },
      { field: 'password', label: 'Hasło' },
      { field: 'dateOfBirth', label: 'Data urodzenia' },
      { 
        field: 'isDeleted',  label: 'Usunięty', 
        format: val => val ? '\u2713' : ''
      }
    ].map(obj => ({ ...obj, name: obj.field, sortable: true }))

    return {
      users: [] as any[],
      columns,
      index: 0,
      dialog: false,

      user: {
        id: null,
        name: null,
        surname: null,
        login: null,
        password: null,
        dateOfBirth: null,
        isDeleted: false
      }
    }
  },

  async mounted() {
    const users = await axios.get('/api/users')
    if (users.status === 200)
      this.users = users.data
  },

  methods: {
    async addUser() {
      this.user.isDeleted = !!this.user.isDeleted
      const user = await axios.post('/api/users', this.user)
      if (user.status == 200) {
        this.users.push(user.data)
        for (const prop in this.user) {
          this.user[prop] = null;
        }
        this.dialog = false
      }
    }
  }
})
</script>
