module.exports = async (waw) => {
	// add your router code
	const addIds = async (req, res, next) => {
		// const place_drug = [];
		// if (req.query.place_drug) {
		// 	place_drug.push(
		// 		...(
		// 			await waw.Healthlink.find({
		// 				drug: req.query.place_drug,
		// 			}).select("healthplace")
		// 		)
		// 			.filter((p) => p.healthplace)
		// 			.map((p) => p.healthplace.toString())
		// 	);
		// }
		// if (!res.locals.healthplace_ids.length) {
		// 	return res.json([]);
		// }
		// next();

		if (req.query.pharmacy_drug) {
			res.locals.pharmacy_ids = (
				await waw.Healthlink.find({
					drug: req.query.pharmacy_drug,
				}).select("pharmacy")
			)
				.filter((p) => p.pharmacy)
				.map((p) => p.pharmacy.toString());

			if (!res.locals.pharmacy_ids.length) {
				return res.json([]);
			}
		}
		next();
	};

	const querySet = (query, req, res) => {
		if (res.locals.pharmacy_ids && res.locals.pharmacy_ids.length) {
			query._id = res.locals.pharmacy_ids;
		}

		console.log("health query", req.query, query, res.locals);

		// if (req.query.healthdrug) {
		// 	query.healthdrug = req.query.healthdrug;
		// }

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
				ensure: addIds,
				query: (req, res) => {
					const query = {
						moderators: req.user._id,
					};

					querySet(query, req, res);

					return query;
				},
			},
			{
				name: "public",
				ensure: addIds,
				query: (req, res) => {
					const query = {};

					querySet(query, req, res);

					return query;
				},
			},
		],
	};

	waw.crud("healthpharmacy", crudConfig);
};
