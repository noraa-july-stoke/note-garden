// frontend/src/store/csrf.js
// imports
import axios from "axios";
const Cookies = require("js-cookie");
// csrfFetch function
export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || "GET";
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};
  // if the options.method is not 'GET'
  if (options.method.toUpperCase() !== "GET") {
    // if the options.headers["Content-Type"] is not multipart/form-data
    if (options.headers["Content-Type"] === "multipart/form-data") {
      // delete options.headers["Content-Type"];
      delete options.headers["Content-Type"];
    } else {
      // otherwise, set options.headers["Content-Type"] to 'application/json' if it is not already set
      options.headers["Content-Type"] = options.headers["Content-Type"] || "application/json";
    }
    // set options.headers["XSRF-Token"] to the value of the XSRF-TOKEN cookie
    options.headers["XSRF-Token"] = Cookies.get("XSRF-TOKEN");
  }
  // call axios with the url and the options passed in
  // try {
    const res = await axios(url, options);
    if (res.status > 399) throw new Error(res);
    return res
  // } catch (err) {
    // console.log(err);
    // return err.response;
  // }
}

// restoreCSRF function
export function restoreCSRF() {
  return csrfFetch("/api/csrf/restore");
}
