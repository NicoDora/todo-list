const mysql = require("mysql");

const db = mysql.createConnection({
    host: "todo-list.cqjnjkpzhx9f.ap-northeast-2.rds.amazonaws.com",
    user: "nicodora",
    password: "Doraemon123$",
    database: "todo_list",
});

db.connect();

module.exports = db;