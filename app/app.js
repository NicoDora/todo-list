"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const { bringList } = require("./src/models/ListStorage");


// 라우팅
const main = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views"); // views 폴더를 사용
app.set("view engine", "ejs"); // view engine을 ejs로 사용

app.use(express.static(`${__dirname}/src/public`)); // 정적 파일을 사용하기 위한 폴더 지정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", main); // 미들웨어 등록

app.get("/", (req, res) => {
    res.render("home/index");
});

app.use((req, res, next) => {
    bringList();
    next();
});

module.exports = app;