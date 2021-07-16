import { YodlrAPI } from "./api.js";

/**
 * Class to handle all the ajax request of user
 */
export class User {

    /**
     * Return array of all users
     * ()=>[user1 , user2, ...]
     * @returns 
     */
    static async list() {
        return YodlrAPI.request("users");
    }

    /**
     * Returns the user with given id
     * (id)=>{id, email, firstName, lastName, state}
     * @param {*} id 
     * @returns 
     */
    static async get(id) {
        return YodlrAPI.request(`users/${id}`);
    }

    /**
     * Creates a new user, and returns the created user data;
     * {email, firstName, lastName, state} => {id, email, firstName, lastName, state}
     * @param {*} data 
     * @returns 
     */
    static async insert(data) {

        return YodlrAPI.request("users", { ...data }, "post");
    }

    /**
     * updates the user with given id and returns updated record.
     * (id , {email, firstName, lastName, state}) => {id, email, firstName, lastName, state}
     * @param {*} id 
     * @param {*} data 
     * @returns 
     */
    static async update(id, data) {
        return YodlrAPI.request(`users/${id}`, { ...data }, "put");
    }


    /**
     * Removes the users with given id, returns nothing
     * @param {*} id 
     */
    static async delete(id) {
        YodlrAPI.request(`users/${id}`, {}, "delete");
    }
}