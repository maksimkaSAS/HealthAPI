module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		patient: String,
		disease: String,
		type: String,
		diagnosis: String,
		allergy: String,
		result: String,
		treatmentType: String,

		url: { type: String, sparse: true, trim: true, unique: true },
		data: {},
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		moderators: [
			{
				type: waw.mongoose.Schema.Types.ObjectId,
				sparse: true,
				ref: "User",
			},
		],
	});

	Schema.methods.create = function (obj, user, waw) {
		this.author = user._id;

		this.moderators = [user._id];

		this.name = obj.name;

		this.description = obj.description;

		this.data = obj.data;

		this.url = obj.url;

		this.patient = obj.patient;

		this.disease = obj.disease;

		this.type = obj.type;

		this.diagnosis = obj.diagnosis;

		this.allergy = obj.allergy;

		this.result = obj.result;

		this.treatmentType = obj.treatmentType;
	};
	return (waw.Healthrecord = waw.mongoose.model("Healthrecord", Schema));
};
