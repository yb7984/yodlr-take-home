import { loadHeader } from "./common.js";
import { User } from "./users.js";

const form = document.querySelector("#form-signup");

/**
 * Handle the submit event of the sign up form
 * @param {*} e 
 */
async function handleSignup(e) {
    e.preventDefault();

    const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
    }

    const user = await User.insert(data);

    if (user) {
        alert("Successfully sign up!");
        form.reset();
    }
}

loadHeader();

form.addEventListener("submit", handleSignup);