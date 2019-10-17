<template>
  <div>
    <v-navigation-drawer v-model="model" :mini-variant="mini" temporary app overflow>
      <v-list>
        <template v-for="item in menu">
          <v-divider v-if="item.divider" :key="item.route" dark class="my-2" />
          <v-list-item v-else-if='!item.closed' :key="item.route" @click="$router.push({name: item.route})">
            <v-list-item-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="model = !model">
        <v-icon>fas fa-city </v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>ITFB</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ROUTES } from '../constants'
export default {
  name: "navigation",
  data() {
    return {
      model: null,
      mini: false
	}},
	computed: {
		...mapState('session', {
			isAdmin: state => {
				return state.user.roles.includes('admin')
			}
		}),
		menu() {
			return [
        {
          title: "Profile",
          route: ROUTES.profile,
					icon: "fas fa-user",
        },
        { divider: true },
        {
          title: "Users",
          route: ROUTES.user,
          icon: "fas fa-user-friends"
        },
        {
          title: "Admin",
          route: ROUTES.admin,
					icon: "fas fa-user-shield",
					closed: !this.isAdmin
        },
        { divider: true },
        {
          title: "Exit",
          route: ROUTES.auth,
          icon: "fas fa-door-open"
        }
      ]
    }
	}
};
</script>

<style>
.closed {
	background: #999;
	text-decoration: underline;
}
</style>