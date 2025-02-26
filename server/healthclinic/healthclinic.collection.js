module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		phone: String,
		email: String,
		website: String,
		workingHours: String,
		licenseNumber: String,
		specialties: String,
		clinicType: String,
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

		this.phone = obj.phone;

		this.email = obj.email;

		this.website = obj.website;

		this.workingHours = obj.workingHours;

		this.licenseNumber = obj.licenseNumber;

		this.specialties = obj.specialties;

		this.clinicType = obj.clinicType;
	};
	return (waw.Healthclinic = waw.mongoose.model("Healthclinic", Schema));
};
