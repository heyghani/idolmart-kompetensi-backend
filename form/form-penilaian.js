const { connection } = require("../db");

exports.getValidationForm = (req, res) => {
	let sql = `SELECT * FROM master_jawaban WHERE nik='${req.body.nik}' AND periode='${req.body.periode}'`;
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

exports.getAssignmentAtasan = (req, res) => {
	let sql = `SELECT kelas FROM master_jawaban WHERE nik='${req.body.nik}' AND periode='${req.body.periode}'`;
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

exports.getForm = (req, res) => {
	let sql = `SELECT master_kompetensi.nama, master_bobot.bobot, form_kompetensi.standard, form_kompetensi.kamus 
	FROM master_kompetensi INNER JOIN form_kompetensi ON master_kompetensi.kode_kompetensi=form_kompetensi.kode_kompetensi
    INNER JOIN master_bobot ON master_kompetensi.kode_kompetensi=master_bobot.kode_kompetensi
	WHERE master_kompetensi.level_jabatan LIKE '%${req.params.id}%' AND master_bobot.level_jabatan LIKE '%${req.params.id}%' `;
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

exports.getAnggota = (req, res) => {
	let sql = `SELECT a.* , b.nama as kompetensi FROM master_jawaban a INNER JOIN master_kompetensi b ON a.kode_kompetensi=b.kode_kompetensi
	WHERE nik='${req.body.nik}' AND periode='${req.body.periode}'`;
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

exports.postForm = (req, res) => {
	let values = [req.body.values];
	if (req.body.periode === "")
		res.send(
			JSON.stringify({ error: true, response: "Periode tidak boleh kosong" })
		);
	else {
		let sql = `SELECT * FROM master_jawaban WHERE nik="${req.body.nik}" AND periode="${req.body.periode}"`;
		connection.query(sql, (err, result) => {
			if (err) console.log(err);
			if (result.length > 0) {
				let sql = `DELETE FROM master_jawaban WHERE nik='${req.body.nik}' AND periode='${req.body.periode}'`;
				connection.query(sql, (err, result) => {
					if (err) console.log(err);

					let sql = `INSERT INTO master_jawaban 
				(nik, kode_kompetensi,bobot,nilai,skor,jumlah,rekap,keterangan,nilai_atasan,skor_atasan,jumlah_atasan,rekap_atasan,periode,kelas) 
				VALUES ?`;
					connection.query(sql, values, (err, result) => {
						if (err) console.log("error : " + err);
						res.send(
							JSON.stringify({
								status: 200,
								error: null,
								response: "Data berhasil di update",
							})
						);
					});
				});
			} else {
				let sql = `INSERT INTO master_jawaban 
		(nik, kode_kompetensi,bobot,nilai,skor,jumlah,rekap,keterangan,nilai_atasan,skor_atasan,jumlah_atasan,rekap_atasan,periode,kelas) 
		VALUES ?`;
				connection.query(sql, values, (err, result) => {
					if (err) console.log("error : " + err);
					res.send(
						JSON.stringify({
							status: 200,
							error: null,
							response: "Data telah ditambahkan",
						})
					);
				});
			}
		});
	}
};

exports.updateForm = (req, res) => {
	let values = [req.body.values];
	let sql = `DELETE FROM master_jawaban WHERE nik='${req.body.nik}' AND periode='${req.body.periode}'`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);

		let sql = `INSERT INTO master_jawaban 
		(nik, kode_kompetensi,bobot,nilai,skor,jumlah,rekap,keterangan,
		keterangan_atasan,nilai_atasan,skor_atasan,jumlah_atasan,rekap_atasan,periode,kelas) 
		VALUES ?`;
		connection.query(sql, values, (err, result) => {
			if (err) console.log("error : " + err);
			console.log(values);
			res.send(
				JSON.stringify({
					status: 200,
					error: null,
					response: "Data telah di update",
				})
			);
		});
	});
};

exports.getAllCategory = (req, res) => {
	let sql = "SELECT * FROM master_kompetensi";
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};

exports.getCategory = (req, res) => {
	let sql = `SELECT master_kompetensi.kode_kompetensi,master_kompetensi.nama,master_bobot.bobot FROM master_kompetensi
INNER JOIN master_bobot ON master_kompetensi.kode_kompetensi=master_bobot.kode_kompetensi
WHERE master_kompetensi.level_jabatan LIKE '%${req.params.id}%' AND master_bobot.level_jabatan LIKE '%${req.params.id}%' `;
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

exports.getNilai = (req, res) => {
	let sql = `SELECT * FROM master_jawaban WHERE nik='${req.body.nik}' AND periode='${req.body.periode}'`;
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

exports.getRekap = (req, res) => {
	let sql = `SELECT jumlah,rekap FROM master_jawaban WHERE nik='${req.body.nik}' AND periode='${req.body.periode}'`;
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
