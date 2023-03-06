const pro = require("../Models/pro");

exports.createProService = async (data) => {
  const result = await pro.create(data);
  return result;
};

exports.getProService = async (userId) => {
  const result = await pro.find();
  const data = result.filter((url) => {
    const id = JSON.stringify(url?.userInfo[0]);
    if (id === JSON.stringify(userId)) {
      return url;
    }
  });

  return data;
};

exports.patchProServiceById = async (proId, patchData) => {
  console.log(proId.patchData);
  const result = await pro.updateOne(
    { _id: proId },
    { $set: patchData },
    { runValidators: true }
  );
  return result;
};
