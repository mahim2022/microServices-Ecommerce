var User = require("../schema/auth");
var jwt = require("jsonwebtoken");

var register = async (req, res) => {
	var { email, password } = req.body;
	if (await User.findOne({ email })) res.json({ message: "User exits" });
	else {
		try {
			await (await User.create({ email, password })).save();
			res.json({ message: `Account with email ${email} registered` });
		} catch (error) {
			res.status(400).json({ message: "Something went wrong try again later" });
			console.log(error);
		}
	}
};
var login = async (req, res) => {
	var { email, password } = req?.body;
	var getUser = await User.findOne({ email });
	if (!getUser) res.status(400).json({ message: "No account by this email" });
	else {
		if (getUser.password !== password)
			res.status(400).json({ message: "Wrong password" });
		var payload = { created_at: getUser.created_at, email: getUser.email };
		res.status(200).send(jwt.sign(payload, "secret"));
	}
};
module.exports = { register, login };
