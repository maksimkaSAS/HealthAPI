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

		if (req.query.place_drug) {
			res.locals.place_ids = (
				await waw.Healthlink.find({
					drug: req.query.place_drug,
				}).select("place")
			)
				.filter((p) => p.place)
				.map((p) => p.place.toString());

			if (!res.locals.place_ids.length) {
				return res.json([]);
			}
		}
		next();
	};

	const querySet = (query, req, res) => {
		if (res.locals.place_ids && res.locals.place_ids.length) {
			query._id = res.locals.place_ids;
		}

		console.log("health query", req.query, query, res.locals);

		// if (req.query.healthdrug) {
		// 	query.healthdrug = req.query.healthdrug;
		// }

		if (req.query.pharmacy) {
			query.pharmacy = req.query.pharmacy;
		}

		if (req.query.clinic) {
			query.clinic = req.query.clinic;
		}

		if (req.query.drug) {
			query.drug = req.query.drug;
		}

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

	waw.crud("healthplace", crudConfig);
};
