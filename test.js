const arr = [
	{
		nik: 1,
		nama: "joko",
		nilai: 10,
	},
	{
		nik: 1,
		nama: "joko",
		nilai: 5,
	},
	{
		nik: 2,
		nama: "samuel",
		nilai: 2,
	},
	{
		nik: 1,
		nama: "joko",
		nilai: 7,
	},
	{
		nik: 2,
		nama: "samuel",
		nilai: 5,
	},
	{
		nik: 2,
		nama: "samuel",
		nilai: 9,
	},
];

var output = [];

arr.forEach((item, index) => {
	var existing = output.filter(function (v, i) {
		return v.nik === item.nik;
	});

	if (existing.length) {
		var existingIndex = output.indexOf(existing[0]);

		output[existingIndex].nilai.push(item.nilai);
	} else {
		output.push({
			nik: item.nik,
			nama: item.nama,
			nilai: [item.nilai],
		});
	}
});

console.log(output);
