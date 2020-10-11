import { http } from './config'

export default {
    climate:(infoData) => {
        infoData.city = infoData.city.replaceAll(' ', '_');
        infoData.state = infoData.state.replaceAll(' ', '_');
        return http.get('current?city='+ infoData.city +'&state='+ infoData.state +'&country='+ infoData.country +'&key=44daf28957934687b5eca6e091546d8b&lang=pt')
    }
}