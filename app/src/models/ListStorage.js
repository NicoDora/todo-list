"use strict";

const db = require("../config/db");

class ListStorage {

    // list 조회
    getList() {
        return new Promise((resolve, reject) => {
        db.query("SELECT id, description, is_check FROM lists", (error, results) => {
            if (error) {
                reject(error);
            }
            resolve(results);
        });
    })};

    // list 추가
    add(description) {
        db.query("INSERT INTO lists (description) VALUES (?)", [description]);
    }

    // list 체크박스 체크
    check(id, is_check) {
        return db.query("UPDATE lists SET is_check = ? WHERE id = ?", [is_check, id]);
    }

    // list 삭제
    delete(id) {
        return db.query("DELETE FROM lists WHERE id = ?", [id]);
    }

    // list 수정
    edit(id, newDescription) {
        return db.query("UPDATE lists SET description = ? WHERE id = ?", [newDescription, id]);
    }
}

module.exports = ListStorage;