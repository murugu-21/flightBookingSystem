import api from '../../utils/api'

export async function getUserApi() {
    return (await api.get('/auth')).data
}
