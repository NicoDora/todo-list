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

}

module.exports = ListStorage;