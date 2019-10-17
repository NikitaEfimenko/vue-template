import Vue from 'vue'
import Router from 'vue-router'
import { ROUTES, GUARDS, PERMISSIONS } from './constants'
import store from './store'

import Navigation from './components/Navigation.vue'

Vue.use(Router)
const router = new Router({
	mode: 'history',
	routes: [
		{
			path: ROUTES.home,
			name: ROUTES.home,
			beforeEnter: GUARDS.homePage(store)
		},
		{
			path: ROUTES.auth,
			name: ROUTES.auth,
			components: {
				default: () => import(/* webpackChunkName: "all" */"./views/auth.vue")
			},
		},
		{
			path: ROUTES.denied,
			name: ROUTES.denied,
			components: {
				default: () => import(/* webpackChunkName: "all" */"./views/denied.vue"),
				navigation: Navigation,
			},
		},
		{
			path: ROUTES.notFound,
			name: ROUTES.notFound,
			components: {
				default: () => import(/* webpackChunkName: "all" */"./views/not-found.vue"),
				navigation: Navigation
			},
		},
		{
			path: ROUTES.user,
			name: ROUTES.user,
			meta: PERMISSIONS.user,
			components: {
				default: () => import(/* webpackChunkName: "user" */"./views/user.vue"),
				navigation: Navigation
			}
		},
		{
			path: ROUTES.admin,
			name: ROUTES.admin,
			meta: PERMISSIONS.admin,
			components: {
				default: () => import(/* webpackChunkName: "admin" */"./views/admin.vue"),
				navigation: Navigation
			}
		},
		{
			path: ROUTES.profile,
			name: ROUTES.profile,
			components: {
				default: () => import(/* webpackChunkName: "all" */"./views/profile.vue"),
				navigation: Navigation
			}
		},
		{
			path: '*',
			components: {
				default: () => import(/* webpackChunkName: "all" */"./views/not-found.vue"),
				navigation: Navigation
			}
		}
	]
})
router.beforeEach(GUARDS.global(store))

export default router;