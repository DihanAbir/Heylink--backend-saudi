const message = require("../Models/message");

exports.createMessageService = async (data) => {
  const result = await message.create(data);
  return result;
};

exports.getMessageService = async (userId) => {
  const result = await message.find({ userInfo: [id] });
  return result;
};

exports.deleteMessageServiceById = async (id) => {
  const result = await message.deleteOne({ _id: id });
  return result;
};

exports.patchMessageServiceById = async (proId, patchData) => {
  // console.log(proId.patchData);
  console.log(patchData);
  const result = await message.updateOne(
    { _id: proId },
    { $set: patchData },
    { runValidators: true }
  );
  return result;
};
