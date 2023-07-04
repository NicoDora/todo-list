"use strict";

const express = require("express");
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
                description: row.description,
                is_check: row.is_check,
            };
        });
        return await list;
    }

    add(text) {
        return this.storage.add(text);
    }

}

module.exports = Todolist;