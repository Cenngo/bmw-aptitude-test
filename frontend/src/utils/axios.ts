import axios from 'axios';

export const swrFetcher = ({url, params, body}: {url: string, params: Record<string, unknown>, body?: unknown}) => AxiosInstance.get(url, { params, data: body }).then(res => res.data);

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    paramsSerializer: (params) => {
        const queryString = new URLSearchParams();

        for (const key in params) {
            if(typeof params[key] === 'object') {
                queryString.append(key, JSON.stringify(params[key]));
            } else {
                queryString.append(key, params[key]);   
            }
        }

        return queryString.toString();
    }
});

export default AxiosInstance;