import { User } from "./user.js";

describe("#list", function () {
    beforeEach(function () {
        // initialization logic
    });

    it("works", async function () {
        const list = await User.list();
        expect(Array.isArray(list)).toBe(true);
        expect(list.length).toBeGreaterThan(0);
    });

    afterEach(function () { });
});


describe("#get", function () {
    beforeEach(function () {
        // initialization logic
    });

    it("works", async function () {
        const user = await User.get(1);
        expect(user).toEqual({
            "id": 1,
            "email": "kyle@getyodlr.com",
            "firstName": "Kyle",
            "lastName": "White",
            "state": "active"
        });
    });

    afterEach(function () { });
});


let insertId = null;
describe("#insert", function () {
    beforeEach(function () {
        // initialization logic
    });

    it("works", async function () {
        const data = {
            email: "test@test.com",
            password: "test",
            firstName: "testF",
            lastName: "testL"
        }
        const user = await User.insert(data);
        expect(typeof user.id).toEqual("number");
        expect(user.state).toEqual("pending");
        insertId = user.id;
    });

    afterEach(async function () {
        if (insertId !== null) {
            await User.delete(insertId);
            insertId = null;
        }
    });
});


describe("#update", function () {
    beforeEach(function () {
        // initialization logic
    });

    it("works", async function () {
        const user = await User.get(1);
        const data = {
            id: 1,
            email: "test@test.com",
            password: "test",
            firstName: "testF",
            lastName: "testL",
            state: "active"
        }
        const newUser = await User.update(1, data);
        expect(newUser).toEqual(data);

        const newGetUser = await User.get(1);
        expect(newGetUser).toEqual(data);

        await User.update(1, user);
    });

    afterEach(async function () {
    });
});



describe("#delete", function () {
    beforeEach(async function () {
        // initialization logic
        const data = {
            email: "test@test.com",
            password: "test",
            firstName: "testF",
            lastName: "testL"
        }
        const user = await User.insert(data);

        insertId = user.id;
    });

    it("works", async function () {

        const user = await User.get(insertId);
        expect(user).not.toBeNull();

        await User.delete(insertId);

        try {
            await User.get(insertId);
            expect(1).toEqual(2);
        } catch (error) {
            expect(error).not.toBeNull();
        }
    });

    afterEach(async function () {
    });
});

