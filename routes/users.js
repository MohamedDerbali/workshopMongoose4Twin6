var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
/* users List */
router.get("/", async (req, res, next) => {
  try {
    const userList = await userModel.find();
    if (!userList || userList.length === 0) {
      throw new Error("users not found");
    }
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* add user */
router.post("/", async (req, res, next) => {
  try {
    const { name, age, address, moy } = req.body;
    // await userModel.create(req.body);
    const user = new userModel({
      name,
      age,
      address,
      moy,
    });
    const addedUser = await user.save();
    res.status(200).json(addedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* modify user */
router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, age, address, moy } = req.body;
    const checkIfUserExist = await userModel.findById(userId);
    if (!checkIfUserExist) {
      throw new Error("user not found!");
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: { name, age, address, moy },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* remove user */
router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const checkIfUserExist = await userModel.findById(userId);
    if (!checkIfUserExist) {
      throw new Error("user not found!");
    }
    await userModel.findByIdAndDelete(userId);
    res.json("user deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
