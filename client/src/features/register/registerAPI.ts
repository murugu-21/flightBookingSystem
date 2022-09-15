import api from '../../utils/api'
import { registerBody } from './registrationInterface'

export async function registerUserApi(body: registerBody) {
    return (await api.post('/user', body)).data
}
