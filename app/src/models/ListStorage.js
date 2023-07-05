"use strict";

const db = require("../config/db");

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

    // list 체크박스 체크
    check(description, is_check) {
        return db.query("UPDATE lists SET is_check = ? WHERE description = ?", [is_check, description]);
    }

    // list 삭제
    delete(description) {
        return db.query("DELETE FROM lists WHERE description = ?", [description]);
    }

    // list 수정
    edit(description, newDescription) {
        return db.query("UPDATE lists SET description = ? WHERE description = ?", [newDescription, description]);
    }

}

module.exports = ListStorage;