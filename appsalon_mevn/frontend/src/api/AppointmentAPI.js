import api from '../lib/axios'

export default {
    create(data){
        return api.post('/appointments',data)
    },
    getByDate(date){
        return api.get(`/appointments?date=${date}`)
    }
}