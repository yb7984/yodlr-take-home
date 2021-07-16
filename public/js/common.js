import { YodlrAPI } from "./api.js";


/**
 * Load the header part of the page
 */
export async function loadHeader() {

    const header = await YodlrAPI.request("/header.html");

    document.body.insertAdjacentHTML("afterbegin", header);
}