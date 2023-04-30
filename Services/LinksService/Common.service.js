const mongoose = require("mongoose");
const ObjectId = require("mongodb").ObjectId;
const apps = require("../../Models/Links/Apps");
const commerce = require("../../Models/Links/Commerce");
const common = require("../../Models/Links/Common");
const crypto = require("../../Models/Links/Crypto");
const gallery = require("../../Models/Links/gallery");
const location = require("../../Models/Links/Location");
const menu = require("../../Models/Links/Menu");
const music = require("../../Models/Links/Music");
const social = require("../../Models/Links/Social");
const fs = require("fs");

exports.createCommonService = async (bodyData, ActionName, imageFile) => {
  if (ActionName === "common") {
    const result = await common.create(bodyData);
    return result;
  } else if (ActionName === "social") {
    const result = await social.create(bodyData);
    return result;
  } else if (ActionName === "gallery") {

    let img = fs.readFileSync(imageFile.path);

    const result = await gallery.create({
      image: {
        data: img,
        contentType: imageFile.originalname,
      },
    });
    return result;
  } else if (ActionName === "menu") {
    const result = await menu.create(bodyData);
    return result;
  } else if (ActionName === "crypto") {
    const result = await crypto.create(bodyData);
    return result;
  } else if (ActionName === "location") {
    const result = await location.create(bodyData);
    return result;
  } else if (ActionName === "music") {
    const result = await music.create(bodyData);
    return result;
  } else if (ActionName === "commerce") {
    const result = await commerce.create(bodyData);
    return result;
  } else if (ActionName === "apps") {
    const result = await apps.create(bodyData);
    return result;
  }
};

exports.getCommonService = async (ActionName, userID) => {
  if (ActionName === "common") {
    const result = await common.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });

    return data;
  } else if (ActionName === "social") {
    const result = await social.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });
    return data;
  } else if (ActionName === "gallery") {
    const result = await gallery.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });
    return data;
  } else if (ActionName === "menu") {
    const result = await menu.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });
    return data;
  } else if (ActionName === "crypto") {
    const result = await crypto.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });
    return data;
  } else if (ActionName === "location") {
    const result = await location.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });
    return data;
  } else if (ActionName === "music") {
    const result = await music.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });
    return data;
  } else if (ActionName === "commerce") {
    const result = await commerce.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });
    return data;
  } else if (ActionName === "apps") {
    const result = await apps.find();
    const data = result.filter((url) => {
      const id = JSON.stringify(url?.userInfo[0]);
      if (id === JSON.stringify(userID)) {
        return url;
      }
    });
    return data;
  }
};

exports.getCommonServiceById = async (ActionName, id) => {
  if (ActionName === "common") {
    const result = await common.findById(id);
    return result;
  } else if (ActionName === "social") {
    const result = await social.findById(id);
    return result;
  } else if (ActionName === "gallery") {
    const result = await gallery.findById(id);
    return result;
  } else if (ActionName === "menu") {
    const result = await menu.findById(id);
    return result;
  } else if (ActionName === "crypto") {
    const result = await crypto.findById(id);
    return result;
  } else if (ActionName === "location") {
    const result = await location.findById(id);
    return result;
  } else if (ActionName === "music") {
    const result = await music.findById(id);
    return result;
  } else if (ActionName === "commerce") {
    const result = await commerce.findById(id);
    return result;
  } else if (ActionName === "apps") {
    const result = await apps.findById(id);
    return result;
  }
};

exports.deleteCommonService = async (ActionName, id) => {
  if (ActionName === "common") {
    const result = await common.deleteOne({ _id: id });
    return result;
  } else if (ActionName === "social") {
    const result = await social.deleteOne({ _id: id });
    return result;
  } else if (ActionName === "gallery") {
    const result2 = await gallery.find({
      item: { $elemMatch: { _id: id } },
    });

    console.log(result2);
    let bankId = JSON.stringify(result2[0]?._id);
    const stringWithoutQuotes = bankId?.replace(/"/g, "");
    console.log(stringWithoutQuotes);

    const deleteResult = await gallery.updateOne(
      { _id: stringWithoutQuotes },
      { $set: { item: { _id: id } } }
    );
    const result = await gallery.deleteOne({ _id: id });
    return { result, deleteResult };
  } else if (ActionName === "menu") {
    const result2 = await menu.find({
      item: { $elemMatch: { _id: id } },
    });

    console.log(result2);
    let bankId = JSON.stringify(result2[0]?._id);
    const stringWithoutQuotes = bankId?.replace(/"/g, "");
    console.log(stringWithoutQuotes);

    const deleteResult = await menu.updateOne(
      { _id: stringWithoutQuotes },
      { $set: { item: { _id: id } } }
    );
    const result = await menu.deleteOne({ _id: id });
    return { result, deleteResult };
  } else if (ActionName === "crypto") {
    const result = await crypto.deleteOne({ _id: id });
    return result;
  } else if (ActionName === "location") {
    const result = await location.deleteOne({ _id: id });
    return result;
  } else if (ActionName === "music") {
    const result = await music.deleteOne({ _id: id });
    return result;
  } else if (ActionName === "commerce") {
    const result = await commerce.deleteOne({ _id: id });
    return result;
  } else if (ActionName === "apps") {
    const result = await apps.deleteOne({ _id: id });
    return result;
  }
};

exports.patchCommonByIdService = async (
  ActionName,
  userId,
  patchData,
  imageFile
) => {
  console.log(patchData, imageFile);

  if (ActionName === "common") {
    if (!imageFile) {
      const result = await common.updateOne(
        { _id: userId },
        { $set: patchData },
        { runValidators: true }
      );
      return result;
    } else {
      // let img = fs.readFileSync(imageFile.path);
      // const data = {
      //   image: {
      //     data: img,
      //     contentType: imageFile.originalname,
      //   },
      // };
      const result = await common.updateOne(
        { _id: userId },
        { $set: imageFile },
        { runValidators: true }
      );
      return result;
    }
  } else if (ActionName === "social") {
    const result = await social.updateOne(
      { _id: userId },
      { $set: patchData },
      { runValidators: true }
    );
    return result;
  } else if (ActionName === "gallery") {
    if (imageFile === undefined) {
      const result = await gallery.updateOne(
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
      const result = await gallery.updateOne(
        { _id: userId },
        { $set: data },
        { runValidators: true }
      );
      return result;
    }
  } else if (ActionName === "menu") {
    const result = await menu.updateOne(
      { _id: userId },
      { $set: patchData },
      { runValidators: true }
    );
    return result;
  } else if (ActionName === "crypto") {
    const result = await crypto.updateOne(
      { _id: userId },
      { $set: patchData },
      { runValidators: true }
    );
    return result;
  } else if (ActionName === "location") {
    if (!imageFile) {
      const result = await location.updateOne(
        { _id: userId },
        { $set: patchData },
        { runValidators: true }
      );
      return result;
    } else {
      // let img = fs.readFileSync(imageFile.path);
      // const data = {
      //   image: {
      //     data: img,
      //     contentType: imageFile.originalname,
      //   },
      // };
      const result = await location.updateOne(
        { _id: userId },
        { $set: imageFile },
        { runValidators: true }
      );
      return result;
    }
  } else if (ActionName === "music") {
    const result = await music.updateOne(
      { _id: userId },
      { $set: patchData },
      { runValidators: true }
    );
    return result;
  } else if (ActionName === "commerce") {
    const result = await commerce.updateOne(
      { _id: userId },
      { $set: patchData },
      { runValidators: true }
    );
    return result;
  } else if (ActionName === "apps") {
    const result = await apps.updateOne(
      { _id: userId },
      { $set: patchData },
      { runValidators: true }
    );
    return result;
  }
};
