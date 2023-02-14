const {
  createCommonService,
  getCommonService,
  patchCommonByIdService,
  deleteCommonService,
  getCommonServiceById,
} = require("../../Services/LinksService/Common.service");

exports.createCommon = async (req, res, next) => {
  try {
    const { name } = req.params;
    const imageFile = req.file;
    const result = await createCommonService(req.body, name, imageFile);
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

exports.getCommon = async (req, res, next) => {
  try {
   
    const userId = req.user?._id;
    const { name } = req.params;
    const result = await getCommonService(name, userId);
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

exports.getCommonByID = async (req, res, next) => {
  try {
    const { name, id } = req.params;
    const result = await getCommonServiceById(name, id);
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

exports.deleteCommon = async (req, res, next) => {
  try {
    const { name, id } = req.params;
    const result = await deleteCommonService(name, id);

    res.status(200).json({
      status: "success",
      message: "Data delete successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Data is not Delete",
      error: error.message,
    });
  }
};

exports.patchCommonById = async (req, res, next) => {
  try {
    const { name, id } = req.params;
    const imageFile = req.file;
    const result = await patchCommonByIdService(name, id, req.body, imageFile);
    res.status(200).json({
      status: "success",
      message: "Update successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "upadate couldn't success",
      error: error.message,
    });
  }
};
