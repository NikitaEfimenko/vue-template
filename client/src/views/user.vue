<template>
  <v-layout align-center justify-center>
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-per-page="10"
    class="elevation-1"
  >
    <template v-slot:body='{ items }'>
      <tr v-for='(item, id) in items' :key='item.name' :class='{ "back": id%2 }'>
        <td class='text-start'>{{item.id}}</td>
        <td class='text-end'>{{item.login}}</td>
        <td class='text-center'>
          <v-icon :color='item.gender ? "red" : "blue"' size='30'>{{item.gender ? 'fas fa-mars' : 'fas fa-venus'}}</v-icon>
        </td>
        <td class='text-end'>
          <v-icon color='grey' size='40'>{{item.admin ? 'fas fa-user-shield' : 'fas fa-user'}}</v-icon>
        </td>
      </tr>
    </template>
    <template  v-slot:no-data>
        NO DATA HERE!
    </template>
  </v-data-table>
   </v-card>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
 name: 'User',
 data() {
   return {
     search: null,
     loading: false,
     headers: [
       {
         text: 'Id',
         value: 'id',
       },
       {
         text: 'Login',
         value: 'login',
          align:'end'
       },
       {
         text: 'Gender',
         value: 'gender',
          align:'center'
       },
       {
         text: 'Role',
          align:'end',
         value: 'admin'
       }
     ]
   }
 },
 computed: {
   ...mapState('users', {
     items: state => state.users
   })
 },
 methods: {
   ...mapActions('users', ['downloadUsers'])
 },
 created(){
   this.loading = true;
   this.downloadUsers().then(() => this.loading = false)
 }
}
</script>

<style>
.back {
  background-color:whitesmoke;
}
</style>