module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		address: String,
		phone: String,
		email: String,
		workingHours: String,
		website: String,
		availableMedicines: String,
		deliveryAvailable: String,
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

		this.address = obj.address;
		this.phone = obj.phone;
		this.email = obj.email;
		this.workingHours = obj.workingHours;
		this.website = obj.website;
		this.availableMedicines = obj.availableMedicines;
		this.deliveryAvailable = obj.deliveryAvailable;
	};
	return (waw.Healthpharmacy = waw.mongoose.model("Healthpharmacy", Schema));
};
