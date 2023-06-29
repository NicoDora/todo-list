"use strict";

// 모듈
const express = require("express");
const app = express();

// 라우팅
const main = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views"); // views 폴더를 사용
app.set("view engine", "ejs"); // view engine을 ejs로 사용
app.use(express.static(`${__dirname}/src/public`)); // 정적 파일을 사용하기 위한 폴더 지정

app.use("/", main); // 미들웨어 등록

module.exports = app;