const { connection } = require("../db");

exports.login = (req, res) => {
	let sql = `SELECT * FROM karyawan WHERE nik="${req.body.nik}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: result,
			})
		);
	});
};

exports.getUser = (req, res) => {
	let sql = `SELECT karyawan.nik,karyawan.name as nama ,karyawan.kode_divisi , divisi.nama as divisi,jabatan.nama as jabatan, 
	karyawan.kode_jabatan, karyawan.level_jabatan, karyawan.kelas FROM karyawan INNER JOIN divisi ON karyawan.kode_divisi=divisi.kode_divisi
INNER JOIN jabatan ON karyawan.kode_jabatan=jabatan.kode_jabatan
WHERE nik=${req.params.id}`;
	connection.query(sql, (err, result) => {
		if (err) console.log("error : " + err);
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: result,
			})
		);
	});
};

exports.getAnggotaDivisi = (req, res) => {
	let sql = `SELECT * from karyawan WHERE kode_divisi='${req.body.divisi}' AND kelas > ${req.body.kelas}`;
	connection.query(sql, (err, result) => {
		if (err) console.log("error : " + err);
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: result,
			})
		);
	});
};

exports.getReport = (req, res) => {
	let sql = `SELECT a.name,a.level_jabatan,b.nama, c.* FROM master_jawaban c
INNER JOIN karyawan a ON c.nik=a.nik
INNER JOIN master_kompetensi b ON c.kode_kompetensi=b.kode_kompetensi
WHERE c.periode="${req.body.periode}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};

exports.getReportAnggota = (req, res) => {
	let sql = `SELECT a.* , b.nama as jabatan FROM karyawan a
INNER JOIN master_jabatan b on a.level_jabatan = b.level_jabatan
WHERE kode_divisi="${req.body.kode_divisi}" AND kelas > ${req.body.kelas}`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};
