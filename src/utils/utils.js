import Swal from "sweetalert2";

/**
 * Data
 */
let shortlinks = localStorage.getItem("links") ?
    JSON.parse(localStorage.getItem("links")) : [];

/**
 * 
 * @param {string} text 
 */
function Success(text) {
    Swal.fire({
        icon: "success",
        title: "Success",
        text: text,
    });
}

/**
 * 
 * @param {string} text 
 */
function Eror(text) {
    Swal.fire({
        icon: "error",
        title: "Error",
        text: text,
    });
}

export {
    shortlinks,
    Success,
    Eror
}