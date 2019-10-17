export const ROUTES = {
	auth: '/auth',
	about: '/about',
	home: '/',
	user: '/user',
	admin: '/admin',
	denied: '/access-denied',
	notFound: '/not-found',
	profile: '/profile' 
}

export const PERMISSIONS = {
  user: {
		USER: true,
  },
  admin: {
    DEPARTAMENT: true,
    USER: true
  }
}

const checkPermission = (domain, roles = []) => {
	const permissions = roles.reduce((acc, role) => ({...acc, ...PERMISSIONS[role]}), {})
	return permissions[domain]
}

export const GUARDS = {
  global: (store) => (to, from, next) => {
		if (store.state.session.token && to.name !== ROUTES.auth) {
			if (to.matched
				.every(record => Object.keys(record.meta)
				.map(domain => checkPermission(domain, store.state.session.user.roles)).every(e => !!e))) {
				next()
      } else {
        next({ name: ROUTES.denied })
      }
		} else if (localStorage.getItem('token') && to.name !== ROUTES.auth) {
			store.dispatch('session/restoreSession').then(() => {
				if (to.matched
					.every(record => 
						Object.keys(record.meta)
						.map(domain => checkPermission(domain, store.state.session.user.roles)).every(e => !!e))
					) {
					next()
				} else {
					next({ name: ROUTES.denied })
				}
			})
			next()
		} else {
			store.dispatch('session/resetSession')
			if(to.name !== ROUTES.auth) {
				next({ name: ROUTES.auth })
			} else next()
			
		}
	},
	homePage: (store) => (to, from, next) => {
		next({name: store.state.session.user.roles.includes('admin') ? ROUTES.admin : ROUTES.user})
	}
}