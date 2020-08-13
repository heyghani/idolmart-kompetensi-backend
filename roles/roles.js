const { connection } = require("../db");

exports.getJabatan = (req, res) => {
	let sql = `SELECT * FROM master_jabatan`;
	connection.query(sql, (err, result) => {
		if (err) console.log("Error : " + err);
		const data = result;
		const response = [];
		data.forEach((data) => {
			let checked = false;
			response.push({ data, checked });
		});
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response,
			})
		);
	});
};

exports.getTableKomepetensi = (req, res) => {
	let sql = `SELECT * FROM master_kompetensi WHERE nama_jabatan NOT IN ("")`;
	connection.query(sql, (err, result) => {
		if (err) console.log("Error : " + err);
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: result,
			})
		);
	});
};

exports.addKompetensi = (req, res) => {
	let sql = `INSERT INTO master_kompetensi (kode_kompetensi,nama) 
	VALUES ("${req.body.kode_kompetensi}","${req.body.nama}")`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: "Data berhasil ditambahkan",
			})
		);
	});
};

exports.delKompetensi = (req, res) => {
	let sql = `DELETE FROM master_kompetensi WHERE id="${req.body.id}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: "Data berhasil dihapus",
			})
		);
	});
};

exports.updateKompetensi = (req, res) => {
	let sql = `UPDATE master_kompetensi SET nama="${req.body.nama}",kode_kompetensi="${req.body.kode_kompetensi}"  
	WHERE id="${req.body.id}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: "Data berhasil diupdate",
			})
		);
	});
};

exports.getKompetensi = (req, res) => {
	let sql = `SELECT * FROM master_kompetensi ORDER BY master_kompetensi.id ASC`;
	connection.query(sql, (err, result) => {
		if (err) console.log("Error : " + err);
		res.send(
			JSON.stringify({
				status: 200,
				error: null,
				response: result,
			})
		);
	});
};

exports.getEditKompetensi = (req, res) => {
	let sql = `SELECT * FROM master_kompetensi WHERE id="${req.params.id}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);
		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};

exports.updateRoles = (req, res) => {
	let sql = `DELETE FROM master_bobot WHERE kode_kompetensi="${req.body.kode_kompetensi}"`;
	connection.query(sql, (err, result) => {
		if (err) console.log(err);

		let sql = `UPDATE master_kompetensi SET level_jabatan="", nama_jabatan="" WHERE kode_kompetensi="${req.body.kode_kompetensi}"`;
		connection.query(sql, (err, result) => {
			if (err) console.log(err);
			res.send(
				JSON.stringify({
					response: "Data berhasil dihapus",
				})
			);
		});
	});
};

exports.submitForm = (req, res) => {
	let sql = `SELECT * FROM master_kompetensi WHERE level_jabatan LIKE "%${req.body.level_jabatan}%" AND kode_kompetensi="${req.body.kode_kompetensi}"`;
	connection.query(sql, (err, result) => {
		if (err)
			res.send(
				JSON.stringify({
					error: true,
					response: "Data tidak boleh kosong",
				})
			);

		if (result.length > 0) {
			res.send(
				JSON.stringify({
					error: true,
					response: "Tidak dapat menambahkan/duplicate data.",
				})
			);
		} else {
			let sql = `SELECT * FROM master_kompetensi WHERE kode_kompetensi="${req.body.kode_kompetensi}"`;
			connection.query(sql, (err, result) => {
				if (err)
					res.send(
						JSON.stringify({
							error: true,
							response: "Data tidak boleh kosong",
						})
					);
				const level = result[0].level_jabatan;
				const jabatan = result[0].nama_jabatan;

				let sql = `INSERT INTO master_bobot (kode_kompetensi,bobot,level_jabatan,nama_jabatan) 
			VALUES("${req.body.kode_kompetensi}","${req.body.bobot}","${req.body.level_jabatan}","${req.body.jabatan}")`;
				connection.query(sql, (err, result) => {
					if (err)
						res.send(
							JSON.stringify({
								error: true,
								response: "Data tidak boleh kosong",
							})
						);

					if (level === "" || jabatan === "") {
						let sql = `UPDATE master_kompetensi SET level_jabatan="${req.body.level_jabatan}", nama_jabatan="${req.body.jabatan}" WHERE kode_kompetensi="${req.body.kode_kompetensi}"`;
						connection.query(sql, (err, result) => {
							res.send(
								JSON.stringify({
									response: "Data telah ditambahkan",
								})
							);
						});
					} else {
						let sql = `UPDATE master_kompetensi SET level_jabatan="${
							level + "," + req.body.level_jabatan
						}", nama_jabatan="${
							jabatan + "," + req.body.jabatan
						}" WHERE kode_kompetensi="${req.body.kode_kompetensi}"`;
						connection.query(sql, (err, result) => {
							res.send(
								JSON.stringify({
									response: "Data telah ditambahkan",
								})
							);
						});
					}
				});
			});
		}
	});
};
