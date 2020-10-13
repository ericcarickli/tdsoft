import { http } from './config'

export default {
    climate:(infoData) => {
        var copy_city = infoData.city.replaceAll(' ', '_');
        var copy_state = infoData.state.replaceAll(' ', '_');

        return http.get('current?city='+ copy_city +'&state='+ copy_state +'&country='+ infoData.country +'&key=44daf28957934687b5eca6e091546d8b&lang=pt')
    }
}