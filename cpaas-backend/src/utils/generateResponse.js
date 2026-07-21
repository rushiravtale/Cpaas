// method to generate a simple response template

const generateResponse = (r, s, statusMessage, message, rid, data) => {
	r.statusMessage = statusMessage;
	return r.status(s).send({
		message: message,
		rid: rid,
		data: data,
	});
};

module.exports.generateResponse = generateResponse;
