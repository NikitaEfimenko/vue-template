<template>
  <v-layout align-center justify-center>
    <v-card>
    <v-card-title>
      Admin panel
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        label="Search"
      ></v-text-field>
    </v-card-title>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :items-per-page="10"
    class="elevation-3"
  >
  <template v-slot:body='{ items }'>
      <tr v-for='(item, id) in items' :key='item.name' :class='{ "back": id%2 === 0 }'>
        <td class='text-center'>{{item.id}}</td>
        <td class='text-center'>{{item.name}}</td>
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
 name: 'Admin',
 data() {
   return {
     search: null,
     loading: false,
     headers: [
       {
         text: 'Id',
         value: 'id',
         align: 'center'
       },
       {
         text: 'Name',
         value: 'name',
         align: 'center'
       }
     ]
   }
 },
 computed: {
   ...mapState('users', {
     items: state => state.departaments
   })
 },
 methods: {
   ...mapActions('users', ['downloadDepartaments'])
 },
 created(){
   this.loading = true
   this.downloadDepartaments().then(() => this.loading = false)
 }
}
</script>

<style>
.back {
  background-color: whitesmoke;
}
</style>