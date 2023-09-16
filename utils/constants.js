import axios from 'axios'
export const getData = async (API_URL) => {
    try {
        const resp = await axios.get(API_URL)
        return resp.data
    } catch (error) {

    }
}