"use strict";

const text = document.querySelector("#text"),
    addBtn = document.querySelector("#button"),
    list = document.querySelector("#list");

addBtn.addEventListener("click", addText);


function addText() {
    const req = {
        text: text.value,
    };

    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
      .then((response) => {
        if (response.ok) {
          // 성공적으로 추가되었을 경우, 현재 페이지를 리로드하여 목록을 업데이트
          location.reload();
        } else {
          throw new Error("추가할 수 없습니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

(function bringList() {
  fetch("/getlist", {
      method: "GET",
      headers: {
          "Content-Type": "text/html", // HTML 형식으로 요청
      },
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to fetch list");
          }
          return response.json();
      })
      .then((data) => {
          const list = document.querySelector("#list");
          for (let i = 0; i < data.length; i++) {
            
            const item = document.createElement("p"); // <p></p>
            const listSplit = data[i].split(","); // [description, is_check]

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";

            item.innerHTML = listSplit[0]; // description

            if (listSplit[1] === "1") {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }

            list.appendChild(item);
            item.appendChild(checkbox);
          }
      })
      .catch((error) => {
          console.error(error);
      });
})();