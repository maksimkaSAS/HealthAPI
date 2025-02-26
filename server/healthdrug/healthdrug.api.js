module.exports = async (waw) => {
	// add your router code

	const querySet = (query, req, res) => {
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

	waw.crud("healthdrug", crudConfig);
};
