import { http } from './config'

export default {
    climate:(latitude, longitude) => {

        return http.get('current?lat='+ latitude +'&lon='+ longitude +'&key=44daf28957934687b5eca6e091546d8b&lang=pt')
    }
}