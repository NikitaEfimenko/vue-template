<template>
  <v-layout align-center justify-center>
    <v-card
        class="mx-auto"
        max-width="344"
     >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">{{user.roles.join(', ')}}</div>
        <v-list-item-title class="headline mb-4">{{ user.login }}</v-list-item-title>
        <v-list-item-subtitle>{{`#${user.id}`}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      >
        <v-icon size='50' color='white'>{{ user.gender ? 'fas fa-venus' : 'fas fa-mars'}}</v-icon>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
export default {
 name: 'profile',
 computed: {
     ...mapState('session', {
         user: state => state.user
     })
 }
}
</script>

<style>

</style>