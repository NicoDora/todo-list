"use strict";

// 모듈
const express = require("express");
const app = express();

// 라우팅
const main = require("./routes/home");

// 앱 세팅
app.set("views", "./views"); // views 폴더를 사용
app.set("view engine", "ejs"); // view engine을 ejs로 사용

app.use("/", main); // 미들웨어 등록

module.exports = app;