import api from '../../utils/api'
import { getUserApi } from '../login/authAPI'
import { registerBody } from './registrationInterface'

export async function registerUserApi(body: registerBody) {
    const { data } = await api.post('/user', body)
    const token = data
    api.defaults.headers.common['x-auth-token'] = token
    const user = await getUserApi()
    return { user }
}
