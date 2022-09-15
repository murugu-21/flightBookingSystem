import api from '../../utils/api'
import { loginBody } from './authInterface'

export async function loginUserApi(body: loginBody) {
    return (
        await api.post('/auth', {
            email: body.email,
            password: body.password,
        })
    ).data
}
