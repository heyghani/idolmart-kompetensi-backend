const { connection } = require("../db");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { result } = require("lodash");

exports.signup = async (req, res) => {
	const { password, confirmPassword, nik } = req.body;

	if (password === confirmPassword) {
		const hash = await bcrypt.hash(password, 10);
		let sql = `UPDATE karyawan set password="${hash}" WHERE nik="${nik}"`;
		connection.query(sql, (err, result) => {
			if (err) console.log(err);
			let sql = `SELECT * FROM karyawan WHERE nik="${nik}"`;
			connection.query(sql, (err, result) => {
				res.send(
					JSON.stringify({
						result,
						response: "Password berhasil ditambahkan",
					})
				);
			});
		});
	}
};

exports.login = (req, res) => {
	let sql = `SELECT * FROM karyawan WHERE nik="${req.body.nik}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);

		const confirm = result[0].password;

		if (confirm === "") {
			res.send(
				JSON.stringify({
					code: 500,
					error: true,
					response:
						"Password anda kosong. Silahkan isi password anda terlebih dahulu",
				})
			);
		} else {
			try {
				bcrypt.compare(req.body.password, confirm, (err, hash) => {
					if (hash) {
						res.send(
							JSON.stringify({
								status: 200,
								error: null,
								response: result,
							})
						);
					} else {
						res.send(
							JSON.stringify({
								code: 400,
								error: true,
								response: "Password anda tidak cocok",
							})
						);
					}
				});
			} catch (error) {
				res.status(500).send();
			}
		}
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
	let sql = `SELECT a.nik,a.name as nama, b.nama as jabatan,c.kode_kompetensi,c.nilai FROM karyawan a
INNER JOIN jabatan b ON a.kode_jabatan=b.kode_jabatan
INNER JOIN master_jawaban c ON a.nik=c.nik
WHERE a.kode_divisi="${req.body.kode_divisi}" AND c.periode="${req.body.periode}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		const data = [];

		_.forEach(result, (item, index) => {
			var existing = data.filter((value, i) => {
				return value.nik === item.nik;
			});

			if (existing.length) {
				var existingIndex = data.indexOf(existing[0]);

				data[existingIndex].nilai.push({
					kode_kompetensi: item.kode_kompetensi,
					nilai: item.nilai,
				});
			} else {
				data.push({
					nik: item.nik,
					nama: item.nama,
					jabatan: item.jabatan,
					nilai: [
						{
							kode_kompetensi: item.kode_kompetensi,
							nilai: item.nilai,
						},
					],
				});
			}
		});

		res.send(
			JSON.stringify({
				response: data,
			})
		);
	});
};

exports.getReportAnggota = (req, res) => {
	let sql = `SELECT a.nik,a.name,b.nama as jabatan FROM karyawan a
	INNER JOIN jabatan b ON a.kode_jabatan=b.kode_jabatan
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

exports.testing = (req, res) => {
	let sql = "SELECT nik,kode_kompetensi,nilai FROM master_jawaban";
	connection.query(sql, (err, result) => {
		res.send(result);
	});
};
