const { connection } = require("../db");

exports.getLevelToko = (req, res) => {
	let sql = `SELECT kelas FROM karyawan WHERE spv="${req.body.spv}" AND kelas > ${req.body.kelas} GROUP BY kelas ORDER BY kelas ASC LIMIT 2`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);

		if (result.length === 1) {
			var kelas = result[0].kelas;
			let sql = `SELECT * FROM karyawan WHERE spv="${req.body.spv}" AND kelas='${kelas}'`;
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
		} else {
			var satu = result[0].kelas;
			var dua = result[1].kelas;
			let sql = `SELECT * FROM karyawan WHERE spv="${req.body.spv}" AND kelas IN (${satu},${dua}) ORDER BY kelas ASC`;
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
		}
	});
};

exports.getLokasi = (req, res) => {
	let sql = `SELECT lokasi from karyawan WHERE spv="${req.body.spv}" GROUP BY lokasi`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};

exports.getAnggotaKepalaToko = (req, res) => {
	let sql = `SELECT * FROM karyawan WHERE lokasi="${req.body.lokasi}" AND kelas > ${req.body.kelas} `;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};

exports.getAnggotaLokasi = (req, res) => {
	let sql = `SELECT nik,name from karyawan WHERE lokasi="${req.body.lokasi}" AND spv="${req.body.spv}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};

exports.getNilaiAnggota = (req, res) => {
	let sql = `SELECT * from master_jawaban WHERE nik="${req.body.nik}" AND periode="${req.body.periode}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		if (result.length) {
			res.send(
				JSON.stringify({
					response: result,
				})
			);
		} else {
			res.send(
				JSON.stringify({
					error: true,
					response: "Data pada periode ini kosong",
				})
			);
		}
	});
};

exports.getAnggotaToko = (req, res) => {
	let sql = `SELECT nik,name FROM karyawan WHERE lokasi="${req.body.lokasi}" AND kelas > ${req.body.kelas}`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};
