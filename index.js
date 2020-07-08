const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 5000;
//parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// create database connection

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "db_kompetensi",
});

connection.connect((err) => {
	if (err) throw err;
	console.log("Database connected");
});

// app.post("/api/create", (req, res) => {
// 	let data = { name: req.body.name, location: req.body.location };
// 	let sql = "INSERT INTO users SET ?";
// 	connection.query(sql, data, (err, result) => {
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
// 	connection.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.send(JSON.stringify({ status: 200, error: null, response: result }));
// 	});
// });

// app.get("/api/view/:id", (req, res) => {
// 	let sql = `SELECT * FROM users WHERE id= ${req.params.id}`;
// 	connection.query(sql, (err, result) => {
// 		if (err) throw err;
// 		res.send(JSON.stringify({ status: 200, error: null, response: result }));
// 	});
// });

// app.put("/api/update", (req, res) => {
// 	let sql = `UPDATE users SET name='${req.body.name}', location='${req.body.location}' WHERE id=${req.body.id}`;
// 	connection.query(sql, (err, result) => {
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

app.get("/api/user/:id", (req, res) => {
	let sql = `SELECT karyawan.nik,karyawan.name as nama ,divisi.nama as divisi,jabatan.nama as jabatan, karyawan.kode_jabatan
FROM karyawan
INNER JOIN divisi ON karyawan.kode_divisi=divisi.kode_divisi
INNER JOIN jabatan ON karyawan.kode_jabatan=jabatan.kode_jabatan
WHERE nik=${req.params.id}`;
	connection.query(sql, (err, result) => {
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

app.get("/api/form/:id", (req, res) => {
	let sql = `SELECT category_kompetensi.nama, master_bobot.bobot, form_kompetensi.standard, form_kompetensi.kamus 
	FROM category_kompetensi INNER JOIN form_kompetensi ON category_kompetensi.code_category=form_kompetensi.code_category
    INNER JOIN master_bobot ON category_kompetensi.code_category=master_bobot.code_category
	WHERE category_kompetensi.kode_jabatan LIKE '%${req.params.id}%' AND master_bobot.kode_jabatan LIKE '%${req.params.id}%' `;
	connection.query(sql, (err, result) => {
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

app.post("/api/form", (req, res) => {
	let values = [req.body.values];
	let sql =
		"INSERT INTO detail_user (nik, code_category,nilai,skor, periode) VALUES ?";
	connection.query(sql, values, (err, result) => {
		if (err) throw err;
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: "New data added successfully",
			})
		);
	});
});

app.get("/api/category/:id", (req, res) => {
	let sql = `SELECT category_kompetensi.code_category,category_kompetensi.nama,master_bobot.bobot FROM category_kompetensi
INNER JOIN master_bobot ON category_kompetensi.code_category=master_bobot.code_category
WHERE category_kompetensi.kode_jabatan LIKE '%${req.params.id}%' AND master_bobot.kode_jabatan LIKE '%${req.params.id}%' `;
	connection.query(sql, (err, result) => {
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

app.listen(port, () => {
	console.log("Server is running on port : " + port);
});
