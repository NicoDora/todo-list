"use strict";

const ListStorage = require("./ListStorage");

class Todolist {
    constructor() {
        this.storage = new ListStorage();
    }

    async getList() {
        const results = await this.storage.getList();
        const list = results.map((row) => {
            return {
                id: row.id,
                description: row.description,
                is_check: row.is_check,
            };
        });
        return await list;
    }

    async add(text) {
        const result = await this.storage.add(text);
        if(!result.affectedRows) {
            throw new Error('추가 실패');
        }
        return {massege: "add 성공!!", status: 200, resource: result};
    }

    async check(id, is_check) {
        const result = await this.storage.check(id, is_check);
        if(!result.affectedRows) {
            throw new Error('체크 실패');
        }
        return {massege: "check 성공!!", status: 200, resource: result};
    }

    async delete(id) {
        const result = await this.storage.delete(id);
        if(!result.affectedRows) {
            throw new Error('삭제 실패');
        }
        return {massege: "delete 성공!!", status: 200, resource: result};
    }

    async edit(id, newDescription) {
        const result = await this.storage.edit(id, newDescription);
        if(!result.affectedRows) {
            throw new Error('수정 실패');
        }
        return {massege: "edit 성공!!", status: 200, resource: result};
    }
}

module.exports = Todolist;