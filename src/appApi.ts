import axios from "axios";

const appApi = axios.create({
	baseURL: 'https://us-central1-minimal-portfolio-4b77d.cloudfunctions.net/api',
});

export default appApi;