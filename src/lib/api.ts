import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://yallanowtripss.runasp.net/api',  // Updated base URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const language = localStorage.getItem('i18nextLng') || 'en';
    config.params = {
        language,
        localizationKey: language,
        lang: language,
        ...config.params,
    };

    return config;
});

// Optionally handle response errors (e.g., refreshing tokens)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('https://yallanowtripss.runasp.net/api/Auth/refreshToken', { // Update refresh token URL
                    refreshToken,
                });
                const { token } = response.data;

                localStorage.setItem('token', token);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return axios(originalRequest);
            } catch (error) {
                console.log(error);
            }
        }

        return Promise.reject(error);
    },
);
