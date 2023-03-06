const signup = require("../Models/signups");

exports.createsignupService = async (data) => {
  const result = await signup.create(data);
  return result;
};

exports.getSignupService = async (userId) => {
  const result = await signup.find();
  const data = result.filter((url) => {
    const id = JSON.stringify(url?.userInfo[0]);
    if (id === JSON.stringify(userId)) {
      return url;
    }
  });

  return data;
};

exports.patchSignupServiceById = async (proId, patchData) => {
  console.log(proId.patchData);
  const result = await signup.updateOne(
    { _id: proId },
    { $set: patchData },
    { runValidators: true }
  );
  return result;
};

exports.deleteSignupServiceById = async (id) => {
  const result = await signup.deleteOne({ _id: id });
  return result;
};
