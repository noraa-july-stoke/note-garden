


const { csrfFetch } = require("../src/store/csrf");
const { restoreCSRF } = require("../src/store/csrf");

describe("csrfFetch", () => {
  test("should return a response", async () => {
    const response = await csrfFetch("/api/users");
    expect(response).toBeTruthy();
  });
});
// run the test with npm test
// the test should pass
// now we need to test the restoreCSRF function
// path: ../src/store/csrf.js
// write a test for it in store.tests.js, this file



describe("csrfFetch", () => {
  test("should return a response", async () => {
    const response = await csrfFetch("/api/users");
    expect(response).toBeTruthy();
  });
});
