"use strict";
var f = function () {
    var main = document.querySelector("main");
    var form = document.querySelector("main form");
    var text = "";
    var initialHTML = "";
    if (location.href && location.href.indexOf("text/") !== -1) {
        text = atob(location.href.split("text/")[1].split("/")[0]);
        initialHTML = main.innerHTML;
        main.innerHTML = "Loading...";
        if (typeof window.snarkdown === "function")
            text = window.snarkdown(text);
        main.innerHTML = text;
    }
    else if (form) {
        form.addEventListener("submit", function (event) {
            var textarea = document.querySelector("form textarea");
            if (textarea)
                text = textarea.value;
            var link = "$/text/" + btoa(text);
            location.href = link;
            event.preventDefault();
            return false;
        });
    }
    else {
        main.innerHTML = initialHTML;
    }
};
f();
window.a11ySettings = window.a11ySettings || {};
document.addEventListener('click', function (event) {
    if (event.target.hasAttribute("data-option")) {
        window.agastya.api("toggleMode", event.target.getAttribute("data-option"));
    }
}, false);
document.addEventListener('input', function (event) {
    if (event.target.hasAttribute("data-option")) {
        var property = {};
        var key = event.target.getAttribute("data-option");
        property[String(key)] = event.target.value;
        window.agastya.api("customize", property);
    }
}, false);
document.querySelector("#show-more-options").addEventListener("click", function () {
    document.querySelector("#show-more-options").style.display = "none";
    document.querySelector("#more-options").classList.remove("hidden");
});
document.querySelector("#agastya-toggler").addEventListener("click", function () {
    document.querySelector("#agastya-toggler .less").classList.toggle("hidden");
    document.querySelector("#agastya-toggler .more").classList.toggle("hidden");
    document.querySelector("#agastya-toggler .arrow-less").classList.toggle("hidden");
    document.querySelector("#agastya-toggler .arrow-more").classList.toggle("hidden");
    document.querySelector("#options-container").classList.toggle("hidden");
});
window.addEventListener("hashchange", function (event) {
    f();
});
