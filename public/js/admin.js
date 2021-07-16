import { loadHeader } from "./common.js";
import { User } from "./users.js";


const table = document.querySelector("#user-table");
let users = [];         // to container the user list
let sortField = "id";   // to store the current sorting field name
let sortAsc = true;     // to store the current sorting direction

/**
 * Init the table header, adding the sort events
 */
function initHeader() {
    const sortButtons = table.querySelectorAll("thead tr button");
    sortButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            sortUsers(e.target.getAttribute("data-field"));
        });
    })
}
/**
 * Init the user list
 */
async function initUsers() {
    users = await User.list();

    sortUsers(sortField);

    loadUsers();
}

/**
 * Activate a user
 * @param {*} user 
 */
async function activateUser(user) {

    const data = { ...user, state: "active" };      // change the state to active
    const result = await User.update(user.id, data, "put");

    if (result) {
        initUsers();
    }
}

/**
 * Sort the user list
 * @param {*} field 
 */
function sortUsers(field) {

    // set the sort direction
    if (field === sortField) {
        sortAsc = !sortAsc;
    } else {
        sortAsc = true;
    }
    sortField = field;

    // sort the list
    users.sort((user1, user2) => (user1[sortField] > user2[sortField] ? (sortAsc ? 1 : -1) : (sortAsc ? -1 : 1)));

    // set the button
    const sortButtons = table.querySelectorAll("thead tr button");
    sortButtons.forEach(button => {
        if (button.getAttribute("data-field") === field) {
            // add the up or down button to the header
            button.innerHTML = button.getAttribute("data-label") + ` <i class="fas fa-sort-${sortAsc ? "up" : "down"}"></i>`;
        } else {
            button.innerHTML = button.getAttribute("data-label");
        }
    })

    // refresh the table
    loadUsers();
}

/**
 * Load user list to the table
 */
function loadUsers() {
    const container = table.querySelector("tbody");
    container.innerHTML = "";       // clear the container

    for (const user of users) {
        const row = document.createElement("tr");       // the data rows

        // id
        const idCell = document.createElement("td");
        idCell.innerText = user.id;
        row.append(idCell);

        // email
        const emailCell = document.createElement("td");
        emailCell.innerText = user.email;
        row.append(emailCell);

        // first name
        const firstNameCell = document.createElement("td");
        firstNameCell.innerText = user.firstName;
        row.append(firstNameCell);

        // last name
        const lastNameCell = document.createElement("td");
        lastNameCell.innerText = user.lastName;
        row.append(lastNameCell);

        // state
        const actionCell = document.createElement("td");

        if (user.state === "pending") {
            // add the activate button when pending
            const button = document.createElement("button");
            button.classList.add("btn");
            button.classList.add("btn-primary");
            button.classList.add("py-0");
            button.innerText = "Activate";
            button.addEventListener("click", () => {
                activateUser(user);
            });
            actionCell.append(button);
        } else {
            actionCell.innerText = user.state;
        }
        row.append(actionCell);

        container.append(row);
    }
}


loadHeader();
initHeader();
initUsers();