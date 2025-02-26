module.exports = async (waw) => {
	// add your router code

	const querySet = (query, req, res) => {
		if (req.query.clinic) {
			query.clinic = req.query.clinic;
		}

		if (req.query.pharmacy) {
			query.pharmacy = req.query.pharmacy;
		}

		if (req.query.place) {
			query.place = req.query.place;
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

	waw.crud("healthcomment", crudConfig);
};
