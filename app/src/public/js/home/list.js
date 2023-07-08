"use strict";

const text = document.querySelector("#text"),
    addBtn = document.querySelector("#button"),
    list = document.querySelector("#list");

let isItemAdded = false; // 리스트가 추가되었는지 확인하는 변수

addBtn.addEventListener("click", () => {
  addList();
  getList();
});

text.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && !isItemAdded) { // Enter
      addList();
      getList();
    }
});

function getList() {
  fetch("/lists", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("리스트 조회 실패");
      }
      return response.json();
    })
    .then((data) => {
      list.innerHTML = ""; // 기존 리스트 삭제

      for (let i = 0; i < data.length; i++) {
        const item = document.createElement("p"); // <p></p>
        item.classList.add("item"); // <p class="item"></p>
        item.style.wordBreak = "break-all"; // <p class="item" style="word-break: break-all;"></p> 자동 줄바꿈
        const trash = document.createElement("i"); // <i></i>
        trash.classList.add("fa-solid", "fa-trash"); // <i class="fa-solid fa-trash"></i>
        const pencil = document.createElement("i"); // <i></i>
        pencil.classList.add("fa-solid", "fa-pen"); // <i class="fa-solid fa-pen"></i>

        const listSplit = data[i].split(", "),
          id = listSplit[0],
          description = listSplit[1],
          is_check = listSplit[2];

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.zoom = "1.3";

        console.log(`id:"${id}", description:"${description}", is_check:"${is_check}"`);

        item.appendChild(checkbox);

        const description_span = document.createElement("span");
        description_span.classList.add("description");
        description_span.innerHTML = description; // description

        const edit = document.createElement("input");
        edit.classList.add("edit-input");
        edit.value = description; // description
        edit.style.display = "none"; // 숨김

        if (is_check === "1") {
          checkbox.checked = true;
          description_span.style.textDecoration = "line-through";
          description_span.style.opacity = "0.5";
          pencil.style.display = "none";
          trash.style.marginLeft = "auto";
        } else {
          checkbox.checked = false;
          description_span.style.textDecoration = "none";
          description_span.style.opacity = "1";
          pencil.style.display = "inline-block";
          trash.style.marginLeft = "0";
        }

        checkbox.addEventListener("change", () => { // 체크박스 체크 시
          // 체크박스 체크 여부에 따라 리스트 스타일 변경
          const isCheck = checkbox.checked ? 1 : 0;
          if (isCheck === 1) {
            description_span.style.textDecoration = "line-through";
            description_span.style.opacity = "0.5";
            pencil.style.display = "none";
            trash.style.marginLeft = "auto";
          } else {
            description_span.style.textDecoration = "none";
            description_span.style.opacity = "1";
            pencil.style.display = "inline-block";
            trash.style.marginLeft = "0";
          }
          // DB에서 리스트 체크박스 체크
          updateCheckStatus(id, isCheck);
        });


        trash.addEventListener("click", () => {
          item.remove();
          deleteList(id);
        });

        const doneButton = document.createElement("button");
        doneButton.type = "button";
        doneButton.classList.add("done-button");
        doneButton.textContent = "완료";
        doneButton.style.display = "none";

        pencil.addEventListener("click", () => {
          description_span.style.display = "none";
          pencil.style.display = "none";
          doneButton.style.display = "inline-block";
          edit.style.display = "inline-block";
          edit.focus();
        });

        edit.addEventListener("keyup", function (event) {
          if (event.keyCode === 13) {
            const newDescription = edit.value;
            description_span.style.display = "inline-block";
            description_span.innerHTML = newDescription;
            pencil.style.display = "inline-block";
            doneButton.style.display = "none";
            edit.style.display = "none";
            editList(id, newDescription);
          }
        });

        doneButton.addEventListener("click", () => {
          const newDescription = edit.value;
          description_span.style.display = "inline-block";
          description_span.innerHTML = newDescription;
          pencil.style.display = "inline-block";
          doneButton.style.display = "none";
          edit.style.display = "none";
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
}


function addList() {
    const req = {
        text: text.value,
    };

    if (text.value === "") {
      return alert("리스트를 입력해주세요.");
    }

    isItemAdded = true; // 리스트 추가됨

    fetch("/lists", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
      .then((response) => {
        if (response.ok) {
          text.value = ""; // 입력창 초기화
          text.blur(); // 입력창 focus 해제
          isItemAdded = false;
        } else {
          throw new Error("리스트 추가 실패");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}

(function bringList() {
  fetch("/lists", {
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
            
            const listSplit = data[i].split(", "),
                id = listSplit[0],
                description = listSplit[1],
                is_check = listSplit[2];

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.style.zoom = "1.3";

            console.log(`id:"${id}", description:"${description}", is_check:"${is_check}"`);

            item.appendChild(checkbox);

            const description_span = document.createElement("span");
            description_span.classList.add("description");
            description_span.innerHTML = description; // description

            const edit = document.createElement("input");
            edit.classList.add("edit-input");
            edit.value = description; // description
            edit.style.display = "none"; // 숨김

            if (is_check === "1") { // 체크박스 체크 시
              checkbox.checked = true;
              description_span.style.textDecoration = "line-through";
              description_span.style.opacity = "0.5";
              pencil.style.display = "none";
              trash.style.marginLeft = "auto";
            } else {
              checkbox.checked = false;
              description_span.style.textDecoration = "none";
              description_span.style.opacity = "1";
              pencil.style.display = "inline-block";
              trash.style.marginLeft = "0";
            }

          checkbox.addEventListener("change", () => { // 체크박스 체크 시
            // 체크박스 체크 여부에 따라 리스트 스타일 변경
            const isCheck = checkbox.checked ? 1 : 0;
            if (isCheck === 1) {
              description_span.style.textDecoration = "line-through";
              description_span.style.opacity = "0.5";
              pencil.style.display = "none";
              trash.style.marginLeft = "auto";
            } else {
              description_span.style.textDecoration = "none";
              description_span.style.opacity = "1";
              pencil.style.display = "inline-block";
              trash.style.marginLeft = "0";
            }
            // DB에서 리스트 체크박스 체크
            updateCheckStatus(id, isCheck);
          });

            trash.addEventListener("click", () => { // trash 버튼 클릭 시
                // 화면에서 리스트 삭제
                item.remove();
                // DB에서 리스트 삭제
                deleteList(id);
            });

            const doneButton = document.createElement("button");
            doneButton.type = "button";
            doneButton.classList.add("done-button");
            doneButton.textContent = "완료";
            doneButton.style.display = "none";
            
            pencil.addEventListener("click", () => { // pencil 버튼 클릭 시
                description_span.style.display = "none"; // list 숨김
                pencil.style.display = "none"; // pencil 숨김
                doneButton.style.display = "inline-block"; // button 보임
                edit.style.display = "inline-block"; // edit창 보임
                edit.focus(); // edit창에 focus
            });

            edit.addEventListener("keyup", function (event) { // edit창에서 Enter 입력 시
                if (event.keyCode === 13) { // Enter
                    const newDescription = edit.value;
                    // 화면에서 리스트 수정
                    description_span.style.display = "inline-block";
                    description_span.innerHTML = newDescription;
                    pencil.style.display = "inline-block";
                    doneButton.style.display = "none";
                    edit.style.display = "none";
                    // DB에서 리스트 수정
                    editList(id, newDescription);
                }
            })

            doneButton.addEventListener("click", () => { // 완료 버튼 클릭 시
                const newDescription = edit.value;
                // 화면에서 리스트 수정
                description_span.style.display = "inline-block";
                description_span.innerHTML = newDescription;
                pencil.style.display = "inline-block";
                doneButton.style.display = "none";
                edit.style.display = "none";
                // DB에서 리스트 수정
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
  
    fetch("/lists", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error("체크박스 상태 변경 실패");
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
  
    fetch("/lists", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("리스트 삭제 실패");
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

    if (newDescription === "") {
        return alert("리스트를 입력해주세요.");
    }

    fetch("/lists/text", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit list item");
        }
      })
      .catch((error) => {
        console.error(error);
      });
}