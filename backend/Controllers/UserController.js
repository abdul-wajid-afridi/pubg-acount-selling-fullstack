const { users, admin } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { password, email, phoneNumber, userName } = req.body;
  if (!password || !email || !phoneNumber || !userName) {
    return res
      .status(401)
      .json({ error: "please enter values to registerUser" });
  }
  const userExists = await users.findOne({
    where: { phoneNumber: phoneNumber },
  });
  if (userExists) {
    return res.status(401).json({ error: "user already exists" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await users.create({
      password: hashPassword,
      userName,
      email,
      phoneNumber,
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: "user register login error",
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const result = await users.findAll();
    res.status(200).json({
      result,
      // data: req.user,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { phoneNumber, password } = req.body;
  if (!phoneNumber || !password) {
    return res.status(401).json({ error: "please enter values" });
  }
  try {
    const user = await users.findOne({ where: { phoneNumber: phoneNumber } });
    if (!user) res.status(401).json({ error: "user doesnot exists" });

    await bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.status(401).json({ error: "no Password matched" });

      const accessToken = sign(
        { userName: user.userName, id: user.id },
        "importantMessage"
      );
      res
        .status(200)
        .json({ accessToken, userName: user.userName, id: user.id });
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await admin.findOne({ where: { name: name } });
    if (!user) res.status(401).json({ error: "user doesnot exists" });

    await bcrypt.compare(password, user.password).then((match) => {
      if (!match) res.status(401).json({ error: "no Password matched" });

      const accessToken = sign(
        { name: user.name, id: user.id },
        "admin-message"
      );
      res.status(200).json({ accessToken, user });
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const registerAdmin = async (req, res) => {
  const { password, email, name } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const result = await admin.create({
      password: hashPassword,
      name,
      email,
    });
    res.status(200).json({
      result,
      // data: " data send",
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await users.destroy({ where: { id: id } });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
};
// go to comintsTable.user_id==user.id
module.exports = {
  registerUser,
  getUsers,
  loginUser,
  adminLogin,
  deleteUser,
  registerAdmin,
};
