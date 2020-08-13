const { connection } = require("../db");

exports.getBobot = (req, res) => {
	let sql = `SELECT a.nama, b.bobot FROM master_kompetensi a
INNER JOIN master_bobot b ON a.kode_kompetensi=b.kode_kompetensi
WHERE b.level_jabatan LIKE '%${req.body.level_jabatan}%'`;
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

exports.filterByKompetensi = (req, res) => {
	let sql = `SELECT * FROM master_bobot WHERE kode_kompetensi="${req.body.kode_kompetensi}"`;
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
