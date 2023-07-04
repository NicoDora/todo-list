"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.main);
router.post("/", ctrl.process.main);

router.get("/getlist", ctrl.input.main);
router.post("/getlist", ctrl.input.main);

module.exports = router;