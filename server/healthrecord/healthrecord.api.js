module.exports = async (waw) => {
	// add your router code

	const querySet = (query, req, res) => {
		if (req.query.patient) {
			query.patient = req.query.patient;
		}

		if (req.query.disease) {
			query.disease = req.query.disease;
		}
		console.log("Record query: ", req.query, query);
	};

	const crudConfig = {
		get: [
			{
				ensure: waw.next,
				query: (req, res) => {
					const query = {
						moderators: req.user._id,
					};

					querySet(query, req);

					return query;
				},
			},
		],
	};

	waw.crud("healthrecord", crudConfig);
};
