const User = require("../Models/UserInformation");
const fs = require("fs");
exports.signupService = async (userInfo) => {
  const result = await User.create(userInfo);
  return result;
};

exports.loginService = async (email) => {
  const result = await User.findOne({ email });
  return result;
};

exports.patchUserIdService = async (userId, patchData, imageFile) => {
  console.log(patchData, imageFile);

  if (imageFile === undefined) {
    const result = await User.updateOne(
      { _id: userId },
      { $set: patchData },
      { runValidators: true }
    );
    return result;
  } else {
    let img = fs.readFileSync(imageFile.path);
    const data = {
      image: {
        data: img,
        contentType: imageFile.originalname,
      },
    };
    const result = await User.updateOne(
      { _id: userId },
      { $set: data },
      { runValidators: true }
    );
    return result;
  }
};
