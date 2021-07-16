const BASE_URL = "http://localhost:3000";

export class YodlrAPI {
    /**
     * token
     */
    static token = "";
    /**
     * Make a ajax request and return result data
     * @param {*} endpoint 
     * @param {*} data 
     * @param {*} method 
     * @returns 
     */
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${YodlrAPI.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }
}