<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar
            color="secondary"
            dark
          >
            <v-toolbar-title>
              <v-icon>fas fa-city </v-icon>
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field id='login' label="Login" v-model='model.login' prepend-icon="far fa-user-circle" type="text"></v-text-field>

              <v-text-field
                id="password"
                label="Password"
                ref='auth-input'
                v-model='model.password'
                prepend-icon="fas fa-lock"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click.stop='authenticate' color="secondary">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ROUTES } from '../constants'
import { mapActions } from 'vuex'
export default {
  name: "auth-page",
  data() {
    return {
      model: {
        login: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions('session', ['auth']),
    async authenticate() {
      const status = await this.auth({...this.model})
      status === 200 && this.$router.push({ name: ROUTES.home})
    }
  },
  mounted() {
    document.getElementById('login').focus()
  }
};
</script>

<style>
</style>