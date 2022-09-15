import api from '../../utils/api'
import { loginBody } from './authInterface'

export async function loginUserApi(body: loginBody) {
    const { data } = await api.post('/auth', {
        email: body.email,
        password: body.password,
    })
    const token = data
    if (body.isSave) localStorage.setItem('token', token)
    api.defaults.headers.common['x-auth-token'] = token
    const user = await getUserApi()
    return { user }
}

export async function getUserApi() {
    return (await api.get('/auth')).data
}
