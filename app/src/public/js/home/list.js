"use strict";

const text = document.querySelector("#text"),
    addBtn = document.querySelector("#button");

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