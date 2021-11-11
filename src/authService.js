import axios from 'axios';

class APIService {

    constructor(url = process.env.REACT_APP_API_URL, client = axios) {
        this.url = url;
        this.client = client;
    }

    login(credentials) {
        return this.client.post(`${this.url}/auth/login`, credentials);
    }

    logout(token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return this.client.get(`${this.url}/auth/logout`, config);
    }

}

export default APIService;