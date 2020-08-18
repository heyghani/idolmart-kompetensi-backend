const { connection } = require("../db");
const bcrypt = require("bcrypt");

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
	let sql = `SELECT a.* , b.nama as jabatan, c.nilai FROM karyawan a
INNER JOIN jabatan b on a.kode_jabatan = b.kode_jabatan
INNER JOIN master_jawaban c ON a.nik=c.nik
WHERE a.kode_divisi="${req.body.kode_divisi}" AND a.kelas > ${req.body.kelas}`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);

		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};
