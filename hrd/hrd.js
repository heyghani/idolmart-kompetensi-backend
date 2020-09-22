const { connection } = require("../db");

exports.getDepartment = (req, res) => {
	let sql = "SELECT * FROM divisi";
	connection.query(sql, (err, result) => {
		if (err) console.log(err);

		res.send(
			JSON.stringify({
				response: result,
			})
		);
	});
};
