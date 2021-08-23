let expect = require("chai").expect;
let request = require("supertest");
const app = require("../server.js");

describe("GET /", () => {
    it("respond with Hello World", (done) => {
        request(app).get("").expect("Server is up and running", done);
    });
});
