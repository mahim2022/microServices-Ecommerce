var jwt = require("jsonwebtoken");

////header key=authorization value='Bearer token'

var authMiddleware = async (req, res, next) => {
	if (req.headers["authorization"]) {
		var token = req.headers.authorization.split(" ")[1];
		jwt.verify(token, "secret", (err, user) => {
			if (err) {
				res.json({ message: "Not authenticated", error: err, token: token });
			} else {
				// req.user = user;
				next();
			}
		});
	} else {
		res.json({ message: "Not authenticated" });
	}
};

module.exports = authMiddleware;
