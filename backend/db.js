const mongoose = require("mongoose");

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'slushie-admin',
	};
	try {
		mongoose.connect(process.env.DB, connectionParams); // database ki value kya h jaise atlas local pr h konsa database connected
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};


