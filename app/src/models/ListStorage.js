"use strict";

const db = require("../config/db");

// db의 description 조회
// db.query("SELECT description, is_check FROM lists", (error, results) => {
//     if (error) {
//         console.error(error);
//         return;
//     }

//     console.log("Descriptions and is_check values:");
//     results.forEach((row) => {
//         console.log(`${row.description}, ${row.is_check}`);
//     });
// });

class ListStorage {

    // list 조회
    getList() {
        return new Promise((resolve, reject) => {
        db.query("SELECT description, is_check FROM lists", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    })};

    // list 추가
    add(description) {
        return db.query("INSERT INTO lists (description) VALUES (?)", [description]);
    }

    // list 완료 처리
    complete(id) {
        return db.query("UPDATE lists SET completed = true WHERE id = ?", [id]);
    }

}

module.exports = ListStorage;