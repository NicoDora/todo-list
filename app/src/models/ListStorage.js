"use strict";

const db = require("../config/db");

class ListStorage {
    // list 목록 조회
    getAll() {
        return db.query("SELECT * FROM lists");
    }

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