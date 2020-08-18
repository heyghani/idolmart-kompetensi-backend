const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const {
	getForm,
	postForm,
	updateForm,
	getCategory,
	getNilai,
	getRekap,
	getAnggota,
	getValidationForm,
	getAssignmentAtasan,
	getAllCategory,
} = require("./form/form-penilaian");

const {
	getUser,
	getAnggotaDivisi,
	login,
	signup,
	getReport,
	getReportAnggota,
} = require("./users/Users");

const {
	getJabatan,
	getKompetensi,
	submitForm,
	getTableKomepetensi,
	updateRoles,
	updateKompetensi,
	delKompetensi,
	addKompetensi,
	getEditKompetensi,
} = require("./roles/roles");

const { getBobot, filterByKompetensi } = require("./bobot/bobot");

app.post("/api/login", login);
app.post("/api/signup", signup);
app.get("/api/user/:id", getUser);
app.post("/api/divisi", getAnggotaDivisi);

app.post("/api/validation", getValidationForm);
app.post("/api/assignment", getAssignmentAtasan);
app.get("/api/form/:id", getForm);
app.post("/api/form", postForm);
app.post("/api/update", updateForm);
app.get("/api/category/all", getAllCategory);
app.get("/api/category/:id", getCategory);
app.post("/api/nilai", getNilai);
app.post("/api/rekap", getRekap);
app.post("/api/anggota", getAnggota);

app.get("/api/jabatan", getJabatan);
app.get("/api/table", getTableKomepetensi);
app.delete("/api/roles", updateRoles);
app.post("/api/kompetensi/submit", submitForm);
app.get("/api/kompetensi/get", getKompetensi);
app.get("/api/kompetensi/:id", getEditKompetensi);
app.post("/api/kompetensi/add", addKompetensi);
app.put("/api/kompetensi/update", updateKompetensi);
app.delete("/api/kompetensi/delete", delKompetensi);

app.post("/api/filter/bobot", getBobot);
app.post("/api/filter/kompetensi", filterByKompetensi);

app.post("/api/report/get", getReport);
app.post("/api/report/anggota", getReportAnggota);

app.listen(port, () => {
	console.log("Server is running on port : " + port);
});
