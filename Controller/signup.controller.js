const {
  createsignupService,
  getSignupService,
  patchSignupServiceById,
  deleteSignupServiceById,
} = require("../Services/signup.service");

exports.createSignup = async (req, res, next) => {
  try {
    const result = await createsignupService(req.body);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't insert",
      error: error.message,
    });
  }
};

exports.getSignup = async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const result = await getSignupService(userId);
    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't get",
      error: error.message,
    });
  }
};

exports.patchsignupById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await patchSignupServiceById(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't get",
      error: error.message,
    });
  }
};

exports.deletesignupById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSignupServiceById(id, req.body);
    res.status(200).json({
      status: "success",
      message: "Data get successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data couldn't get",
      error: error.message,
    });
  }
};
