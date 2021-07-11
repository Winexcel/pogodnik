// eslint-disable-next-line max-classes-per-file
import axios from 'axios';
import sleep from '@/utils/sleep';


class Backend {
    constructor() {
        // this.axios = axios.create({ baseURL: 'http://188.120.224.90/api/' });
        this.axios = axios.create({baseURL: 'https://api.openweathermap.org/data/2.5/'});
        this.accessToken = '84e2a9ad0b2bca1922b23252454cc8a2';
    }

    axiosHandler = {
        post: async (method, params, config) => {
            let response;

            while (!response || !response.data) {
                try {
                    response = await this.axios.post(method, params, config);
                    // eslint-disable-next-line no-empty
                } catch (e) {
                }

                if (!response || !response.data) await sleep(1000);
            }

            return (response);
        },

        get: async (method, params) => {
            let response;
            while (!response || !response.data) {
                try {
                    response = await this.axios.get(method, {params});
                    // eslint-disable-next-line no-empty
                } catch (e) {
                    if (e.message === 'Network Error') {
                        await sleep(1000);
                    } else {
                        throw e;
                    }
                }
            }

            return (response);
        }
    };

    async getWeather(city, lang) {
        const method = 'weather';
        const params = new URLSearchParams();
        params.append('q', city);
        params.append('appId', this.accessToken);
        params.append('units', 'metric');
        params.append('lang', lang);

        const response = await this.axiosHandler.get(method, params);
        return response.data;
    }
}

const backend = new Backend();

export default backend;
