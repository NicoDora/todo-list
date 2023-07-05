"use strict";

const ListStorage = require("./ListStorage");

class Todolist {
    constructor(body) {
        this.body = body;
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

    add(text) {
        return this.storage.add(text);
    }

    check(id, is_check) {
        return this.storage.check(id, is_check);
    }

    delete(id) {
        return this.storage.delete(id);
    }

    edit(id, newDescription) {
        return this.storage.edit(id, newDescription);
    }

}

module.exports = Todolist;