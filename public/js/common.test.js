import { loadHeader } from "./common.js";



describe("#loadHeader", function () {
    beforeEach(async function () {
        // initialization logic
        await loadHeader();
    });

    it("works", async function () {
        expect(document.querySelector(".navbar-brand").innerText).toEqual("Yodlr Design Challenge");
    });

    afterEach(function () { });
});
