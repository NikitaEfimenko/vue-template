import axios from 'axios'
import router from '../router'
import store from '../store'
import { ROUTES } from '../constants'

console.log(store)

export const req = axios.create({
    validateStatus: status => {
        switch(status) {
            case 401:
                router.push({name: ROUTES.auth});
                break;
            case 404:
                router.push({name: ROUTES.notFound});
                break;
            case 403:
                router.push({name: ROUTES.denied});
                break;
            case 408:
                router.push({name: ROUTES.auth});
                break;
        }
        return status >= 200 && status < 300;
    }
})

const token = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export  const authenticate = ({login, password}) => {
    const data = window.btoa(unescape(encodeURIComponent((`${login}:${password}`))))
    return req.get('/authenticate', {
        headers: {
            Authorization: `Basic ${data}`
        }
    })
}

export  const restoreSession = () => {
    return req.get('/restore', {...token()})
}

export const profile = () => req.get('/profile', {
    ...token()
})

export const fetchUsers = () => req.get('/users', {
    ...token()
})

export const fetchDepartaments = () => req.get('/departaments', {
    ...token()
})
