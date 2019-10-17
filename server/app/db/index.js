const roles = {
	user: ['user'],
	admin: ['user', 'admin']
}

const store = {
	users: [
		{ id: 1, 	login: 'Bob', password: '1', gender: 0, roles: roles.admin },
		{ id: 3, 	login: 'Eric', password: '2', gender: 1, roles: roles.admin },
		{ id: 34, login: 'Josh', password: '1', gender: 1, roles: roles.user },
		{ id: 65, login: 'Gregory', password: '1', gender: 1, roles: roles.admin },
		{ id: 12, login: 'John', password: '6', gender: 0, roles: roles.user },
		{ id: 16, login: 'Frank', password: '2', gender: 0, roles: roles.user },
		{ id: 41, login: 'Timmy', password: '4', gender: 0, roles: roles.user },
		{ id: 76, login: 'Margaret', password: 'qwerty', gender: 1, roles: roles.admin },
		{ id: 63, login: 'Ken', password: '1234', gender: 1, roles: roles.user } 
	],
	departaments: [
		{ id: 1, name: '#1' },
		{ id: 121, name: '#245' },
		{ id: 411, name: '#67' },
		{ id: 21, name: '#65' },
		{ id: 41, name: '#76' },
		{ id: 1241, name: '#634' },
		{ id: 142, name: '#767' },
		{ id: 13, name: '#346' },
		{ id: 51, name: '#636' },
	]
}

const timeout = (f) => setTimeout(f, 1000)

const db = {
	UserModel: {
		findOne: ({ login, password }) => new Promise(resolve => {
			const user = store.users.find(user => (user.login === login) && user.password === password)
			timeout(
				() => resolve(user)
			)
		}),
		findOneById: (id) => new Promise(resolve => {
			const user = store.users.find(user => (user.id === id))
			timeout(
				() => resolve(user)
			)
		}),
		fetchAll:  () => new Promise(resolve => {
			timeout(
				() => resolve(store.users.map(u => ({id: u.id, login: u.login, gender: u.gender, admin: u.roles.includes('admin') })))
			)
		})
	},
	DepartamentsModel: {
		fetchAll:  () => new Promise(resolve => {
			timeout(
				() => resolve(store.departaments)
			)
		})
	}
}
module.exports = db