"use strict";

const Todolist = require("../../models/todolist");

const output = {
  main: (req, res) => {
    res.render("home/list");
  },
};

const input = {
  list: async (req, res) => {
    try {
      const todo = new Todolist();
      const list = await todo.getList();
      const response = list.map((item) => `${item.id}, ${item.description}, ${item.is_check}`);
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

const process = {
  getList: async (req, res) => {
    try {
      const todo = new Todolist();
      const list = await todo.getList();
      const response = list.map((item) => `${item.id}, ${item.description}, ${item.is_check}`);
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addList: async (req, res) => {
    try {
      const { text } = req.body;
      const todo = new Todolist();
      const response = await todo.add(text);
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  checkList: async (req, res) => {
    try {
      const { id, is_check } = req.body;
      const todo = new Todolist();
      const response = await todo.check(id, is_check);
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteList: async (req, res) => {
    try {
      const { id } = req.body;
      const todo = new Todolist();
      const response = await todo.delete(id);
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  editList: (req, res) => {
    try {
      const { id, newDescription } = req.body;
      const todo = new Todolist();
      const response = todo.edit(id, newDescription);
      return res.json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
module.exports = {
  output,
  input,
  process,
};
