module.exports = async (waw) => {
	// add your router code

	const querySet = (query, req, res) => {
		if (req.query.search) {
			query["$or"] = [
				{ name: { $regex: req.query.search, $options: "i" } },
				{ phone: { $regex: req.query.search, $options: "i" } },
				{
					description: {
						$regex: req.query.search,
						$options: "i",
					},
				},
			];
		}
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
			{
				name: "public",
				ensure: waw.next,
				query: (req, res) => {
					const query = {};

					querySet(query, req);

					return query;
				},
			},
		],
	};

	waw.crud("healthclinic", crudConfig);
};
