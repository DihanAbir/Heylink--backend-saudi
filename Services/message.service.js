const message = require("../Models/message");

exports.createMessageService = async (data) => {
  const result = await message.create(data);
  return result;
};

exports.getMessageService = async (userId) => {
  const result = await message.find();
  const data = result.filter((url) => {
    const id = JSON.stringify(url?.userInfo[0]);
    if (id === JSON.stringify(userId)) {
      return url;
    }
  });

  return data;
};

exports.deleteMessageServiceById = async (id) => {
  const result = await message.deleteOne({ _id: id });
  return result;
};

exports.patchMessageServiceById = async (proId, patchData) => {
  console.log(proId.patchData);
  console.log(patchData);
  const result = await message.updateOne(
    { _id: proId },
    { $set: patchData },
    { runValidators: true }
  );
  return result;
};
