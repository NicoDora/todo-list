"use strict";

const text = document.querySelector("#text"),
    addBtn = document.querySelector("button");

addBtn.addEventListener("click", addText);

function addText() {
    const req = {
        text: text.value,
    }
    console.log(req);
}