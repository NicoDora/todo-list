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
    add(text) {
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO lists (description) VALUES (?)", [text], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    // list 체크박스 체크
    check(id, is_check) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE lists SET is_check = ? WHERE id = ?", [is_check, id], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    // list 삭제
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM lists WHERE id = ?", [id], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    // list 수정
    edit(id, newDescription) {
        return new Promise((resolve, reject) => {
            db.query("UPDATE lists SET description = ? WHERE id = ?", [newDescription, id], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    }
}

module.exports = ListStorage;