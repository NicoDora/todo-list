"use strict";

const Todolist = require("../../models/todolist");

const output = {
  main: (req, res) => {
    res.render("home/list");
  },
};

const input = {
  main: async (req, res) => {
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
  main: (req, res) => {
    try {
      const { text } = req.body;
      const todo = new Todolist();
      const response = todo.add(text);
      return res.json(response[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

const check = {
  main: (req, res) => {
    try {
      const { id, is_check } = req.body;
      const todo = new Todolist();
      const response = todo.check(id, is_check);
      return res.json(response[1]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const remove = {
  main: (req, res) => {
    try {
      const { id } = req.body;
      const todo = new Todolist();
      const response = todo.delete(id);
      return res.json(response[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

const edit = {
  main: (req, res) => {
    try {
      const { id, newDescription } = req.body;
      const todo = new Todolist();
      const response = todo.edit(id, newDescription);
      return res.json(response[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = {
  output,
  input,
  process,
  check,
  remove,
  edit,
};
