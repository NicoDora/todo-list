"use strict";

const ListStorage = require("./ListStorage");

class Todolist {
    constructor(body) {
        this.body = body;
        this.storage = new ListStorage();
    }

    getAll() {
        return this.storage.getAll();
    }

    async add(text) {
        return await this.storage.add(text);
    }

    complete(id) {
        return this.storage.complete(id);
    }
}

module.exports = Todolist;