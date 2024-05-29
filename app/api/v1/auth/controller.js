const { StatusCodes } = require("http-status-codes");
const { signInService } = require("../../../services/mongoose/auth");

const signin = async (req, res, next) => {
  try {
    const result = await signInService(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    signin,
};
