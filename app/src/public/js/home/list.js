"use strict";

const text = document.querySelector("#text"),
    addBtn = document.querySelector("#button"),
    list = document.querySelector("#list");

    let isItemAdded = false; // 리스트가 추가되었는지 확인하는 변수

addBtn.addEventListener("click", addList);

text.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && !isItemAdded) { // Enter
      addList();
    }
});

function addList() {
    const req = {
        text: text.value,
    };

    if (text.value === "") {
        return alert("리스트를 입력해주세요.");
    }

    isItemAdded = true; // 리스트가 추가되었음을 확인

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
            item.classList.add("item"); // <p class="item"></p>
            item.style.wordBreak = "break-all"; // <p class="item" style="word-break: break-all;"></p> 자동 줄바꿈
            const trash = document.createElement("i"); // <i></i>
            trash.classList.add("fa-solid", "fa-trash"); // <i class="fa-solid fa-trash"></i>
            const pencil = document.createElement("i"); // <i></i>
            pencil.classList.add("fa-solid", "fa-pen"); // <i class="fa-solid fa-pen"></i>

            const listSplit = data[i].split(","),
                id = listSplit[0],
                description = listSplit[1],
                is_check = listSplit[2];

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.style.zoom = "1.3";

            console.log(`id:${id}, description:${description}, is_check:${is_check}`);

            checkbox.addEventListener("change", () => { // 체크박스 체크 시
                const isCheck = checkbox.checked ? 1 : 0;
                updateCheckStatus(id, isCheck);
            });

            item.appendChild(checkbox);

            const description_span = document.createElement("span");
            description_span.classList.add("description");
            description_span.innerHTML = description; // description

            const edit = document.createElement("input");
            edit.classList.add("edit-input");
            edit.value = description; // description
            edit.style.display = "none"; // 숨김


            if (is_check === " 1") { // is_check
                checkbox.checked = true;
                description_span.style.textDecoration = "line-through";
                description_span.style.opacity = "0.5";
                pencil.style.display = "none";
                trash.style.marginLeft = "auto";
            } else {
                checkbox.checked = false;
            }

            trash.addEventListener("click", () => { // trash 버튼 클릭 시
                deleteList(id);
            });

            const doneButton = document.createElement("button");
            doneButton.type = "button";
            doneButton.classList.add("done-button");
            doneButton.textContent = "완료";
            doneButton.style.display = "none";
            
            pencil.addEventListener("click", () => {
                description_span.style.display = "none"; // list 숨김
                pencil.style.display = "none"; // pencil 숨김
                doneButton.style.display = "inline-block"; // button 보임
                edit.style.display = "inline-block"; // edit창 보임
                edit.focus(); // edit창에 focus
            });

            doneButton.addEventListener("click", () => {
                const newDescription = edit.value;
                editList(id, newDescription);
              });

            item.appendChild(description_span);
            item.appendChild(edit);
            item.appendChild(doneButton);
            item.appendChild(pencil);
            item.appendChild(trash);
            list.appendChild(item);
          }
      })
      .catch((error) => {
          console.error(error);
      });
})();

function updateCheckStatus(id, isCheck) {
    const req = {
      id: id,
      is_check: isCheck,
    };
  
    fetch("/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (response.ok) {
            location.reload();
        } else {
            throw new Error("Failed to update check status");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

function deleteList(id) {
    const req = {
      id: id,
    };
  
    fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          throw new Error("Failed to delete list item");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

function editList(id, newDescription) {
    const req = {
        id: id,
        newDescription: newDescription,
    };
  
    fetch("/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (response.ok) {
          location.reload();
        } else {
          throw new Error("Failed to edit list item");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}