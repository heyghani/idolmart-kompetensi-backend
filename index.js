const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
//parse application/json
app.use(bodyParser.json());
app.use(cors());

// create database connection

const connection2 = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "db_kompetensi",
});

connection2.connect((err) => {
	if (err) throw err;
	console.log("Database connected");
});

// app.post("/api/create", (req, res) => {
// 	let data = { name: req.body.name, location: req.body.location };
// 	let sql = "INSERT INTO users SET ?";
// 	connection2.query(sql, data, (err, result) => {
// 		if (err) throw err;
// 		res.send(
// 			JSON.stringify({
// 				status: 200,
// 				error: null,
// 				response: "New data added successfully",
// 			})
// 		);
// 	});
// });

// app.get("/api/view", (req, res) => {
// 	let sql = "SELECT * FROM users";
// 	connection2.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.send(JSON.stringify({ status: 200, error: null, response: result }));
// 	});
// });

// app.get("/api/view/:id", (req, res) => {
// 	let sql = `SELECT * FROM users WHERE id= ${req.params.id}`;
// 	connection2.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.send(JSON.stringify({ status: 200, error: null, response: result }));
// 	});
// });

// app.put("/api/update", (req, res) => {
// 	let sql = `UPDATE users SET name='${req.body.name}', location='${req.body.location}' WHERE id=${req.body.id}`;
// 	connection2.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.send(
// 			JSON.stringify({
// 				status: 200,
// 				error: null,
// 				response: "Data updated successfully",
// 			})
// 		);
// 	});
// });

// app.delete("/api/delete/:id", (req, res) => {
// 	let sql = `DELETE FROM users WHERE id=${req.params.id}`;
// 	connection2.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.send(
// 			JSON.stringify({
// 				status: 200,
// 				error: null,
// 				response: "Data has been deleted successfully",
// 			})
// 		);
// 	});
// });

app.get("/api/form/:id", (req, res) => {
	let sql = `SELECT category_kompetensi.nama, category_kompetensi.bobot, form_kompetensi.standard, form_kompetensi.kamus FROM category_kompetensi INNER JOIN form_kompetensi ON category_kompetensi.code_category=form_kompetensi.code_category WHERE form_kompetensi.code_category='${req.params.id}'`;
	connection2.query(sql, (err, result) => {
		if (err) throw err;
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: result,
			})
		);
	});
});

app.get("/api/category", (req, res) => {
	let sql = "SELECT * FROM category_kompetensi";
	connection2.query(sql, (err, result) => {
		if (err) throw err;
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: result,
			})
		);
	});
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
