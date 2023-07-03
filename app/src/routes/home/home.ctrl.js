"use strict";

const todolist = require("../../models/todolist");

const output = {
  main: (req, res) => {
    res.render("home/list");
  },
};

const process = {
  main: async (req, res) => {
    try {
      const { text } = req.body;
      const todo = new todolist();
      const response = await todo.add(text);
      return res.json(response[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = {
  output,
  process,
};
