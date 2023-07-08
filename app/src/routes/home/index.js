"use strict";

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.main); // 메인 페이지
router.get("/lists", ctrl.input.list); // 리스트 조회

router.post("/lists", ctrl.process.addList); // 리스트 추가
router.patch("/lists", ctrl.process.checkList); // 리스트 체크박스 체크
router.delete("/lists", ctrl.process.deleteList); // 리스트 삭제
router.patch("/lists/text", ctrl.process.editList); // 리스트 수정


module.exports = router;