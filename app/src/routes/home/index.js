"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.main);
router.post("/", ctrl.process.main);

router.get("/getlist", ctrl.input.main);
router.post("/getlist", ctrl.input.main);

router.post("/check", ctrl.check.main);

router.post("/delete", ctrl.remove.main);
// router.get("/delete", ctrl.remove.main);

module.exports = router;